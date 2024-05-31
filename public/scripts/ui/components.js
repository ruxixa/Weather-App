/**
 * components.js
 *
 * This file is responsible for updating the ui
 * components with the weather data.
 * 
 * Author: ruxixa
 */
import { showMessagebox } from './messagebox.js';

const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const country = document.getElementById('country');
const raining = document.getElementById('raining');

const iconPath = 'icons/'

/**
 * Updates the weather info based on the given 
 * weather data and country name
 * 
 * @param { JSON } weather 
 * @param { string } countryName 
 * 
 * @returns { void }
 */
export function updateWeatherInfo(weather, countryName) {
  if (weather) {
    const icon = weather.raining ? 'rain.png' : 'normal.png';

    weatherIcon.src = `${iconPath}/${icon}`;
    temperature.textContent = `${weather.temperature}°C`;
    raining.textContent = weather.raining ? 'Raining' : 'Not raining';
    country.innerHTML = countryName;
  } else {
    showMessagebox('Weather', 'Weather data unavailable');
  }
}