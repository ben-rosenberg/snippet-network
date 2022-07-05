let lastCursorPosition = 0;

const setLastCursorPosition = (event) => {
    lastCursorPosition = event.target.selectionStart;
}

const insertTabStop = () => {
    const tabStopPlaceholderTextElem = document.getElementById('tab_stop_placeholder_text');
    const tabStopNumber = document.getElementById('tab_stop_number').value;
    let placeholder = '$';

    if (tabStopPlaceholderTextElem.value.length > 0) {
        placeholder += '{' + tabStopNumber + ':' + tabStopPlaceholderTextElem.value + '}';
    } else {
        console.log('in else');
        placeholder += tabStopNumber;
    }

    const bodyElem = document.getElementById('body_text');

    bodyElem.focus();
    bodyElem.selectionStart = bodyElem.selectionEnd = lastCursorPosition;

    if (!document.execCommand('insertText', false, placeholder)) {
        bodyElem.value = bodyElem.value.substring(0, lastCursorPosition) 
            + placeholder
            + bodyElem.value.substring(lastCursorPosition);
    }

    bodyElem.selectionStart = bodyElem.selectionEnd = lastCursorPosition + placeholder.length;
    const parsedTabStopNumber = parseInt(tabStopNumber);

    if (parsedTabStopNumber < 20 && parsedTabStopNumber > 0) {
        tabStopNumberElem.value = (parsedTabStopNumber + 1).toString();
    } else {
        tabStopNumberElem.value = tabStopNumber;
    }

    tabStopPlaceholderTextElem.value = '';
}


export { setLastCursorPosition, insertTabStop };