/**
 * TODO Maybe write this function to do the document.execCommand() thing,
 * checking for support, and doing it the other way if it's not supported.
 * 
 * @param {HTMLTextAreaElement} element 
 * @param {Number} selectionStart 
 * @param {Number} selectionEnd 
 */
/* const replaceText = (element, selectionStart, selectionEnd) => {
    if (selectionStart < 0 || selectionEnd)
} */

/**
 * Handles a tab keydown by preventing the default behavior of focusing on the
 * next indexed form element by instead adding four spaces. This is called from
 * the handleKeydown() function if the key is "Tab", and that function is
 * called by a keydown event listener on the body element.
 * 
 * @param {KeyboardEvent} event The tab keydown from the listener
 */
const handleTabKeydown = (event) => {
    event.preventDefault();

    if (!document.execCommand('insertText', false, '    ')) {
        let start = event.target.selectionStart;
        let end = event.target.selectionEnd;
        event.target.value = event.target.value.substring(0, start) + "    " + event.target.value.substring(end);
        event.target.selectionStart = event.target.selectionEnd = start + 4;
    }
}

/**
 * 
 * @param {KeyboardEvent} event 
 * @returns
 */
const handleBracesAndQuotesKeydown = (event) => {
    let openingChar = event.key;
    let closingChar;

    switch (openingChar) {
        case '{':
            closingChar = '}';
            break;
        case '[':
            closingChar = ']';
            break;
        case '(':
            closingChar = ')'; 
            break;
        case "'":
            closingChar = "'";
            break;
        case '"':
            closingChar = '"';
            break;
        default:
            closingChar = '';
    }

    let selectionStart = event.target.selectionStart;
    let selectionEnd = event.target.selectionEnd;

    event.preventDefault();

    if (selectionEnd > selectionStart) {
        if (!document.execCommand('insertText', false, openingChar + event.target.value.substring(selectionStart, selectionEnd) + closingChar)) {
            event.target.value = event.target.value.substring(0, selectionStart)
                + openingChar
                + event.target.value.substring(selectionStart, selectionEnd)
                + closingChar
                + event.target.value.substring(selectionEnd);
        }
    } else {
        if (!document.execCommand('insertText', false, openingChar + closingChar)) {
            event.target.value = event.target.value.substring(0, selectionStart)
            + openingChar
            + closingChar
            + event.target.value.substring(selectionEnd);
        }

        event.target.selectionStart = event.target.selectionEnd = selectionStart + 1;

        if (openingChar == "'" || openingChar == '"') {
            return;
        }

        document.getElementById('body_text').addEventListener('keydown', (nextKeydownEvent) => {
            if (nextKeydownEvent.key !== "Enter"){
                return;
            }

            nextKeydownEvent.preventDefault();

            if (!document.execCommand('insertText', false, "\n    \n")) {
                event.target.value = event.target.value.substring(0, selectionStart + 1) + "\n    \n" + event.target.value.substring(selectionEnd + 1);
            }

            event.target.selectionStart = event.target.selectionEnd = selectionStart + 6;
        }, { once: true });
    }
}

/**
 * Handles a keydown from the body element, dispatching it to the appropriate
 * text editor function if the key is tab or an opening bracket/quote.
 * 
 * @param {KeyboardEvent} event The keydown event from the listener
 */
const handleKeydown = (event) => {
    if (event.key === 'Tab') {
        handleTabKeydown(event);
    } else if (event.key === '{' || event.key === '(' || event.key === '['
            || event.key === "'" || event.key === '"') {
        handleBracesAndQuotesKeydown(event);
    }
}

export default handleKeydown;