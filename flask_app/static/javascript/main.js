import { initStyling, initInputElems, ALL_INPUT_ELEMS } from './modules/init.js';
import CONSTANTS from './modules/CONSTANTS.js';
import { setLastCursorPosition, insertTabStop } from './modules/tabStops.js';
import handleKeydown from './modules/textEditor.js';
import { updateSnippetOnInput } from './modules/processCodeToJson.js';
import clipboard from './modules/clipboard.js';
import modalHelpBoxFunctions from './modules/modalHelpBoxes.js';
//import call from './modules/utils.js';


window.addEventListener('load', initStyling);
window.addEventListener('load', initInputElems);

document.getElementById('body_text').addEventListener('focusout', setLastCursorPosition);
document.getElementById('tab_stop_button').addEventListener('click', insertTabStop);

document.getElementById('body_text').addEventListener('keydown', handleKeydown);

/**
 * Highlights the text in the Snippet element when any part of the element is
 * clicked.
 */
document.getElementById('snippet_text').addEventListener('click', (event) => {
    event.target.selectionStart = 0;
    event.target.selectionEnd = document.getElementById('snippet_text').textContent.length - 1;
});


for (let elem in ALL_INPUT_ELEMS) {
    ALL_INPUT_ELEMS[elem].addEventListener('input', updateSnippetOnInput);
}

/** FOR TESTING ONLY */
// document.getElementById('snippet_text').addEventListener('click', call);

document.getElementById('copy_button').addEventListener('click', clipboard.copy);
document.getElementById('paste_button').addEventListener('click', clipboard.paste);

/** Modal dialog box open buttons */
document.querySelectorAll('.info_button').forEach((modalOpenButton, idx) => {
    modalOpenButton.addEventListener('click', modalHelpBoxFunctions.openModal);
});

/** Modal dialog box close buttons */
document.querySelectorAll('.button.self-center').forEach((modalCloseButton, idx) => {
    modalCloseButton.addEventListener('click', modalHelpBoxFunctions.closeModalAnimation);
});