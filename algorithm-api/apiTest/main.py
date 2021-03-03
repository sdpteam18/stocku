import requests
from beta_functions import *
from infixToPostfix import *

# format of one algorithm: "ticker;quantity;buySignal;sellSignal;"
# example: "AAPL;10;OPEN,1D,1_>_CLOSE,1D,1_*_2;CLOSE,1D,20_<_SMA,10,1D,close;"
# the same calculations will be done twice in most places, once for the previous bar and once for the current
# this way if the buy or sell signal will not be triggered constantly, only when it changes from false to true


def signal_decoder(_ticker, _signal):
    # if _signal in '()*/+-' or _signal.isnumeric():
    #    return _signal
    # else:
    funcList = _signal.split(',')
    func = funcList.pop(0)
    if funcList:
        interval = funcList.pop(0)
        barsAgo = funcList.pop(0)
    if func == 'OPEN':
        current = get_open(_ticker, interval, barsAgo)
        return current
    elif func == 'CLOSE':
        current = get_close(_ticker, interval, barsAgo)
        return current
    elif func == 'HIGH':
        current = get_high(_ticker, interval, barsAgo)
        return current
    elif func == 'LOW':
        current = get_low(_ticker, interval, barsAgo)
        return current
    elif func == 'SMA':
        current = get_sma(_ticker, interval, barsAgo, funcList[0], funcList[1])
        return current
    elif func == 'RSI':
        current = get_rsi(_ticker, interval, barsAgo)
        return current
    elif func == 'SLOW_STOCH':
        current = get_slow_stoch(_ticker, interval, barsAgo)
        return current
    elif func == 'FAST_STOCH':
        current = get_fast_stoch(_ticker, interval, barsAgo)
    else:
        current = _signal
    return current


def signal_interpreter(_signal, _ticker):

    # receives the buy or sell string and evaluates it
    print("***** Interpreting a signal *****\n")

    parts = _signal.split('_')

    components = []

    for item in parts:
        result = signal_decoder(_ticker, item)
        # result will either be a number or an operand
        components.append(result)

    for i in range(len(components)):
        if components[i] == '>' or components[i] == '<' or components[i] == '=':
            compIndex = i
            comp = components[i]

    leftSide = components[:compIndex]
    rightSide = components[compIndex+1:]

    print('Left hand side of current signal in list form', leftSide)
    print('Right hand side of current signal in list form', rightSide, '\n')

    leftSideExp = ''
    for item in leftSide:
        leftSideExp += (' ' + str(item))
    rightSideExp = ''
    for item in rightSide:
        rightSideExp += (' ' + str(item))

    postLeftSideExp = infixToPostfix(leftSideExp)
    postRightSideExp = infixToPostfix(rightSideExp)

    print('Left hand side of signal postfix', postLeftSideExp)
    print('Right hand side of signal postfix', postRightSideExp, '\n')

    evalLeftSideExp = postfixEval(postLeftSideExp)
    evalRightSideExp = postfixEval(postRightSideExp)

    print('Calculated left hand side of signal', evalLeftSideExp)
    print('Calculated right hand side of signal', evalRightSideExp, '\n')

    print('For current bar, evaluating if: ',
          evalLeftSideExp, comp, evalRightSideExp)
    decision = doMath(comp, evalLeftSideExp, evalRightSideExp)
    print('Which is', decision, '\n')

    return decision


def new_translator(_input):
    # print(_input)
    algoID = _input[0]
    buy_signals = _input[1]
    sell_signals = _input[2]
    numShares = _input[3]
    ticker = _input[4]

    # iterate through each buy signal and interpret. if any signal is false, iteration of the list gets cut short, otherwise it returns true
    buy_decision = True
    for signal in buy_signals:
        print("The following will track the interpretation of each buy signal. The list of buy signals will be cut off as soon as \none buy signal is false, as each signal must be true in order to buy.\n")
        print("buy signal:", signal)
        if (not signal_interpreter(signal, ticker)):
            buy_decision = False
            break

    buy_decision = (buy_decision and not check_open_purchase(algoID)) #only buy if algorithm has already sold its position

    

    # same exact process for sell decision
    sell_decision = True

    for signal in sell_signals:
        print("The following will track the interpretation of each sell signal. The list of sell signals will be cut off as soon as \none sell signal is false, as each signal must be true in order to sell.\n")
        print("sell signal:", signal)
        if (not signal_interpreter(signal, ticker)):
            sell_decision = False
            break

    sell_decision = sell_decision and check_open_purchase(algoID)

    if sell_decision and buy_decision:
        sell_decision = False
        buy_decision = False

    print("Finished cycling through all buy signals and sell signals.  If both final decisions are True, then both are made False, as there is no point in simultaneous buying and selling.")
    print("Final buy decision is:", buy_decision)
    print("Final sell decision is:", sell_decision)

    return buy_decision, sell_decision


