import { showMessagebox } from './ui/messagebox.js'; 
import { getCurrentWeather } from './helpers/getWeather.js';
import { updateWeatherInfo } from './ui/components.js';

const loadingMessage = document.getElementById('loading');

// Adding the event listener to the search button
document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  /**
   * Gets the user location based on the IP address
   * 
   * @returns user location
   */
  function getUserLocation() {
    return fetch('https://api.ipify.org?format=json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user location');
        }
        return response.json();
      })
      .then(data => {
        return fetch(`https://ipapi.co/${data.ip}/json/`);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user location');
        }
        return response.json();
      })
      .catch(error => {
        showMessagebox('Error', error.message);
        return null;
      });
  }
  
  // Adding the event listener to the search button
  searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value;

    if (!searchValue) {
      showMessagebox('Search', 'Please enter a search value');
      return;
    }

    getCurrentWeather(searchValue)
    .then(weather => {
      if (weather) {
        updateWeatherInfo(weather, searchValue);        
        loadingMessage.style.display = 'none'; // Hide the loading message
      } else {
        showMessagebox('Weather', 'Weather data unavailable');
      }
    });
  });

  // Getting the user location and displaying the weather
  getUserLocation().then(location => {
    if (location && location.country_name) {
      getCurrentWeather(location.country_name)
        .then(weather => {
          if (weather) {
            updateWeatherInfo(weather, location.country_name);    
            loadingMessage.style.display = 'none'; // Hide the loading message
          } else {
            showMessagebox('Weather', 'Weather data unavailable');
          }
        });
    } else {
      showMessagebox('Error', 'Failed to get user location'); 
    }
  });
});

document.body.appendChild(messagebox);
