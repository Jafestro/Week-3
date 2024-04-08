import {restaurantModal, restaurantRow} from './components.js';
import {fetchDailyMenu, fetchRestaurants, sortByDistance} from './utils.js';


const handlePosition = async (position) => {
  const array = await fetchRestaurants();
  myLocation = [position.coords.longitude, position.coords.latitude];
  sortByDistance(array, myLocation);

  const table = document.querySelector('table');

  for (const restaurant of array) {
    const trNode = restaurantRow(restaurant);
    trNode.classList.add('row');
    trNode.addEventListener('click', async (e) => {
      e.preventDefault();

      const highlightedRows = document.querySelectorAll('.highlight');
      highlightedRows.forEach((hRow) => {
        hRow.classList.remove('highlight');
      });
      trNode.classList.add('highlight');
      dialogNode.innerHTML = '';

      const menuArray = await fetchDailyMenu(restaurant._id, 'en');
      dialogNode.innerHTML = restaurantModal(restaurant, menuArray);
      dialogNode.querySelector('.closeButton').addEventListener('click', () => {
        dialogNode.close();
      });
      dialogNode.showModal();
    });
    table.appendChild(trNode);
  }
};

let myLocation = [];

navigator.geolocation ? navigator.geolocation.getCurrentPosition(handlePosition) :
  console.log('Geolocation is not supported in this browser');


const dialogNode = document.querySelector('dialog');
