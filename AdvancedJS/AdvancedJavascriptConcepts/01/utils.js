const makeFetch = async (url, options) => {
  const result = await fetch(url, options);
  const json = await result.json();
  return json;
};


const fetchDailyMenu = async (id, language) => {
  try {
    const array = await makeFetch(`https://10.120.32.94/restaurant/api/v1/restaurants/daily/${id}/${language}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return array;
  } catch (error) {
    console.error('Error fetching daily menu:', error);
    throw error;
  }
};

const fetchRestaurants = async () => {
  try {
    const array = await makeFetch('https://10.120.32.94/restaurant/api/v1/restaurants', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return array;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

const sortByDistance = (array, myLocation) => {
  array.sort((a, b) => calculateDistance(myLocation, a.location.coordinates) -
    calculateDistance(myLocation, b.location.coordinates));
};

const calculateDistance = (coordinates1, coordinates2) => {
  return Math.sqrt(Math.pow(coordinates2[0] - coordinates1[0], 2) + Math.pow(coordinates2[1] - coordinates1[1], 2));
};

export {fetchDailyMenu, fetchRestaurants, sortByDistance};
