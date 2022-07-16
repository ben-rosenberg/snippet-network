/**
 * Copies the snippet to the clipboard when the copy button is clicked. Calls
 * the copySuccess() function which is responsible for checkmark animation
 * signifying that the text was copied.
 * TODO Check to ensure that the Clipboard API is supported by the user's
 * browser, use document.execCommand() if not.
 */
const copy = () => {
    navigator.clipboard.writeText(document.getElementById('snippet_text').value)
        .then(copySuccess)
        .catch(() => console.log('Error: Clipboard copy failed'));
}

const paste = () => {
    navigator.clipboard.readText()
        .then(clipboardContents => document.getElementById('body_text').value = clipboardContents)
        .catch(error => console.log(`Error: Clipboard paste failed; ${error}`));
}

/**
 * Called when the copy button is clicked. setInterval is called with an arrow
 * function that decrements the opacity every two milliseconds, and setTimeout
 * is called that resets opacity to 0 and clears the interval after 2 seconds.
 */
const copySuccess = () => {
    const copyCheckmarkElem = document.getElementById('copy_success');
    let previousOpacity = 1;
    copyCheckmarkElem.style.opacity = 1;

    const intervalId = setInterval(() => {
        copyCheckmarkElem.style.opacity = previousOpacity - 0.002;
        previousOpacity = copyCheckmarkElem.style.opacity;
    }, 2);

    setTimeout(() => {
        copyCheckmarkElem.style.opacity = 0;
        clearInterval(intervalId);
    }, 2000);
}

const clipboard = { copy, paste };
export default clipboard;