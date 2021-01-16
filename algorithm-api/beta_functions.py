import requests
import json
import math
import alpaca_trade_api as tradeapi
import smtplib
import pandas as pd
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

apca_key = "PK7P0J8J19Q5WJ19ILW6"
secret_key = "S3bOdp/iZT2i9f4rprYqkZjsggerZjL1dI6Ms7RV"
base_url = "https://paper-api.alpaca.markets"
alpha_key = 'VGALHC1OO5NXA5ON'

api = tradeapi.REST(apca_key, secret_key, base_url, api_version='v2')


HEADERS = {'APCA-API-KEY-ID': apca_key,
           'APCA-API-SECRET-KEY': secret_key}

# one bar is the open, high, low and close prices of a stock over a certain time interval i.e. 1MIN or 1D
# a bar set is a collection of these bars i.e. one bar per day for x days or one bar per minute for x minutes
# a barset object is returned in format: {'AAPL': {Bar({'c': 108.48, 'h': 110.50, 'l': 106.32, 'o': 109.30, 't': 1604352608, 'v': 190}), Bar({'c': 109...
# one bar object would be Bar({'c': 108.48, 'h': 110.50, 'l': 106.32, 'o': 109.30, 't': 1604352608, 'v': 190}

#
#
#
#
#
# USE 1 FOR MOST RECENT, 0 RETURNS WACK NUMBERS
#
#
#
#
#


def get_open(_sym, _int, _barsAgo):
    # _sym = ticker i.e. 'AAPL
    # _int = duration of one bar i.e. 1MIN, 5MIN, 15MIN, 1D
    # _barsAgo = how many bars are in the returned call from Alpaca.  We only care about the oldest one in this case
    # _barsAgo = 1 would return only most recent bar
    # we will need the whole bar set for averages and calculations, but for this it's acceptable to have a single bar
    if _barsAgo == 0:
        return 'ERROR'
    barset = api.get_barset(_sym, _int, _barsAgo)

    _bars = barset[_sym]
    # return float(_bars[0].o)
    return str(_bars[0].o)
    # _bars[0] will return the oldest value in bars, not the most recent for some reason
    # aka if _bars has ten values, _bars[0] is the one we're looking for because we want data from 10 days ago, not from yesterday


def get_close(_sym, _int, _barsAgo):
    if _barsAgo == 0:
        return 'ERROR'
    barset = api.get_barset(_sym, _int, _barsAgo)
    _bars = barset[_sym]
    return float(_bars[0].c)


def get_high(_sym, _int, _barsAgo):
    if _barsAgo == 0:
        return 'ERROR'
    barset = api.get_barset(_sym, _int, _barsAgo)
    _bars = barset[_sym]
    return float(_bars[0].h)


def get_low(_sym, _int, _barsAgo):
    if _barsAgo == 0:
        return 'ERROR'
    barset = api.get_barset(_sym, _int, _barsAgo)
    _bars = barset[_sym]
    return float(_bars[0].l)


def get_average(_sym, _int, _barsAgo):
    barset = api.get_barset(_sym, _int, _barsAgo)
    _bars = barset[_sym]
    total = 0
    for i in _bars:
        total += float(i.c)
    # assuming average based on close, can be changed later
    answer = total / _barsAgo
    return answer


def get_balance():
    account = api.get_account()
    return account.cash


def get_portfolio_value():
    account = api.get_account()
    return account.portfolio_value


def buy_stock(_sym, _qty):
    # there are a lot of parameters that we could use, this is just the most basic way to sell whatever quantity of the stock you specified
    api.submit_order(_sym, _qty, 'buy', 'market', 'day')


def sell_stock(_sym, _qty):
    api.submit_order(_sym, _qty, 'sell', 'market', 'day')


def get_sma(_sym, _time_period, _int='1D', _series_type='close'):
    barset = api.get_barset(_sym, _int, _time_period)
    _bars = barset[_sym]
    total = 0
    for bar in _bars:
        total += float(bar.c)
    # assuming average based on close, can be changed later
    answer = total / _time_period
    return answer


def get_ema(_sym, _time_period, _smoothing=2, _int='1D', _series_type='close'):
    sma = get_sma(_sym=_sym, _time_period=_time_period,
                  _int=_int, _series_type=_series_type)
    mult = 2 / (_time_period + 1)
    ema = ema_helper(_sym, sma, mult, _int, _time_period, 0)
    return ema


def ema_helper(_sym, _sma, _mult, _int, _num_days, _count):
    if _count == _num_days:
        emaPrev = _sma
        # return (get_close(_sym, _int, _num_days-1) - _sma)*_mult + _sma
        # emaPrev = _sma
    else:
        emaPrev = ema_helper(_sym, _sma, _mult, _int, _num_days, _count+1)
    # print(_count)
    # return (get_close(_sym, _int, _num_days-1) - ema_helper(_sym, _sma, _mult, _int, _num_days-1))*_mult + ema_helper(_sym, _sma, _mult, _int, _num_days-1)
    return (get_close(_sym, _int, _count+1) - emaPrev)*_mult + emaPrev


