import mimetypes
mimetypes.add_type('application/javascript', '.js')

from flask import Flask, render_template, redirect, request, session


app = Flask(__name__)
app.secret_key = '7879b685-6c98-4256-92dc-103620fb53ce'
