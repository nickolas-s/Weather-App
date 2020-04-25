import { format } from 'date-fns';
// eslint-disable-next-line prettier/prettier
import { OPEN_WEATHER_KEY, OPEN_WEATHER_BASE, TIME_ZONE_KEY, TIME_ZONE_BASE } from './const.js';
import { cityLocation, feelsLike, humidity, wind } from './elements.js';

/**
 * fetchLocalTime - Fetch local time based on latitude and longitude
 * @param {String} lat
 * @param {String} lng
 * @return {Object}
 */
export async function fetchLocalTime(lat, lng) {
  let localTime = null;
  try {
    const tzResponse = await fetch(
      `${TIME_ZONE_BASE}${TIME_ZONE_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`
    );
    const tzData = await tzResponse.json();
    localTime = format(new Date(tzData.formatted), 'cccc hh:mm aaaa');
  } catch (error) {
    localTime = '';
    console.log('Failed to Fetch Local Time Data');
  }
  return localTime;
}

/**
 * failedToFetch - Catch if the API fetch fails
 * @param {String} error
 */
export function failedToFetch(error) {
  console.log(error);
  cityLocation.textContent = 'Data Unavailable';
  feelsLike.textContent = '---';
  humidity.textContent = '---';
  wind.textContent = '---';
}

/**
 * fetchData - Fetch weather data based on the city
 * @param {String} cityID
 * @param {String} countryID optional
 * @return {Object} Metric and Imperial Data
 */
export async function fetchData(cityID, countryID) {
  let metricResponse = null;
  let imperialResponse = null;

  try {
    metricResponse = await fetch(
      `${OPEN_WEATHER_BASE}${cityID},${countryID}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );
    imperialResponse = await fetch(
      `${OPEN_WEATHER_BASE}${cityID},${countryID}&appid=${OPEN_WEATHER_KEY}&units=imperial`
    );

    if (metricResponse.status > 404 || imperialResponse.status > 404) {
      throw new Error('Failed to Fetch Data');
    }

    const metricData = await metricResponse.json();
    const imperialData = await imperialResponse.json();

    return {
      metricData,
      imperialData,
    };
  } catch (error) {
    failedToFetch(error);
  }
}
