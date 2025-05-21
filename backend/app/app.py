from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

DATABASE = 'data.db'

def get_questions():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT animal_name FROM animals ORDER BY animal_name LIMIT 10;")
    rows = cursor.fetchall()
    conn.close()
    return rows

@app.route("/api/questions", methods=["GET"])
def questions():
    return jsonify(get_questions())

if __name__ == "__main__":
    app.run(debug=True)