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
        prevBarsAgo = str(int(barsAgo) + 1)
    if func == 'OPEN':
        prev = get_open(_ticker, interval, prevBarsAgo)
        current = get_open(_ticker, interval, barsAgo)
        return prev, current
    elif func == 'CLOSE':
        prev = get_close(_ticker, interval, prevBarsAgo)
        current = get_close(_ticker, interval, barsAgo)
        return prev, current
    elif func == 'HIGH':
        prev = get_high(_ticker, interval, prevBarsAgo)
        current = get_high(_ticker, interval, barsAgo)
        return prev, current
    elif func == 'LOW':
        prev = get_low(_ticker, interval, prevBarsAgo)
        current = get_low(_ticker, interval, barsAgo)
        return prev, current
    elif func == 'SMA':
        prev = get_sma(_ticker, interval, prevBarsAgo,
                       funcList[0], funcList[1])
        current = get_sma(_ticker, interval, barsAgo, funcList[0], funcList[1])
        return prev, current
    elif func == 'RSI':
        prev = get_rsi(_ticker, interval, prevBarsAgo)
        current = get_rsi(_ticker, interval, barsAgo)
        return prev, current
    elif func == 'SLOW_STOCH':
        prev = get_slow_stoch(_ticker, interval, prevBarsAgo)
        current = get_slow_stoch(_ticker, interval, barsAgo)
        return prev, current
    elif func == 'FAST_STOCH':
        prev = get_fast_stoch(_ticker, interval, prevBarsAgo)
        current = get_fast_stoch(_ticker, interval, barsAgo)
        return prev, current
    else:
        # this will either return any number/operand or a faulty signal call
        return _signal, _signal


