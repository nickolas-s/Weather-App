import countriesList from '../countries.json';
import { selectCountry } from './elements.js';

/**
 * toTitleCase - Captilize the first letter of each word of the weather descripiton
 * @param {String} phrase
 * @return {String}
 */
export function toTitleCase(phrase) {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * mpsToKph - conver miles per second to kilometers per hour
 * @param {Number} mps
 * @return {Number}
 */
export function mpsToKph(mps) {
  return Math.round(mps * 3.6);
}

/**
 * generateOptions - Get the country list from JSON file
 * @return {String} display options of the select element
 */
export function generateOptions() {
  const options = countriesList
    .map(
      singleCountry =>
        `<option value="${singleCountry.code}">${singleCountry.name}</option>`
    )
    .join('');
  selectCountry.innerHTML = options;
}
