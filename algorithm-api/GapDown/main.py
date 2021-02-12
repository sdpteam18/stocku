import alpaca_trade_api as tradeapi
import math




apca_key = "PKYS3XW4163MX8HXQLDE"
secret_key = "2LsYiv16jlNz17Rv2OLndhHE3kxqczlH1QYD6UKq"
base_url = "https://paper-api.alpaca.markets"
alpha_key = 'VGALHC1OO5NXA5ON'


metric_dictionary = {'price': "get_close", 'sma': "get_sma"}

api = tradeapi.REST(apca_key, secret_key, base_url, api_version='v2')

HEADERS = {'APCA-API-KEY-ID': apca_key,
           'APCA-API-SECRET-KEY': secret_key}

class Algorithm:
        def __init__(self, _capital, _buyType, _sellType, _stocks, _buyMets, _sellMets):
                self._capital = _capital 
                self._buyType = _buyType
                self._sellType = _sellType
                self._stocks = _stocks
                self._buyMets = _buyMets
                self._sellMets = _sellMets

        def run(self):
                purchaseList = self.run_buy()
                print(purchaseList)
                saleList = self.run_sell()
                print(saleList)

                if (len(purchaseList) > 0):
                        cash_per_stock = self._capital / len(purchaseList) 
                #this uses all current capital - real algo would not go all in on every opportunity
                        for stock in purchaseList:
                                price = MarketDataFunctions.get_close(stock)
                                shares = int(cash_per_stock / price)
                                buy_stock(stock, shares)

                for stock in saleList:
                        pos = AlpacaUserData.get_position(stock)
                        shares = pos.qty
                        sell_stock(stock, shares)
                        

        def run_buy(self):
                purchaseList = []
                for stock in self._stocks:
                        if self.check_buy_metrics(stock):
                                purchaseList.append(stock)

                return purchaseList

        def check_buy_metrics(self, stock):
                cash = self._capital
                price = MarketDataFunctions.get_close(stock)

                if price > cash:
                        return False

                for metric in self._buyMets:
                        func_name = metric_dictionary.get(metric)
                        funcable = getattr(MarketDataFunctions, metric_dictionary[metric])
                        if not (funcable(stock) < self._buyMets[metric][0]):
                                return False

                return True

        def run_sell(self):
                saleList = []

                positions = AlpacaUserData.get_all_positions()
                for pos in positions:
                        if (pos.symbol in self._stocks):
                                saleList.append(pos.symbol)
                print(positions)
                print(saleList)
                print()
                for sellable in saleList:
                        if not self.check_sell_metrics(sellable):
                                saleList.remove(sellable)
                return saleList

        def check_sell_metrics(self, stock):
                
                for metric in self._sellMets:
                        func_name = metric_dictionary.get(metric)
                        get_metric = getattr(MarketDataFunctions, func_name)
                        if not (get_metric(stock) > self._sellMets[metric][0]):
                                return False

                return True



        #def check_metric(stock, metric)
                


