/**
 * Created By: Ben Rosenberg (www.linkedin.com/in/ben-rosenberg-688a60213)
 * First Released: 04/01/2022
 */

/** ELEMENT VARIABLES */

const titleElem = document.getElementById('title_text');
const prefixElem = document.getElementById('prefix_text');
const descriptionElem = document.getElementById('description_text');
const bodyElem = document.getElementById('body_text');
const snippetElem = document.getElementById('snippet_text');

const allInputElems = [titleElem, prefixElem, bodyElem, descriptionElem];

const tabStopButtonElem = document.getElementById('tab_stop_button');
const tabStopNumberElem = document.getElementById('tab_stop_number');
const tabStopPlaceholderTextElem = document.getElementById('tab_stop_placeholder_text');

const titleInfoOpenButton = document.getElementById('title_info_open_button');
const titleInfoCloseButton = document.getElementById('title_info_close_button');
const titleInfoModal = document.getElementById('title_info_modal');

const prefixInfoOpenButton = document.getElementById('prefix_info_open_button');
const prefixInfoCloseButton = document.getElementById('prefix_info_close_button');
const prefixInfoModal = document.getElementById('prefix_info_modal');

const descriptionInfoOpenButton = document.getElementById('description_info_open_button');
const descriptionInfoCloseButton = document.getElementById('description_info_close_button');
const descriptionInfoModal = document.getElementById('description_info_modal');

const tabStopInfoOpenButton = document.getElementById('tab_stop_info_open_button');
const tabStopInfoCloseButton = document.getElementById('tab_stop_info_close_button');
const tabStopInfoModal = document.getElementById('tab_stop_info_modal');

const codeInfoOpenButton = document.getElementById('code_info_open_button');
const codeInfoCloseButton = document.getElementById('code_info_close_button');
const codeInfoModal = document.getElementById('code_info_modal');

const snippetInfoOpenButton = document.getElementById('snippet_info_open_button');
const snippetInfoCloseButton = document.getElementById('snippet_info_close_button');
const snippetInfoModal = document.getElementById('snippet_info_modal');

/** SNIPPET JSON CODE BOILERPLATE VARIABLES */

const EMPTY_SNIPPET_TEXT = "\"\": {\r\n"
    + "    \"prefix\": \"\",\r\n"
    + "    \"body\": [\r\n"
    + "        \"\"\r\n"
    + "    ],\r\n"
    + "    \"description\": \"\"\r\n"
    + "}";

const titlePre = EMPTY_SNIPPET_TEXT[0];
const titlePost = EMPTY_SNIPPET_TEXT.substring(1, 7);

const prefixPre = EMPTY_SNIPPET_TEXT.substring(7, 22);
const prefixPost = EMPTY_SNIPPET_TEXT.substring(22, 26);

const bodyPre = EMPTY_SNIPPET_TEXT.substring(26, 50);
const bodyPost = EMPTY_SNIPPET_TEXT.substring(50, 61);

const descriptionPre = EMPTY_SNIPPET_TEXT.substring(61, 81);
const descriptionPost = EMPTY_SNIPPET_TEXT.substring(81);

const preArray = [titlePre, prefixPre, bodyPre, descriptionPre];
let contentArray = ["", "", "", ""];
const postArray = [titlePost, prefixPost, bodyPost, descriptionPost];


let tabStopNumber = 1;
let lastCursorPosition = 0;


// /**
//  * Loads the empty Snippet text into the Snippet textarea and sets a CSS
//  * variable used for top and bottom margin of input label elements. This was
//  * a response to misalignment between the code textareas and the Title text
//  * input, and while it works correctly, a better solution would involve
//  * reworking the HTML and CSS again.
// */
// window.addEventListener('load', () => {
//     snippetElem.textContent = EMPTY_SNIPPET_TEXT;

//     const codeLabelBottom = document.getElementById("code_label").getBoundingClientRect()["bottom"];
//     const codeInputTop = bodyElem.getBoundingClientRect()["top"];
//     const difference = (codeInputTop - codeLabelBottom) + (0.005 * window.innerHeight);
//     const marginString = (difference / 2).toString() + "px";

//     const root = document.querySelector(":root");
//     root.style.setProperty("--label-margin", marginString);
// });

// /** 
//  * Saves the last cursor position when the "body" (input code) element has
//  * lost focus. This facilitates tab stop functionality.
//  */
// bodyElem.addEventListener('focusout', (event) => {
//     lastCursorPosition = event.target.selectionStart;
// });

// /**
//  * Assigns the tabStopNumber variable the value from the tab stop number
//  * dropdown box if it is changed manually. Also disables the placeholder text
//  * input element if the Final tab stop has been selected, as the final tab stop
//  * cannot have placeholder text.
//  */
// tabStopNumberElem.addEventListener('change', (event) => {
//     tabStopNumber = event.target.value;