def translator(_input):
    inputList = _input.split(';')
    ticker = inputList[0]
    quantity = inputList[1]
    buySignal = inputList[2]
    sellSignal = inputList[3]

    # split buy and sell signals into parts
    # one part can be a function call i.e. CLOSE,1D,1 meaning the most recent day's closing price
    # could also be an operand or number
    buyParts = buySignal.split('_')
    sellParts = sellSignal.split('_')

    print('')
    print('Buy signal broken into parts:', buyParts)
    print('Sell signal broken into parts:', sellParts)

    buy_components = []
    sell_components = []
    prev_buy_components = []
    prev_sell_components = []
    # signal_decoder will determine what to do with each "part" i.e. which function each part corresponds to
    # then it will evaluate it
    # example: signal_decoder will take CLOSE,1D,1 as a parameter, interpret it, and return the corresponding value
    # signal_decoder will just return any operand or number it is given

    for item in buyParts:
        result = signal_decoder(ticker, item)
        # result will either be a number or an operand
        prev_buy_components.append(result[0])
        buy_components.append(result[1])

    for item in sellParts:
        result = signal_decoder(ticker, item)
        prev_sell_components.append(result[0])
        sell_components.append(result[1])

    # split buy and sell signals based on the comparison operator
    for i in range(len(buy_components)):
        if buy_components[i] == '>' or buy_components[i] == '<' or buy_components[i] == '=':
            buyCompIndex = i
            buyComp = buy_components[i]

    for i in range(len(sell_components)):
        if sell_components[i] == '>' or sell_components[i] == '<' or sell_components[i] == '=':
            sellCompIndex = i
            sellComp = sell_components[i]

    prevBuyLeftSide = prev_buy_components[:buyCompIndex]
    prevBuyRightSide = prev_buy_components[buyCompIndex+1:]

    buyLeftSide = buy_components[:buyCompIndex]
    buyRightSide = buy_components[buyCompIndex+1:]

    prevSellLeftSide = prev_sell_components[:sellCompIndex]
    prevSellRightSide = prev_sell_components[sellCompIndex+1:]

    sellLeftSide = sell_components[:sellCompIndex]
    sellRightSide = sell_components[sellCompIndex+1:]

    print('')
    print('Left hand side of previous buy signal in list form', prevBuyLeftSide)
    print('Right hand side of previous buy signal in list form', prevBuyRightSide)
    print('Left hand side of previous sell signal in list form', prevSellLeftSide)
    print('Right hand side of previous sell signal in list form', prevSellRightSide)

    print('')
    print('Left hand side of buy signal in list form', buyLeftSide)
    print('Right hand side of buy signal in list form', buyRightSide)
    print('Left hand side of sell signal in list form', sellLeftSide)
    print('Right hand side of sell signal in list form', sellRightSide)

    # this next step puts all of the elements into a normal equation
    prevBuyLeftSideExp = ''
    for item in prevBuyLeftSide:
        prevBuyLeftSideExp += (' ' + str(item))
    prevBuyRightSideExp = ''
    for item in prevBuyRightSide:
        prevBuyRightSideExp += (' ' + str(item))
    prevSellLeftSideExp = ''
    for item in prevSellLeftSide:
        prevSellLeftSideExp += (' ' + str(item))
    prevSellRightSideExp = ''
    for item in prevSellRightSide:
        prevSellRightSideExp += (' ' + str(item))

    buyLeftSideExp = ''
    for item in buyLeftSide:
        buyLeftSideExp += (' ' + str(item))
    buyRightSideExp = ''
    for item in buyRightSide:
        buyRightSideExp += (' ' + str(item))
    sellLeftSideExp = ''
    for item in sellLeftSide:
        sellLeftSideExp += (' ' + str(item))
    sellRightSideExp = ''
    for item in sellRightSide:
        sellRightSideExp += (' ' + str(item))

    print('')
    print('Left hand side of previous buy signal', prevBuyLeftSideExp)
    print('Right hand side of previous buy signal', prevBuyRightSideExp)
    print('Left hand side of previous sell signal', prevSellLeftSideExp)
    print('Right hand side of previous sell signal', prevSellRightSideExp)

    print('')
    print('Left hand side of buy signal', buyLeftSideExp)
    print('Right hand side of buy signal', buyRightSideExp)
    print('Left hand side of sell signal', sellLeftSideExp)
    print('Right hand side of sell signal', sellRightSideExp)

    # now put them into postfix (I stole like 90% of the postfix conversion code)
    postPrevBuyLeftSideExp = infixToPostfix(prevBuyLeftSideExp)
    postPrevBuyRightSideExp = infixToPostfix(prevBuyRightSideExp)
    postPrevSellLeftSideExp = infixToPostfix(prevSellLeftSideExp)
    postPrevSellRightSideExp = infixToPostfix(prevSellRightSideExp)

    postBuyLeftSideExp = infixToPostfix(buyLeftSideExp)
    postBuyRightSideExp = infixToPostfix(buyRightSideExp)
    postSellLeftSideExp = infixToPostfix(sellLeftSideExp)
    postSellRightSideExp = infixToPostfix(sellRightSideExp)

    print('')
    print('Left hand side of previous buy signal postfix', postPrevBuyLeftSideExp)
    print('Right hand side of previous buy signal postfix', postPrevBuyRightSideExp)
    print('Left hand side of previous sell signal postfix', postPrevSellLeftSideExp)
    print('Right hand side of previous sell signal postfix',
          postPrevSellRightSideExp)

    print('')
    print('Left hand side of buy signal postfix', postBuyLeftSideExp)
    print('Right hand side of buy signal postfix', postBuyRightSideExp)
    print('Left hand side of sell signal postfix', postBuyLeftSideExp)
    print('Right hand side of sell signal postfix', postSellRightSideExp)

    # now evaluate the postfix (also about 90% stolen)
    evalPrevBuyLeftSideExp = postfixEval(postPrevBuyLeftSideExp)
    evalPrevBuyRightSideExp = postfixEval(postPrevBuyRightSideExp)
    evalPrevSellLeftSideExp = postfixEval(postPrevSellLeftSideExp)
    evalPrevSellRightSideExp = postfixEval(postPrevSellRightSideExp)

    evalBuyLeftSideExp = postfixEval(postBuyLeftSideExp)
    evalBuyRightSideExp = postfixEval(postBuyRightSideExp)
    evalSellLeftSideExp = postfixEval(postSellLeftSideExp)
    evalSellRightSideExp = postfixEval(postSellRightSideExp)

    print('')
    print('Calculated left hand side of previous buy signal', evalPrevBuyLeftSideExp)
    print('Calculated right hand side of previous buy signal',
          evalPrevBuyRightSideExp)
    print('Calculated left hand side of previous sell signal',
          evalPrevSellLeftSideExp)
    print('Calculate right hand side of previous sell signal',
          evalPrevSellRightSideExp)

    print('')
    print('Calculated left hand side of buy signal', evalBuyLeftSideExp)
    print('Calculated right hand side of buy signal', evalBuyRightSideExp)
    print('Calculated left hand side of sell signal', evalSellLeftSideExp)
    print('Calculate right hand side of sell signal', evalSellRightSideExp)

    # finally, compare the results to get your buy and sell signals

    prev_buy_bool = doMath(
        buyComp, evalPrevBuyLeftSideExp, evalPrevBuyRightSideExp)
    prev_sell_bool = doMath(
        sellComp, evalPrevSellLeftSideExp, evalPrevSellRightSideExp)

    buy_bool = doMath(buyComp, evalBuyLeftSideExp, evalBuyRightSideExp)
    sell_bool = doMath(sellComp, evalSellLeftSideExp, evalSellRightSideExp)
    print('')
    print('Previous buy signal was:', evalPrevBuyLeftSideExp, buyComp,
          evalPrevBuyRightSideExp, 'which is', prev_buy_bool)
    print('Previous sell signal was:', evalPrevSellLeftSideExp, sellComp,
          evalPrevSellRightSideExp, 'which is', prev_sell_bool)

    print('')
    print('Buy signal is:', evalBuyLeftSideExp, buyComp,
          evalBuyRightSideExp, 'which is', buy_bool)
    print('Sell signal is:', evalSellLeftSideExp, sellComp,
          evalSellRightSideExp, 'which is', sell_bool)
    # print(buy_components)
    # print(sell_components)
    #buy_components = signal_decoder(ticker, buyParts)
    #sell_components = signal_decoder(ticker, sellParts)

    # the buy and sell decisions will be false in three scenarios
    # 1. the current signal is false
    # 2. there was no change from the previous signal
    # 3. the signals both return true, cancelling each other out (no sense in buying and selling)
    buy_decision = False
    if buy_bool and not prev_buy_bool:
        buy_decision = True

    sell_decision = False
    if sell_bool and not prev_sell_bool:
        sell_decision = True

    if buy_decision and sell_decision:
        buy_decision = False
        sell_decision = False
        print('System wanted to buy and sell; negated')

    return buy_decision, sell_decision