class MarketDataFunctions(object):

        # one bar is the open, high, low and close prices of a stock over a certain time interval i.e. 1MIN or 1D
        # a bar set is a collection of these bars i.e. one bar per day for x days or one bar per minute for x minutes
        # a barset object is returned in format: {'AAPL': {Bar({'c': 108.48, 'h': 110.50, 'l': 106.32, 'o': 109.30, 't': 1604352608, 'v': 190}), Bar({'c': 109...
        # one bar object would be Bar({'c': 108.48, 'h': 110.50, 'l': 106.32, 'o': 109.30, 't': 1604352608, 'v': 190}        
        def get_open(_sym, _int, _numBars):
        # _sym = ticker i.e. 'AAPL
        # _int = duration of one bar i.e. 1Min, 5Min, 15Min, 1D
        # _numBars = how many bars are in the returned call from Alpaca.  We only care about the oldest one in this case
        # _numBars = 1 would return only most recent bar
        # we will need the whole bar set for averages and calculations, but for this it's acceptable to have a single bar
                barset = api.get_barset(_sym, _int, _numBars)

                _bars = barset[_sym]
                return float(_bars[0].o)
        # _bars[0] will return the oldest value in bars, not the most recent for some reason
        # aka if _bars has ten values, _bars[0] is the one we're looking for because we want data from 10 days ago, not from yesterday

        def get_current(_sym):
                barset = api.get_barset(_sym, "1Min", 1)
                _bars = barset[_sym]
                return float(_bars[0].c)

        def get_close(_sym, _int="1Min", _numBars=1):
                barset = api.get_barset(_sym, _int, _numBars)
                _bars = barset[_sym]
                return float(_bars[0].c)


        def get_high(_sym, _int, _numBars):
                barset = api.get_barset(_sym, _int, _numBars)
                _bars = barset[_sym]
                return float(_bars[0].h)


        def get_low(_sym, _int, _numBars):
                barset = api.get_barset(_sym, _int, _numBars)
                _bars = barset[_sym]
                return float(_bars[0].l)


        def get_average(ticker, daily, numDays):
                barset = api.get_barset(ticker, daily, numDays)
                bars = barset[ticker] # data formatted as {'AAPL': Bar[...]}
                total = 0
                for i in bars:
                        total += float(i.c)
        # assuming average based on close, can be changed later
                answer = total / numDays
                return answer

        def get_stdev(ticker, daily, numDays):
                barset = api.get_barset(ticker, daily, numDays)
                bars = barset[ticker]

                close_return_sum = 0
                for i in range(numDays-1):
                        if (bars[i+1].c/bars[i].c > 2) or (bars[i].c/bars[i+1].c): #catches splits, prices double or halve
                                pass
                        close_return_sum += bars[i+1].c - bars[i].c
                close_return_sum = close_return_sum * close_return_sum

                variance = close_return_sum / numDays
                return math.sqrt(variance)
                        
                        



class AlpacaUserData(object):
        def get_balance():
                account = api.get_account()
                return account.cash


        def get_portfolio_value():
                account = api.get_account()
                return account.portfolio_value

        def get_position(_sym):
                try:
                        pos = api.get_position(_sym)
                except:
                        return None
                return pos
        
        def get_all_positions():       
                        return api.list_positions()      



def buy_stock(_sym, _qty):
    # there are a lot of parameters that we could use, this is just the most basic way to sell whatever quantity of the stock you specified
    api.submit_order(_sym, _qty, 'buy', 'market', 'day')


def sell_stock(_sym, _qty):
    api.submit_order(_sym, _qty, 'sell', 'market', 'day')


def gap_down(self):
        stockList = ['AAPL']
        hitList = []
        for ticker in stockList:
                ope = MarketDataFunctions.get_open(ticker, '1D', 1)
                low = MarketDataFunctions.get_low(ticker, '1D', 2)

                daily_return= ope - low
                if daily_return < MarketDataFunctions.get_stdev(ticker, '1D', 90):
                        if ope > MarketDataFunctions.get_average(ticker, '1D', 20):
                                hitList.append(ticker)

        for ticker in hitList:
                buy_stock(ticker, 10)
        

def gap_down_test():
        stockList = ['AAPL']
        hitList = []
        for ticker in stockList:
                ope = MarketDataFunctions.get_open(ticker, '1D', 1)
                low = MarketDataFunctions.get_low(ticker, '1D', 2)

                daily_return= ope - low
                if daily_return < MarketDataFunctions.get_stdev(ticker, '1D', 90):
                        if ope > MarketDataFunctions.get_average(ticker, '1D', 20):
                                hitList.append(ticker)

        returnStr = ""
        for ticker in hitList:
                print(ticker)
                returnStr += returnStr + ": 10  "
                buy_stock(ticker, 10)
        print("AAPL: 10")
        returnStr += returnStr + ": 10  "
        buy_stock('AAPL', 10)

        return returnStr

#Algo = Algorithm(0, 0, 0, ['AAPL'], {'price':[1000], 'sma':[100, 14]}, {'price':[1]})
#Algorithm(cash, type of buy, type of sell, stocks, target buy metrics, target sell metrics)

#capital - cash we're allowed to play with

#buy & sell_type - 0 for "default" right now, meaning simply: "buy and sell _stocks when exact math conditions are met"
# certain popular algorithms such as pairs trading will require very different logical flow

#stocks, a list of target stocks, this will be passed but preprepared groups such as "The biotech 12" or "The SPY 30"

#buymetrics, a dictionary of metrics we care about, and the values we care about them at. 
# For most metrics we will need to know the target value as well as the duration to take the metric over
# Assume for buying that we want < value
#sellmetrics, assume for selling that we want > value
#res = finnhub_api.quote('AAPL')
#print(res)




#Algo.run()



