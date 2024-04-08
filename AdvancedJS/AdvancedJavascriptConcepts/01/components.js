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

export {restaurantRow, restaurantModal};
