from flask import redirect
from flask_app import app, render_template, request, session

@app.route('/')
def index():
    return render_template('code_to_json.html')

@app.route('/get_prev_values', methods = ["GET"])
def get_input_values():
    return session.get('input_values', { })

@app.route('/save', methods = ["POST"])
def save_inputs_to_session():
    elem_key = request.json['element']
    elem_val = request.json['value']
    session['input_values'] = { **session.get('input_values', { }), elem_key: elem_val }
    return request.json

@app.route('/clear_session')
def clear_session():
    del session['input_values']
    return redirect('/')