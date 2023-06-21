from flask import Flask, jsonify
from flask import request
from utils import video2sumText
from flask import render_template
from flask_cors import CORS
from flask_ngrok import run_with_ngrok

app = Flask(__name__)
CORS(app)
run_with_ngrok(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/textSum', methods=['GET'])
def GetUrl():
    url = request.args.get('youtube_url', '')
    response = video2sumText(url)
    return jsonify(response)

if __name__ == "__main__":
  app.run()
