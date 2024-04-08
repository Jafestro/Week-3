import {fetchDailyMenu} from './utils.js';

const table = document.querySelector('table');
const dialogNode = document.querySelector('dialog');
const restaurantRow = (restaurant) => {
  const {name, address} = restaurant;
  const trNode = document.createElement('tr');
  trNode.innerHTML = `<td>${name}</td><td>${address}</td>`;
  return trNode;
};

const restaurantModal = (restaurant, menu) => {
  const {name, address, postalCode, city, phone, company} = restaurant;
  const courses = menu.courses;
  let menuHtml = '';

  courses.forEach((course) => {
    const { name: courseName, price, diets } = course;
    // eslint-disable-next-line max-len
    menuHtml += `<p>Meal: ${courseName}</p><p>Price: ${price}</p><p>Diet: ${diets}</p>`;
  });
  const completeHtml = `
    <div class="deleteButton"><p class="closeButton">❌</p></div>
    <div class="content">
      <div class="info">
      <h2>${name}</h2>
      <p>Address: ${address}</p>
      <p>Postal Code: ${postalCode}</p>
      <p>City: ${city}</p>
      <p>Phone Number: ${phone}</p>
      <p>Company: ${company}</p>
      </div>
      <div class="menu">${menuHtml}</div>
    </div>
  `;
  return completeHtml;
};

const filterRestaurants = async (company, restaurants) => {
  try {
    const filteredArray = restaurants.filter((restaurant) => restaurant.company === company);
    table.innerHTML = '';
    addDialog(filteredArray);
  } catch (error) {
    console.error('Error filtering restaurants:', error);
    alert('Error filtering restaurants. Please try again later.');
  }
};

const displayAllRestaurants = async (restaurants) => {
  // Clear the table and append the new rows
  table.innerHTML = '';
  // tableRows.forEach((row) => table.appendChild(row));
  addDialog(restaurants);
};

const addDialog = (restaurants) => {
  for (const restaurant of restaurants) {
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
export {restaurantRow, restaurantModal, displayAllRestaurants, filterRestaurants, addDialog};
