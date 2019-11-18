import * as helpers from './helpers';
/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'QGg1Nk2LSiRsNrdteoXvpaTN2vjfKRGb6u1k7xLj';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';

// Linkar á video til að prófa
// https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2015-5-27
// https://api.nasa.gov/planetary/apod?api_key=QGg1Nk2LSiRsNrdteoXvpaTN2vjfKRGb6u1k7xLj&date=2018-11-20
/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
// Fæ að disable þessa línu til að gera þetta villulaust, ætti ekki að skipta máli
// eslint-disable-next-line consistent-return
export default async function getRandomImage() {
  const date = helpers.randomDate();
  const url = `${URL}?api_key=${API_KEY}&date=${date}`;
  // const url = 'https://api.nasa.gov/planetary/apod?api_key=QGg1Nk2LSiRsNrdteoXvpaTN2vjfKRGb6u1k7xLj&date=2015-5-27'
  //   const url = 'https://api.nasa.gov/planetary/apod?api_key=QGg1Nk2LSiRsNrdteoXvpaTN2vjfKRGb6u1k7xLj&date=2018-11-20';

  const result = await fetch(url);

  if (result.status !== 200) {
    console.error('Non 200 status');
  } else {
    const data = await result.json();
    return data;
  }
}
