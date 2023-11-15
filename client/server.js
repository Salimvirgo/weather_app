const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/weather', async (req, res) => {
  const location = req.body.location;
  console.log(req.body);
  try {
    const weatherData = await fetchWeather(location);
    res.send(weatherData);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

async function fetchWeather(location) {
  const API_URL = `http://127.0.0.1:5000/weather/${location}`; // Assuming Python Flask server is running on port 5000
  const response = await axios.get(API_URL);
  return response.data;
}
const PORT = process.env.PORT || 3002;
app.listen(PORT, (err) => {
    if (err) {
        console.log("Error starting the app");
    } else {
        console.log(`app starts on http://localhost:${PORT}`);
    }
});

