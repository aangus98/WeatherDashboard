import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  description: string;
  icon: string;
  constructor(temperature: number, description: string, icon: string) {
    this.temperature = temperature;
    this.description = description;
    this.icon = icon;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = process.env.BASE_URL || '';
  private apiKey: string = process.env.API_KEY || '';
  private cityName: string = '';
  constructor() {
    this.baseURL = process.env.BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(`${this.baseURL}/geocode/v1/json?q=${query}&key=${this.apiKey}`);
    return response.json();
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.cityName}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    return this.destructureLocationData(locationData.results[0].geometry.location);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return response.json();
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const temperature = response.main.temp;
    const description = response.weather[0].description;
    const icon = response.weather[0].icon;
    return new Weather(temperature, description, icon);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any[]) {
    return weatherData.map((data) => {
      return new Weather(data.main.temp, data.weather[0].description, data.weather[0].icon);
    });
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(weatherData.list);
    return {
      currentWeather,
      forecastArray,
    };
  }
}

export default new WeatherService();
