from flask import Flask, render_template, jsonify, request
import requests
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app, resources={r"/weather/*": {"origins": "http://localhost:3000"}})
 # Enable CORS for all routes

def get_weather(location):
    weather_api_key = 'D7FSKNKG4Y7SY4FG7NVUZDMD7'  # Replace with your API key
    url = f'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?unitGroup=metric&key={weather_api_key}&contentType=json'

    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather/<location>')
def weather(location):
    weather_data = get_weather(location)
    if weather_data:
        return jsonify(weather_data)
    else:
        return jsonify({'error': 'Weather data not available for the location'})

if __name__ == '__main__':
    app.run(debug=True)
