import { sendNewValue, loadStoredValues } from './sessionHttp.js';

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
    for (let elemKey in ALL_INPUT_ELEMS) {
        ALL_INPUT_ELEMS[elemKey].addEventListener('change', sendNewValue);
    }

    loadStoredValues(ALL_INPUT_ELEMS);
}

export { initStyling, initInputElems, ALL_INPUT_ELEMS };