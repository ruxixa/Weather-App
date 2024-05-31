/**
 * getWeather.js
 *
 * This file is responsible for fetching the current weather
 * and returning the weather data.
 * 
 * Author: ruxixa
 */
import { countries } from './countries.js';
import { showMessagebox } from '../ui/messagebox.js';

/**
 * Fetches the current weather in the given country
 * 
 * @param { string } country 
 * 
 * @returns Current weather in the given country 
 *          or null if the country is not found
 * 
 * @example
 * getCurrentWeather('Poland')   // { temperature: 20, raining: false }
 * getCurrentWeather('Germany')  // { temperature: 18, raining: true }
 * @example
 */
export function getCurrentWeather(country) {
  if (countries.hasOwnProperty(country)) {
    const { latitude, longitude } = countries[country];
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation`;

    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch the weather data');
        }
        return response.json();
      })
      .then(data => {
        const isRaining = data.current.precipitation_sum > 0;

        const weatherInfo = {
          temperature: data.current.temperature_2m,
          raining: isRaining,
        };
        
        return weatherInfo;
      })
      .catch(error => {
        showMessagebox('Error', error.message);
        return null; // Return null if the weather data is unavailable
      });
  } else {
    showMessagebox('Search', 'Country not found');
    return null; // Return null if the country is not found
  }
}
