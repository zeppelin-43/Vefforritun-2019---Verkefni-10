// todo vísa í rétta hluti með import
import getRandomImage from './nasa-api';
import * as helpers from './helpers';
import * as storage from './storage';

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  getRandomImage().then((data) => {
    const name = data.title;
    const { explanation } = data;
    const mediaType = data.media_type;
    const { url } = data;

    title.innerHTML = name;
    text.innerHTML = explanation;
    // debugger;
    if (mediaType === 'video') {
      const vidoeElement = helpers.el('iframe');
      // const source = helpers.el('source');
      // source.setAttribute('src', url);
      // vidoeElement.appendChild(source);
      vidoeElement.setAttribute('src', url);
      vidoeElement.setAttribute('width', '960');
      vidoeElement.className = 'apod__image';
      vidoeElement.setAttribute('height', '540');
      const apod = img.parentElement;
      apod.replaceChild(vidoeElement, img);
      // img.replaceChild(vidoeElement, img);
      img = vidoeElement;
    } else {
      const imageElement = helpers.el('img');
      imageElement.setAttribute('src', url);
      imageElement.className = 'apod__image';
      const apod = img.parentElement;
      apod.replaceChild(imageElement, img);
      // img.replaceChild(vidoeElement, img);
      img = imageElement;
    }


    image.type = mediaType;
    image.mediaUrl = url;
    image.text = explanation;
    image.title = name;
  });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  storage.save(image.type, image.mediaUrl, image.text, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  const buttons = apod.querySelectorAll('button');

  buttons[0].addEventListener('click', getNewImage);
  buttons[1].addEventListener('click', saveCurrentImage);

  title = apod.querySelector('.apod__title');
  text = apod.querySelector('.apod__text');
  img = apod.querySelector('.apod__image');

  image = {};
  getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  // debugger;
  const main = document.querySelector('main');
  const images = storage.load();
  images.forEach((o) => {
    // debugger
    const name = o.title;
    const url = o.mediaUrl;
    const mediaType = o.type;
    const div = helpers.el('div');
    const h2 = helpers.el('h2');
    h2.className = 'apod__title';
    h2.innerHTML = name;
    div.className = 'apod';
    div.appendChild(h2);

    if (mediaType === 'video') {
      const i = helpers.el('iframe');
      i.setAttribute('src', url);
      i.className = 'apod__image';
      i.setAttribute('width', '960');
      i.setAttribute('height', '540');
      div.appendChild(i);
    } else {
      const i = helpers.el('img');
      i.setAttribute('src', url);
      i.className = 'apod__image';
      div.appendChild(i);
    }


    main.appendChild(div);
  });
  // for(let o of images)
  // {

  // }
}
