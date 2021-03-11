import { _ } from './util.js';
import { setLocalStorage  } from './recentKeyWord.js';
import { rollKeyWord } from './rolllKeyWord.js';
import { popup } from './popup.js';
import { sliderInit } from './slider.js'


function init() {
    setLocalStorage();
    popup();
    sliderInit();
    rollKeyWord();
}

init();