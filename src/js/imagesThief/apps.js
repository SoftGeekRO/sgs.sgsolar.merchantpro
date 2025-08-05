import { AppConfig } from "../sgs/apps/config";

import ColorThief from 'colorthief/dist/color-thief.mjs';

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}).join('');
class ImagesThief extends AppConfig {

  constructor() {
    super("ImagesThief");
  }

  ready() {
    // Page not found images
    const colorThief = new ColorThief(),
      not_found_404 = document.querySelector('.product-not-found.product-not-found--image');
    let not_found_404_colors;

    if (not_found_404.complete) {
      not_found_404_colors = colorThief.getColor(not_found_404, 1);
    }

    $('section.page__content').css('background-color', rgbToHex(...not_found_404_colors));
    $('.page--missing-products .missing-records').css('display', 'block');
    $('.loader__').css('display', 'none');
  }
}

export default ImagesThief;