def get_all_algos():
    # this function gets algos for all users
    response = requests.get('https://equitia-git-po5vn34pmq-ue.a.run.app/find')
    usersCursor = response.json()
    print(usersCursor)

    userIDs = getUserIDs(usersCursor) 
    algoIDs = getAlgoIDs(usersCursor) 
    algoStrings = getAlgoStrings(algoIDs) 

    #['Mike_user', 'Rohan_user']
    #['algo1', 'algo2']
    #['AAPL;10;OPEN,1D,1_>_CLOSE,1D,1_*_2;CLOSE,1D,20_<_SMA,1D,1,10,close;']

    print(userIDs)
    print(algoIDs)
    print(algoStrings)




    return algoStrings

def getUserIDs(usersCursor):
    userIDs = [] #loop gives string for all unique algorithms in the database
    for userKey in usersCursor: #{'0': {'ID': 'Mike_user', 'algorithms': ['algo1', 'algo2']} we talkin bout the 0 here:
        userIDs.append(usersCursor[userKey]['userID'])
    return(userIDs)

def getAlgoIDs(usersCursor):
    algoIDs = [] #loop gives string for all unique algorithms in the database
    for userKey in usersCursor: #{'0': {'ID': 'Mike_user', 'algorithms': ['algo1', 'algo2']} we talkin bout the 0 here
        for algoID in usersCursor[userKey]['algorithms']:
            if (algoID not in algoIDs):
                algoIDs.append(algoID)
    return(algoIDs)

def getAlgoStrings(algoIDs):
    algoStrings = []
    for algoID in algoIDs:
        response = requests.get('http://equitia-git-po5vn34pmq-ue.a.run.app/algo/{}'.format(algoID))
        algoStrings.append(response.json())

    return algoStrings


algorithms = get_all_algos()

for algo in algorithms:
    print('*********************************************************************')
    print('**********************************************')
    print('***********************')
    print('')
    print('Raw algorithm:', algo)
    print('')
    print('***********************')
    print('**********************************************')
    print('*********************************************************************')
    result = translator(algo)
    print('')
    print('Buy signal is translated as:', result[0])
    print('')
    print('Sell signal is translated as:', result[1])
    print('')
