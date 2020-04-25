const body = document.querySelector('body');

/**
 * backgroundImage - change the background image based on the weather
 * @param {String} code
 * @return {String} image url
 */
function backgroundImage(code) {
  switch (code) {
    case '01d':
      // clear sky - day
      body.style.backgroundImage =
        'url(https://source.unsplash.com/TA5bUTySOrg/1600x900)';
      break;
    case '02d':
      // few clouds - day
      body.style.backgroundImage =
        'url(https://source.unsplash.com/TSgwbumanuE/1600x900)';
      break;
    case '03d':
      // scattered clouds - day
      body.style.backgroundImage =
        'url(https://source.unsplash.com/Ioy3OB0U5cI/1600x900)';
      break;
    case '04d':
      body.style.backgroundImage =
        // broken clouds - day
        'url(https://source.unsplash.com/wgLPy2YBXuc/1600x900)';
      break;
    case '09d':
      // shower rain - day
      body.style.backgroundImage =
        'url(https://source.unsplash.com/pGQbWXBC1dA/1600x900)';
      break;
    case '10d':
      // rain - day
      body.style.backgroundImage =
        'url(https://source.unsplash.com/pv2ZlDfstXc/1600x900)';
      break;
    case '11d':
      // thunderstorm - day
      body.style.backgroundImage =
        'url(https://source.unsplash.com/SgLtJRPm_8U/1600x900)';
      break;
    case '13d':
      // shower snow - day
      body.style.backgroundImage =
        'url(https://source.unsplash.com/w8hWTFpGtpY/1600x900)';
      break;
    case '50d':
      // shower mist - day
      body.style.backgroundImage =
        'url(https://source.unsplash.com/7CME6Wlgrdk/1600x900)';
      break;
    case '01n':
      // clear sky - night
      body.style.backgroundImage =
        'url(https://source.unsplash.com/HVFYFns30-I/1600x900)';
      break;
    case '02n':
      // few clouds - night
      body.style.backgroundImage =
        'url(https://source.unsplash.com/k2-hbUaXlEs/1600x900)';
      break;
    case '03n':
      // scattered clouds - night
      body.style.backgroundImage =
        'url(https://source.unsplash.com/ve_uN9V8xqU/1600x900)';
      break;
    case '04n':
      // broken clouds - night
      body.style.backgroundImage =
        'url(https://source.unsplash.com/0N6yGHQSlmk/1600x900)';
      break;
    case '09n':
      // shower rain - night
      body.style.backgroundImage =
        'url(https://source.unsplash.com/OwqsrpzqbQk/1600x900)';
      break;
    case '10n':
      // rain - night
      body.style.backgroundImage =
        'url(https://source.unsplash.com/OKlo0r3gBcQ/1600x900)';
      break;
    case '11n':
      // thunderstorm - night
      body.style.backgroundImage =
        'url(https://source.unsplash.com/5YryiYcFvtA/1600x900)';
      break;
    case '13n':
      // snow - night
      body.style.backgroundImage =
        'url(https://source.unsplash.com/SH4GNXNj1RA/1600x900)';
      break;
    case '50n':
      // mist - night
      body.style.backgroundImage =
        'url(https://source.unsplash.com/oOOw0jXn7Kg/1600x900)';
      break;

    default:
      console.log('Error fetching background image');
      break;
  }
}

export default backgroundImage;
