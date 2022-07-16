import { sendNewValueFetch, loadStoredValuesFetch } from './sessionHttp.js';
import CONSTANTS from './CONSTANTS.js';

const ALL_INPUT_ELEMS = {
    title_text: document.getElementById('title_text'),
    prefix_text: document.getElementById('prefix_text'),
    body_text: document.getElementById('body_text'),
    description_text: document.getElementById('description_text'),
};

const initStyling = () => {
    const codeLabelBottom = document.getElementById('code_label').getBoundingClientRect()['bottom'];
    const codeInputTop = document.getElementById('body_text').getBoundingClientRect()['top'];
    const difference = (codeInputTop - codeLabelBottom) + (0.005 * window.innerHeight);
    const marginString = (difference / 2).toString() + 'px';

    const root = document.querySelector(':root');
    root.style.setProperty('--label-margin', marginString);
}

const initInputElems = () => {
    for (let elemKey in CONSTANTS.ELEMENTS_STORED_IN_SESSION) {
        CONSTANTS.ELEMENTS_STORED_IN_SESSION[elemKey].addEventListener('change', sendNewValueFetch);
    }

    loadStoredValuesFetch();
}

export { initStyling, initInputElems, ALL_INPUT_ELEMS };