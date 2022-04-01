from flask_app import app, render_template, request
from flask import flash

@app.route('/')
def index():
    return render_template('code_to_json.html')