def get_rsi(_sym):
    gains = 0
    losses = 0
    for i in range(1, 15):
        close = get_close('AAPL', '1D', i)
        prevClose = get_close('AAPL', '1D', i+1)
        diff = close - prevClose
        if diff > 0:
            gains += diff
        else:
            # using -= because supposed to be absolute value
            losses -= diff
    avgGains = gains/14
    avgLosses = losses/14
    rs = avgGains/avgLosses
    rsi = 100 - 100/(1+rs)
    return rsi


def get_fast_stoch(_sym, _barsAgo=1):
    close = get_close('AAPL', '1D', _barsAgo)
    low = get_low('AAPL', '1D', _barsAgo)
    high = get_high('AAPL', '1D', _barsAgo)
    for i in range(_barsAgo+1, _barsAgo+14):
        newLow = get_low('AAPL', '1D', i)
        newHigh = get_high('AAPL', '1D', i)
        if newLow < low:
            low = newLow
        if newHigh > high:
            high = newHigh
    k = (close - low)/(high - low) * 100
    return k


def get_slow_stoch(_sym):
    k = 0
    for i in range(1, 3):
        k += get_fast_stoch(_sym, i)
    d = k/3
    return d


def get_bbands(_sym, _time_period=20, _int='1D', num_std_devs=2):
    avg = get_sma(_sym, _time_period, _int)
    total = 0
    for i in range(1, _time_period+1):
        close = get_close('AAPL', '1D', i)
        diff = avg - close
        diffSquared = diff * diff
        total += diffSquared
    last_step = total / _time_period
    std_dev = math.sqrt(last_step)
    upper_band = avg + num_std_devs * std_dev
    middle_band = avg
    lower_band = avg - num_std_devs * std_dev

    return upper_band, middle_band, lower_band


def get_daily_return(_sym):
    diff = get_close(_sym, '1D', 2) - get_close(_sym, '1D', 1)
    return diff


def crossSecMeanRev(self):
    capital = 10000
    dow = {'MSFT': None,
           'AAPL': None,
           'V': None,
           'JPM': None,
           'JNJ': None,
           'WMT': None,
           'PG': None,
           'INTC': None,
           'UNH': None,
           'HD': None,
           'DIS': None,
           'KO': None,
           'VZ': None,
           'MRK': None,
           'PFE': None,
           'CVX': None,
           'CSCO': None,
           'BA': None,
           'MCD': None,
           'NKE': None,
           'IBM': None,
           # 'UTX': None,
           'AXP': None,
           'MMM': None,
           'GS': None,
           'CAT': None,
           'WBA': None,
           # 'DWDP': None,
           'TRV': None}

    total_returns = 0
    for i in dow.keys():
        daily_return = get_daily_return(i)
        dow[i] = daily_return
        total_returns += daily_return
    avg_returns = total_returns / 28
    sum_diffs = 0
    for i in dow.keys():
        # denominator is the sum of all differences between daily return and average return
        diff = abs(dow[i] - avg_returns)
        sum_diffs += diff
    for i in dow.keys():
        daily_return = dow[i]
        weight = - (daily_return - avg_returns) / sum_diffs
        # reassign value in dow dictionary to the weight needed
        dow[i] = weight*capital

    for i in dow.keys():
        last_quote = float(api.get_last_quote(i).askprice)
        numShares = math.floor(abs(dow[i])/last_quote)
        if numShares > 0:
            if (dow[i] < 0):
                buy_stock(i, numShares)
                #print('buy', i, numShares)
            else:
                sell_stock(i, numShares)
                #print('sell', i, numShares)

    return dow


def bs_trading_algo():
    sender_address = 'stock.burner300@gmail.com'
    sender_pass = 'SafePass12'
    receiver_address = 'ben.levy@uconn.edu'

    message = MIMEMultipart()
    message['From'] = 'Trading Bot'
    message['To'] = receiver_address
    message['subject'] = 'First Trading Algo'

    if get_close('AAPL', '1D', 10) > get_close('AAPL', '1D', 1):
        buy_stock('AAPL', 10)
        mail_content = 'The close 10 days ago was greater than the close yesterday, so we bought ten shares of AAPL'
    else:
        buy_stock('AAPL', 20)
        mail_content = 'The close 10 days ago was not greater than the close yesterday, so we bought twenty shares of AAPL'
    message.attach(MIMEText(mail_content, 'plain'))

    session = smtplib.SMTP('smtp.gmail.com', 587)
    session.starttls()

    session.login(sender_address, sender_pass)
    text = message.as_string()
    session.sendmail(sender_address, receiver_address, text)
    session.quit()

    done = 'Mail Sent'

    return done


# crossSecMeanRev(10000)
#print(get_sma('AAPL', 20))
# print(get_ema('AAPL', 50))
# print(get_rsi('AAPL'))
# print(get_fast_stoch('AAPL'))
# print(get_slow_stoch('AAPL'))
# print(get_bbands('AAPL'))
# print(bs_trading_algo())
#print(get_open('AAPL', '1D', 10))
#print(get_close('AAPL', '1D', 1))
#print(get_open('AAPL', '1D', 1))
#print(get_high('AAPL', '1D', 10))
#print(get_low('AAPL', '1D', 10))
#print(get_average('AAPL', '1Min', 1000))
# print(get_balance())
# print(get_portfolio_value())
print(get_open('AAPL', '1D', 100))