//     if (tabStopNumber == 0) {
//         tabStopPlaceholderTextElem.value = '';
//         tabStopPlaceholderTextElem.disabled = true;
//         tabStopPlaceholderTextElem.placeholder = 'No placeholder for final tab stop';
//     } else {
//         tabStopPlaceholderTextElem.disabled = false;
//         tabStopPlaceholderTextElem.placeholder = '';
//     }
// });

// /**
//  * Handles insertion of tab stops and tab stop placeholder text. Increments the
//  * tab stop number and the value of the tab stop dropdown box after each tab
//  * stop insertion, unless the final tab stop ($0) was inserted or 20 tab stops
//  * has been reached.
//  */
// tabStopButtonElem.addEventListener('click', (event) => {
//     let placeholder = "";

//     if (tabStopPlaceholderTextElem.value) {
//         placeholder = "${" + tabStopNumber + ":"
//             + tabStopPlaceholderTextElem.value + "}";
//     } else {
//         placeholder = "$" + tabStopNumber;
//     }

//     bodyElem.focus();
//     bodyElem.selectionStart = bodyElem.selectionEnd = lastCursorPosition;

//     if (!document.execCommand('insertText', false, placeholder)) {
//         bodyElem.value = bodyElem.value.substring(0, lastCursorPosition) 
//             + placeholder
//             + bodyElem.value.substring(lastCursorPosition);
//     }

//     bodyElem.selectionStart = bodyElem.selectionEnd = lastCursorPosition + placeholder.length;

//     if (tabStopNumber < 20 && tabStopNumber > 0) {
//         tabStopNumberElem.value = tabStopNumber = Number(tabStopNumber) + 1;
//     } else {
//         tabStopNumberElem.value = tabStopNumber;
//     }

//     tabStopPlaceholderTextElem.value = '';
// })

// /**
//  * TEXT EDITOR FUNCTIONALITY: Overwrites default form functionality of tab
//  * changing focus to next form element, instead adds 4 spaces.
//  * NOTE Setting element.value directly overwrites the browser's undo cache.
//  * While execCommand is considered deprecated, the replacement API specifically
//  * lacks a solution for this problem, and execCommand is currently still
//  * supported on all modern browsers, but DOES NOT work in IE21. execCommand
//  * returns false if unsupported, so the original method involving this.value
//  * is enclosed in an if as a fall-back. Oddly, because the execCommand method
//  * doesn't work on IE, the other method is used, but IE also seems to retain undo
//  * functionality when setting values using the fall-back method.
//  */
// bodyElem.addEventListener('keydown', function(event) {
//     if (event.key != "Tab")
//         return;
    
//     event.preventDefault();

//     if (!document.execCommand('insertText', false, '    ')) {
//         let start = this.selectionStart;
//         let end = this.selectionEnd;
//         this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
//         this.selectionStart = this.selectionEnd = start + 4;
//     }
// });

// /**
//  * TEXT EDITOR FUNCTIONALITY: Adds a closing curly brace, parenthese, or square
//  * bracket when an opening brace is typed unless text is highlighted, in which
//  * case it will enclose the selection in the appropriate braces. If "enter" is
//  * the next key to be typed, indents and adds an additional linebreak. Updated
//  * to work for quotes and angle brackets as well.
//  * TODO Keep track of indent amounts in order to indent the correct amount and
//  * place the closing brace in the correct position.
//  */
// bodyElem.addEventListener('keydown', function(event) {
//     if (event.key != "{" && event.key != "(" && event.key != "["
//             && event.key != "<" && event.key != "'" && event.key != "\"") {
//         return;
//     }

//     let openingChar = event.key;
//     let closingChar;

//     switch (openingChar) {
//         case "{":
//             closingChar = "}";
//             break;
//         case "[":
//             closingChar = "]";
//             break;
//         case "(":
//             closingChar = ")"; 
//             break;
//         case "<":
//             closingChar = ">";
//             break;
//         case "'":
//             closingChar = "'";
//             break;
//         case "\"":
//             closingChar = "\"";
//             break;
//         default:
//             closingChar = "";
//     }

//     let start = this.selectionStart;
//     let end = this.selectionEnd;

//     if (end > start) {
//         event.preventDefault();
//         if (!document.execCommand('insertText', false, openingChar + this.value.substring(start, end) + closingChar)) {
//             this.value = this.value.substring(0, start) + openingChar + this.value.substring(start, end) + closingChar + this.value.substring(end);
//         }
//         return;
//     }
    
//     event.preventDefault();
//     if (!document.execCommand('insertText', false, openingChar + closingChar)) {
//         this.value = this.value.substring(0, start) + openingChar + closingChar + this.value.substring(end);
//     }
//     this.selectionStart = this.selectionEnd = start + 1;

//     if (openingChar == "\'" || openingChar == "\"" || openingChar == "<") {
//         return;
//     }

//     bodyElem.addEventListener('keydown', function(event2) {
//         if (event2.key != "Enter"){
//             return;
//         }
//         event2.preventDefault();
//         if (!document.execCommand('insertText', false, "\n    \n")) {
//             this.value = this.value.substring(0, start + 1) + "\n    \n" + this.value.substring(end + 1);
//         }
//         this.selectionStart = this.selectionEnd = start + 6;
//     }, { once: true });
// });

