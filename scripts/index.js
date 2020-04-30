import backgroundImage from './background.js';
import { toTitleCase, mpsToKph, generateOptions } from './utils.js';
// eslint-disable-next-line prettier/prettier
import { img, cityLocation, description, temperature, feelsLike, humidity, wind, closeBtn, saveChangeBtn, changeBtn, selectCity, selectCountry, form, toggle, time, modalOuter, invalidInputMessage } from './elements.js';
import { ICON_BASE } from './const.js';
import { fetchLocalTime, fetchData, failedToFetch } from './fetch.js';

const location = {
  city: 'Mississauga',
  country: 'CA',
};
let tempUnit = 'C';

/**
 * openModal - handle modal opening
 */
function openModal() {
  modalOuter.classList.add('open');
}
/**
 * closeModal - handle modal closing
 */
function closeModal() {
  modalOuter.classList.remove('open');
  form.reset();
  invalidInputMessage.hidden = true;
  selectCountry.classList.remove('invalid-feedback');
  selectCity.classList.remove('invalid-feedback');
}

/**
 * validadeNewEntry - Vaidade new city entred by user
 * @param {String} errorCode
 * @return {Boolean}
 */
function validadeNewEntry(errorCode) {
  if (errorCode === '404') {
    selectCountry.classList.add('invalid-feedback');
    selectCity.classList.add('invalid-feedback');
    invalidInputMessage.hidden = false;
    return false;
  }
  closeModal();
  return true;
}

/**
 * displayData - Get data from API and displays to the browser
 * @param {String} unit
 * @param {String} cityID
 * @param {String} countryID
 */
async function displayData(unit, cityID, countryID) {
  let cityWeather = null;
  try {
    cityWeather = await fetchData(cityID, countryID);
  } catch (error) {
    failedToFetch();
    return;
  }

  if (!validadeNewEntry(cityWeather.metricData.cod)) {
    return;
  }
  const longitude = cityWeather.metricData.coord.lon;
  const latitude = cityWeather.metricData.coord.lat;

  time.textContent = await fetchLocalTime(latitude, longitude);
  cityLocation.textContent = `${cityWeather.metricData.name} - ${cityWeather.metricData.sys.country}`;
  description.textContent = toTitleCase(
    cityWeather.metricData.weather[0].description
  );

  // Change output accroding to the unit of measurement
  if (unit === 'C') {
    temperature.textContent = `${Math.round(
      cityWeather.metricData.main.temp
    )}°C`;
    feelsLike.textContent = `${Math.round(
      cityWeather.metricData.main.feels_like
    )}°C`;
    wind.textContent = `${mpsToKph(cityWeather.metricData.wind.speed)} kph`;
  } else {
    temperature.textContent = `${Math.round(
      cityWeather.imperialData.main.temp
    )}°F`;
    feelsLike.textContent = ` ${Math.round(
      cityWeather.imperialData.main.feels_like
    )}°F`;
    wind.textContent = `${Math.round(cityWeather.imperialData.wind.speed)} mph`;
  }

  img.src = `${ICON_BASE}${cityWeather.metricData.weather[0].icon}@2x.png`;
  humidity.textContent = `${cityWeather.metricData.main.humidity}%`;
  backgroundImage(cityWeather.metricData.weather[0].icon);

  mirrorToLocalStorage();
}

/**
 * handleCick - handle new city selection
 * @param {Event} event
 */
function handleClick(event) {
  event.preventDefault();
  if (event.type === 'click' || event.type === 'submit') {
    location.city = selectCity.value;
    location.country = selectCountry.value;
    displayData(tempUnit, location.city, location.country);
  }
}

// Local Storage
/**
 * mirrorToLocalStorage - update Local Storage
 * * @return {JSON}
 */
function mirrorToLocalStorage() {
  localStorage.setItem('location', JSON.stringify(location));
}

/**
 * restoreFromLocalStorage - retrieve data from Local Storage
 * @return {Object}
 */
function restoreFromLocalStorage() {
  const lsLocation = JSON.parse(localStorage.getItem('location'));

  if (localStorage.length) {
    location.city = lsLocation.city;
    location.country = lsLocation.country;
  }
  displayData(tempUnit, location.city, location.country);
}

// Selectors
closeBtn.addEventListener('click', () => validadeNewEntry('000'));
changeBtn.addEventListener('click', openModal);
saveChangeBtn.addEventListener('click', handleClick);
form.addEventListener('submit', handleClick);
toggle.addEventListener('change', function() {
  if (this.checked) {
    tempUnit = 'C';
  } else {
    tempUnit = 'F';
  }
  displayData(tempUnit, location.city, location.country);
});
modalOuter.addEventListener('click', event => {
  const isOutside = !event.target.closest('.modal-inner');
  if (isOutside) {
    closeModal();
  }
});
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// on page load
generateOptions();
restoreFromLocalStorage();
