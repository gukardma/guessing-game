from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# DATABASE = './data.db'

# get db path from by appending it to directory of app.py file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, 'data.db')

def get_sample_data():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT animal_name FROM animals_csv ORDER BY animal_name DESC LIMIT 10;")
    rows = cursor.fetchall()
    conn.close()
    return rows

def get_questions():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT question_text FROM questions")
    rows = cursor.fetchall()
    conn.close()
    return rows

@app.route("/api/questions", methods=["GET"])
def questions():
    return jsonify(get_questions())

if __name__ == "__main__":
    app.run(debug=True, port=5050)