// /**
//  * Handles the live update of the Snippet-converted code. The bulk of the work
//  * is done when the "body" element is receiving input. It handles the need for
//  * each line to be a separate element in the array that makes up the value at
//  * the Snippet's body key while also escaping certain special characters that
//  * would otherwise result in broken JSON code. The current solution requires
//  * looping through the entirety of the body element's contents, and while not
//  * ideal, doesn't seem to all that computationally heavy. If users require 
//  * support for very long pieces of code, it likely will be necessary to 
//  * implement a different solution.
//  */
// for (let i = 0; i < allInputElems.length; i++)
// {
//     allInputElems[i].addEventListener('input', function(event) {
//         if (event.target == bodyElem) {
//             contentArray[2] = "";
//             for (let j = 0; j < event.target.value.length; j++) {
//                 if (event.target.value[j] == "\r" || event.target.value[j] == "\n" || event.target.value[j] == "\r\n") {
//                     contentArray[2] += "\\r\"," + "\r\n        \"";
//                 } else if (event.target.value[j] == "\"" || event.target.value[j] === "\\") {
//                     contentArray[2] += "\\" + event.target.value[j];
//                 } else {
//                     contentArray[2] += event.target.value[j];
//                 }
//             }
//         } else {
//             contentArray[i] = event.target.value;
//         }

//         let snippet = "";
        
//         for (let i = 0; i < 4; i++) {
//             snippet += preArray[i] + contentArray[i] + postArray[i];
//         }
        
//         snippetElem.textContent = snippet;
//     });
// }

// /**
//  * Highlights the text in the Snippet element when any part of the element is
//  * clicked.
//  */
// snippetElem.addEventListener('click', (event) => {
//     event.target.selectionStart = 0;
//     event.target.selectionEnd = snippetElem.textContent.length - 1;
// });

/**
 * Copies the snippet to the clipboard when the copy button is clicked. Calls
 * the copySuccess() function which is responsible for checkmark animation
 * signifying that the text was copied.
 * TODO Check to ensure that the Clipboard API is supported by the user's
 * browser, use document.execCommand() if not.
 */
// document.getElementById('copy_button').addEventListener('click', (event) => {
//     navigator.clipboard.writeText(snippetElem.value);
//     copySuccess();
// });

// document.getElementById('paste_button').addEventListener('click', () => {
//     navigator.clipboard.readText().then(
//         clipboardContent => bodyElem.value = clipboardContent
//     );
// });

/**
 * Called when the copy button is clicked. setInterval is called with an arrow
 * function that decrements the opacity every two milliseconds, and setTimeout
 * is called that resets opacity to 0 and clears the interval after 2 seconds.
 */
// function copySuccess()
// {
//     const copyElem = document.getElementById('copy_success');
//     let previousOpacity = 1;
//     copyElem.style.opacity = 1;

//     const intervalId = setInterval(() => {
//         copyElem.style.opacity = previousOpacity - 0.002;
//         previousOpacity = copyElem.style.opacity;
//     }, 2);

//     setTimeout(() => {
//         copyElem.style.opacity = 0;
//         clearInterval(intervalId);
//     }, 2000);
// }

// titleInfoOpenButton.addEventListener('click', () => {
//     titleInfoModal.showModal();
// });

// titleInfoCloseButton.addEventListener('click', () => {
//     closeModalAnimation(titleInfoModal);
// });

// prefixInfoOpenButton.addEventListener('click', () => {
//     prefixInfoModal.showModal();
// });

// prefixInfoCloseButton.addEventListener('click', () => {
//     closeModalAnimation(prefixInfoModal);
// });

// descriptionInfoOpenButton.addEventListener('click', () => {
//     descriptionInfoModal.showModal();
// });

// descriptionInfoCloseButton.addEventListener('click', () => {
//     closeModalAnimation(descriptionInfoModal);
// });

// tabStopInfoOpenButton.addEventListener('click', () => {
//     tabStopInfoModal.showModal();
// });

// tabStopInfoCloseButton.addEventListener('click', () => {
//     closeModalAnimation(tabStopInfoModal);
// });

// codeInfoOpenButton.addEventListener('click', () => {
//     codeInfoModal.showModal();
// });

// codeInfoCloseButton.addEventListener('click', () => {
//     closeModalAnimation(codeInfoModal);
// });

// snippetInfoOpenButton.addEventListener('click', () => {
//     snippetInfoModal.showModal();
// });

// snippetInfoCloseButton.addEventListener('click', () => {
//     closeModalAnimation(snippetInfoModal);
// });

// function closeModalAnimation(elem) {
//     console.log(elem);
//     let previousOpacity = 1;

//     let intervalId = setInterval(() => {
//         elem.style.opacity = previousOpacity - 0.01;
//         previousOpacity = elem.style.opacity;
//     }, 2);

//     setTimeout(() => {
//         elem.style.opacity = 1;
//         elem.close();
//         clearInterval(intervalId);
//     }, 200);
// }
