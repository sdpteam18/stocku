FROM python:3.7-slim

WORKDIR /app

COPY . ./

RUN pip install flask gunicorn alpaca-trade-api flask_cors pymongo dnspython

CMD gunicorn --bind :$PORT app:app