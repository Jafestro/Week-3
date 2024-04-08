import {restaurantModal, restaurantRow, displayAllRestaurants, filterRestaurants, addDialog} from './components.js';
import {fetchDailyMenu, fetchRestaurants, sortByDistance} from './utils.js';
let restaurants = [];
const unchangedRestaurants = [];

const handlePosition = async (position) => {
  restaurants = await fetchRestaurants();
  unchangedRestaurants.push(...restaurants);
  myLocation = [position.coords.longitude, position.coords.latitude];
  sortByDistance(restaurants, myLocation);
  sortByDistance(unchangedRestaurants, myLocation);
  addDialog(restaurants);
};

let myLocation = [];

navigator.geolocation ? navigator.geolocation.getCurrentPosition(handlePosition) :
  console.log('Geolocation is not supported in this browser');
document.getElementById('sodexhoFilter').addEventListener('click', () => filterRestaurants('Sodexo', restaurants));
document.getElementById('compassFilter').addEventListener('click', () => filterRestaurants('Compass Group', restaurants));
document.getElementById('viewAll').addEventListener('click', () => {
  displayAllRestaurants(unchangedRestaurants);
});

export {handlePosition};