def purchaser(algoID, buy_decision, sell_decision, numShares, ticker):
    # buy_decision = result[3]
    # sell_decision = result[4]
    price = get_close(ticker, '1Min', 1)
    if (buy_decision):
        body = {
            "ticker": ticker,
            "qty": numShares,
            "price": get_close(ticker, '1Min', 1),
        }
        post = requests.post(
            url="http://equitia-git-po5vn34pmq-ue.a.run.app/algo/{}/makePurchase".format(algoID), data=body)

def get_purchases(algoID):
    return requests.get(
        url="http://equitia-git-po5vn34pmq-ue.a.run.app//algo/{}/purchases".format(algoID)).json()

def check_open_purchase(algoID):
    purchaseArray = get_purchases(algoID)
    for key in purchaseArray:
        print(purchaseArray[key])
        if purchaseArray[key]['sold'] < 0:
            return True
    return False

def get_all_algos():
    # this function gets algos for all users
    response = requests.get(
        'http://equitia-git-po5vn34pmq-ue.a.run.app/algo/findAll')
    usersCursor = response.json()
    # print(usersCursor)

    # userIDs = getUserIDs(usersCursor)
    # algoIDs = getAlgoIDs(usersCursor)
    # algoStrings = getAlgoStrings(algoIDs)

    cleanAlgos = {}
    for user in usersCursor:
        algoID = usersCursor[user]['algoID']
        cleanAlgos[algoID] = algoID, usersCursor[user]['buySignals'], usersCursor[user][
            'sellSignals'], usersCursor[user]['sharesNum'], usersCursor[user]['ticker']

    # ['Mike_user', 'Rohan_user']
    # ['algo1', 'algo2']
    # ['AAPL;10;OPEN,1D,1_>_CLOSE,1D,1_*_2;CLOSE,1D,20_<_SMA,1D,1,10,close;']

    # print(userIDs)
    # print(algoIDs)
    # print(algoStrings)

    # returns dictionary in format {algoID: array of buySignals, array of sellSignals, sharesNum, ticker}
    return cleanAlgos


def getUserIDs(usersCursor):
    userIDs = []  # loop gives string for all unique algorithms in the database
    # {'0': {'ID': 'Mike_user', 'algorithms': ['algo1', 'algo2']} we talkin bout the 0 here:
    for userKey in usersCursor:
        userIDs.append(usersCursor[userKey]['userID'])
    return(userIDs)


def getAlgoIDs(usersCursor):
    algoIDs = []  # loop gives string for all unique algorithms in the database
    # {'0': {'ID': 'Mike_user', 'algorithms': ['algo1', 'algo2']} we talkin bout the 0 here
    for userKey in usersCursor:
        for algoID in usersCursor[userKey]['algorithms']:
            if (algoID not in algoIDs):
                algoIDs.append(algoID)
    return(algoIDs)


def getAlgoStrings(algoIDs):
    algoStrings = []
    for algoID in algoIDs:
        response = requests.get(
            'http://equitia-git-po5vn34pmq-ue.a.run.app/algo/{}'.format(algoID))
        algoStrings.append(response.json())

    return algoStrings


def run():
    print('*')
    print('***')
    print('***********')
    print('***********************')
    print('*********************************************')
    print('***********************')
    print('***********')
    print('*****')
    print('***')
    print('*')

    # get all algorithms for all users in format {algoID: array of buySignals, array of sellSignals, sharesNum, ticker}
    algorithms = get_all_algos()

    for algo in algorithms:
        print('')
        print("The algorithm in the form (list of buy signals, list of sell signals, quantity, ticker) is: ")
        print('')
        print(algorithms[algo])
        print('')
        numShares = algorithms[algo][3]
        ticker = algorithms[algo][4]

        # returns the decisions to buy and sell
        decisions = new_translator(algorithms[algo])
        buy_decision = decisions[0]
        sell_decision = decisions[1]

        print("The final buy decision for this algorithm was: ", buy_decision)
        print("")
        print("The final sell decision for this algorithm was: ", sell_decision)
        print("**********************************************************************************")

        purchaser(algo, buy_decision, sell_decision, numShares, ticker)


run()
