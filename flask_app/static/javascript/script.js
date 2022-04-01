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
var contentArray = ["", "", "", ""];
const postArray = [titlePost, prefixPost, bodyPost, descriptionPost];


var tabStopNumber = 1;
var lastCursorPosition = 0;


/** Loads the empty Snippet text into the Snippet textarea */
function init()
{
    snippetElem.textContent = EMPTY_SNIPPET_TEXT;
}

/** 
 * Saves the last cursor position when the "body" (input code) element has
 * lost focus. This facilitates tab stop functionality, specifically auto-
 * incrementing of the tab stop number.
 */
bodyElem.addEventListener('focusout', (event) => {
    lastCursorPosition = event.target.selectionStart;
});

/**
 * Assigns the tabStopNumber variable the value from the tab stop number
 * dropdown box if it is changed manually. Also disables the placeholder text
 * input element if the Final tab stop has been selected, as the final tab stop
 * cannot have placeholder text.
 */
tabStopNumberElem.addEventListener('change', (event) => {
    tabStopNumber = event.target.value;

    if (tabStopNumber == 0) {
        tabStopPlaceholderTextElem.value = '';
        tabStopPlaceholderTextElem.disabled = true;
        tabStopPlaceholderTextElem.placeholder = 'No placeholder for final tab stop';
    } else {
        tabStopPlaceholderTextElem.disabled = false;
        tabStopPlaceholderTextElem.placeholder = '';
    }
});

/**
 * Handles insertion of tab stops and tab stop placeholder text. Increments the
 * tab stop number and the value of the tab stop dropdown box after each tab
 * stop insertion, unless the final tab stop ($0) was inserted or 20 tab stops
 * has been reached.
 */
tabStopButtonElem.addEventListener('click', (event) => {
    let placeholder = "";

    if (tabStopPlaceholderTextElem.value) {
        placeholder = "${" + tabStopNumber + ":"
            + tabStopPlaceholderTextElem.value + "}";
    } else {
        placeholder = "$" + tabStopNumber;
    }

    bodyElem.focus();
    bodyElem.selectionStart = bodyElem.selectionEnd = lastCursorPosition;

    if (!document.execCommand('insertText', false, placeholder)) {
        bodyElem.value = bodyElem.value.substring(0, lastCursorPosition) 
            + placeholder
            + bodyElem.value.substring(lastCursorPosition);
    }

    bodyElem.selectionStart = bodyElem.selectionEnd = lastCursorPosition + placeholder.length;

    if (tabStopNumber < 20 && tabStopNumber > 0) {
        tabStopNumberElem.value = tabStopNumber = Number(tabStopNumber) + 1;
    } else {
        tabStopNumberElem.value = tabStopNumber;
    }
})

/**
 * TEXT EDITOR FUNCTIONALITY: Overwrites default form functionality of tab
 * changing focus to next form element, instead adds 4 spaces.
 * NOTE Setting element.value directly overwrites the browser's undo cache.
 * While execCommand is considered deprecated, the replacement API specifically
 * lacks a solution for this problem, and execCommand is currently still
 * supported on all modern browsers, but DOES NOT work in IE21. execCommand
 * returns false if unsupported, so the original method involving this.value
 * is enclosed in an if as a fall-back. Oddly, because the execCommand method
 * doesn't work on IE, the other method is used, but IE also seems to retain undo
 * functionality when setting values using the fall-back method.
 */
bodyElem.addEventListener('keydown', function(event) {
    if (event.key != "Tab")
        return;
    
    event.preventDefault();

    if (!document.execCommand('insertText', false, '    ')) {
        let start = this.selectionStart;
        let end = this.selectionEnd;
        this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
    }
});

/**
 * TEXT EDITOR FUNCTIONALITY: Adds a closing curly brace, parenthese, or square
 * bracket when an opening brace is typed unless text is highlighted, in which
 * case it will enclose the selection in the appropriate braces. If "enter" is
 * the next key to be typed, indents and adds an additional linebreak. Updated
 * to work for single and double quotes as well.
 * TODO Keep track of indent amounts in order to indent the correct amount and
 * place the closing brace in the correct position.
 */
bodyElem.addEventListener('keydown', function(event) {
    if (event.key != "{" && event.key != "(" && event.key != "["
            && event.key != "\'" && event.key != "\"") {
        return;
    }

    let openingChar = event.key;
    let closingChar;

    if (openingChar == "{") {
        closingChar = "}";
    } else if (openingChar == "[") {
        closingChar = "]";
    } else if (openingChar == "(") {
        closingChar = ")";
    } else if (openingChar == "\'") {
        closingChar = "\'";
    } else {
        closingChar = "\"";
    }

    let start = this.selectionStart;
    let end = this.selectionEnd;

    if (end > start) {
        event.preventDefault();
        if (!document.execCommand('insertText', false, openingChar + this.value.substring(start, end) + closingChar)) {
            this.value = this.value.substring(0, start) + openingChar + this.value.substring(start, end) + closingChar + this.value.substring(end);
        }
        return;
    }
    
    event.preventDefault();
    if (!document.execCommand('insertText', false, openingChar + closingChar)) {
        this.value = this.value.substring(0, start) + openingChar + closingChar + this.value.substring(end);
    }
    this.selectionStart = this.selectionEnd = start + 1;

    if (openingChar == "\'" || openingChar == "\"") {
        return;
    }

    bodyElem.addEventListener('keydown', function(event2) {
        if (event2.key != "Enter"){
            return;
        }
        event2.preventDefault();
        if (!document.execCommand('insertText', false, "\n    \n")) {
            this.value = this.value.substring(0, start + 1) + "\n    \n" + this.value.substring(end + 1);
        }
        this.selectionStart = this.selectionEnd = start + 6;
    }, { once: true });
});

/**
 * Handles the live update of the Snippet-converted code. The bulk of the work
 * is done when the "body" element is receiving input. It handles the need for
 * each line to be a separate element in the array that makes up the Snippet's
 * body key while also escaping certain special characters that would otherwise
 * result in broken JSON code. The current solution requires looping through
 * the entirety of the body element's contents, and while not ideal, doesn't
 * seem to all that computationally heavy. If users require support for very
 * long pieces of code, it likely will be necessary to implement a different
 * solution.
 */
for (let i = 0; i < allInputElems.length; i++)
{
    allInputElems[i].addEventListener('input', function(event) {
        if (event.target == bodyElem) {
            contentArray[2] = "";
            for (let i = 0; i < event.target.value.length; i++) {
                if (event.target.value[i] == "\r" || event.target.value[i] == "\n" || event.target.value[i] == "\r\n") {
                    contentArray[2] += "\\r\"," + "\r\n        \"";
                } else if (event.target.value[i] == "\"" || event.target.value[i] === "\\") {
                    contentArray[2] += "\\" + event.target.value[i];
                } else {
                    contentArray[2] += event.target.value[i];
                }
            }
        } else {
            contentArray[i] = event.target.value;
        }

        let snippet = "";
        
        for (let i = 0; i < 4; i++) {
            snippet += preArray[i] + contentArray[i] + postArray[i];
        }
        
        snippetElem.textContent = snippet;
    });
}
