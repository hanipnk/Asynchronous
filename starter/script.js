'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

/*

// First AJAX CAll : XMLHttpRequest

const getCountryData = function (contry) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${contry}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data1, data2] = JSON.parse(this.responseText);
    let data;
    if (data2) {
      data = data2;
    } else {
      data = data1;
    }
    console.log(data);

    const html = `<article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);

    countriesContainer.style.opacity = 1;
  });
};

getCountryData('korea');
getCountryData('portugal');
getCountryData('usa');

*/

// Callback Hell

const getCountryAndNeighbour = function (contry) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${contry}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data1, data2] = JSON.parse(this.responseText);
    let data;
    if (data2) {
      data = data2;
    } else {
      data = data1;
    }
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbout Country (2)
    const [neighbour] = data.borders;
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data3 = JSON.parse(this.responseText);

      renderCountry(data3, 'neighbour');
    });
  });
};

//getCountryAndNeighbour('usa');

// setTimeout(() => {
//   console.log('1 secound passed');
//   setTimeout(() => {
//     console.log('2 secound passed');
//     setTimeout(() => {
//       console.log('3 secound passed');
//       setTimeout(() => {
//         console.log('4 secound passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promises and the Fetch API

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${contry}`);
// request.send();

// Promise ?
// An object that is used as a placeholder for the future result of an asynchronous operation
// A container for an asynchronously delivered value
// A container for a future value

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const request = fetch('https://restcountries.eu/rest/v2/name/portugal');

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}!`);
      renderError(`Something went wrong ! ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

getCountryData('sdfsd');
