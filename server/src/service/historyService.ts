import fs from 'fs/promises';

// TODO: Define a City class with name and id properties
class City {
 name: string;
  id: string;
  constructor(city: string, id: string) {
    this.name = city;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<any> {
    return this.readFile('searchHistory.json');
  }
  private async readFile(filePath: string): Promise<any> {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading file from disk: ${error}`);
      return [];
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    await this.writeFile('searchHistory.json', cities);
  }
  private async writeFile(filePath: string, data: any): Promise<void> {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error(`Error writing file to disk: ${error}`);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    return cities.map((city: any) => new City(city.name, city.id));
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.getCities();
    const newCity = new City(city, Date.now().toString());
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
