import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/api/weather/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const { city } = req.body;
  console.log(city);
  const weatherData = await WeatherService.getWeatherForCity(city); // Assuming getWeatherByCity is a method to get weather data
  // TODO: save city to search history
  await HistoryService.addCity(city);
  console.log(weatherData);
  res.json(weatherData); // Send the weather data as a response
});

// TODO: GET search history
router.get('/api/weather/history', async (_req: Request, res: Response) => {
  const cities = await HistoryService.getCities();
  res.json(cities);
},);

// * BONUS TODO: DELETE city from search history


export default router;
