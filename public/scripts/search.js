import { messagebox, showMessagebox } from './messagebox.js'; 

document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value;

    if (!searchValue) {
      showMessagebox('Search', 'Please enter a search value');
      return;
    }

    showMessagebox('Search', `Searching for ${searchValue}`);
  });
});

document.body.appendChild(messagebox); 
