from flask import Flask, render_template, redirect, request, session
""" from flask_bcrypt import Bcrypt """
import re

app = Flask(__name__)
app.secret_key = '7879b685-6c98-4256-92dc-103620fb53ce'

""" bcrypt = Bcrypt(app)

DATABASE = 'snippet_network_db'
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
DATE_REGEX = re.compile('^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$') """