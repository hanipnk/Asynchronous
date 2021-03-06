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

  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something when wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
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

/*

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

getCountryAndNeighbour('usa');

setTimeout(() => {
  console.log('1 secound passed');
  setTimeout(() => {
    console.log('2 secound passed');
    setTimeout(() => {
      console.log('3 secound passed');
      setTimeout(() => {
        console.log('4 secound passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

*/

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

//const request = fetch('https://restcountries.eu/rest/v2/name/portugal');

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'sdfsdf';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}!`);
//       renderError(`Something went wrong ! ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('sdfsd');

///////////////////////////////////////////////////////////////////////////////////

/*
const getJSON = function (url, errorMsg = 'Something when wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1

  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      console.log(neighbour);

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })

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
  // getCountryData('portugal');
});

// getCountryData('australia');

*/

/*

// Coding Challenge 1

const whereAmi = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      //console.log(response);
      if (!response.ok)
        throw new Error(`Page is not loaded. ${response.status}`);
      return response.json();
    })
    .then(data => {
      //console.log(data);
      const { country } = data;
      const { city } = data;
      console.log(`You are in ${city}, ${country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found(${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`Something when wrong (${err.message})`))
    .finally(() => (countriesContainer.style.opacity = 1));
};

whereAmi(52.508, 13.381);
whereAmi(19.037, 72.873);
whereAmi(-33.933, 18.474);

*/

/*

console.log('Text start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resloved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 100000000; i++) {}
  console.log(res);
});

console.log('Text end');

*/

/*

// Promises takes only one argument which is called 'executor function'
// In the 'executor function' there are two arguments resolve(fullfilled) and reject(rejected)

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN!');
    } else {
      reject(new Error('You lost your money :('));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3second passed');
    return wait(1);
  })
  .then(() => console.log('4second passed'));

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

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

*/

/*

// Promisifying from callback based API to promise based API
navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
);
console.log('Getting position');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    //);
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmi = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })

    .then(response => {
      //console.log(response);
      if (!response.ok)
        throw new Error(`Page is not loaded. ${response.status}`);
      return response.json();
    })
    .then(data => {
      //console.log(data);
      const { country } = data;
      const { city } = data;
      console.log(`You are in ${city}, ${country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found(${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`Something when wrong (${err.message})`))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmi);

*/

/*

// Coding Challenge 2

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

/////////////////////////////////////////////////////

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image load is failed'));
    });
  });
};

let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 is loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 is loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 3 is loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

  */

/*
// Comsuming Promises with Async/ Await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res =>
//   console.log(res)
// );

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting Country data');

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}!!`);
    renderError(`${err.message}`);

    // Reject Promise returned from async function
    throw err;
  }
};

console.log('1: will get location');
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}!`))
//   .finally(() => console.log('3: Finished getting location'));

// IFFE
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

*/

/*
// Runnig Promisses in Parallel (takes an array of promises )
// Promise.all short circuits as soon as one promise rejects

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'spain');

*/

/*
// Other Promise Combinators: race, allSettled and any

//Promise.race (takes an array of promises and returns one result which is the fastest NOT an array of the results)
// Promise.race short circuits whenever one of the promises gets settled. no matter if fulfilled or rejected
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/canada`),
    getJSON(`https://restcountries.eu/rest/v2/name/usa`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.eu/rest/v2/name/usa`), timeout(5)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled (it returns all the settled promissed if the promises got rejected or not)
// Promise.allSettled never short circuits
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
// Promise.any takes an array of promises and returns the first fulfilled promise
// Promise.any is similar to promise.race but promise.any ignores rejected value so it only returns fulfilled value
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

  */

/*  
// Coding Challenge 3
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image load is failed'));
    });
  });
};

// let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 is loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 is loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 3 is loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// Part 1
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// const loadNpause = async function () {
//   try {
//     // Load image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load image 2
//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };

// loadNpause();

// Part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

*/

///////////////////////////////////////////////////////////////////////////////

// Coding Challenge 3
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image load is failed'));
    });
  });
};

// Part 1
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

//Part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    const imgEl = await Promise.all(imgs);
    console.log(imgEl);
    imgEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
