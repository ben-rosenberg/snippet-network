import { SNIPPET_BOILERPLATE } from './snippetBoilerplate.js';

const processedCode = {
    title_text: '',
    prefix_text: '',
    body_text: '',
    description_text: ''
}

const LINE_BREAK_CHARS = '\\r",\r\n        "';

const getSnippetTextAfterProcessing = () => {
    return (
        SNIPPET_BOILERPLATE.title.pre + processedCode.title_text + SNIPPET_BOILERPLATE.title.post
        + SNIPPET_BOILERPLATE.prefix.pre + processedCode.prefix_text + SNIPPET_BOILERPLATE.prefix.post
        + SNIPPET_BOILERPLATE.body.pre + processedCode.body_text + SNIPPET_BOILERPLATE.body.post
        + SNIPPET_BOILERPLATE.description.pre + processedCode.description_text + SNIPPET_BOILERPLATE.description.post
    );
};

const processBody = () => {
    const bodyElem = document.getElementById('body_text');
    let processedBody = '';

    for (let i = 0; i < bodyElem.value.length; i++) {
        if (bodyElem.value[i] === '\r' || bodyElem.value[i] === '\n') {
            processedBody += LINE_BREAK_CHARS;
        } else if (bodyElem.value[i] == '"' || bodyElem.value[i] === '\\') {
            processedBody += '\\' + bodyElem.value[i];
        } else {
            processedBody += bodyElem.value[i];
        }
    }

    return processedBody;
}

/**
 * Handles the live update of the Snippet-converted code. The bulk of the work
 * is done when the "body" element is receiving input. It handles the need for
 * each line to be a separate element in the array that makes up the value at
 * the Snippet's body key while also escaping certain special characters that
 * would otherwise result in broken JSON code. The current solution requires
 * looping through the entirety of the body element's contents, and while not
 * ideal, doesn't seem to be all that computationally heavy. If users require 
 * support for very long pieces of code, it likely will be necessary to 
 * implement a different solution.
 * 
 * @param {InputEvent} event The user input event from the listener
 */
const updateSnippetOnInput = (event) => {
    if (event.target.id == 'body_text') {
        processedCode.body_text = processBody();
    } else {
        processedCode[event.target.id] = event.target.value;
    }

    document.getElementById('snippet_text').textContent = getSnippetTextAfterProcessing();
};

const updateSnippetOnLoad = () => {
    for (let elemKey in processedCode) {
        if (elemKey === 'body_text') {
            processedCode[elemKey] = processBody();
        } else {
            processedCode[elemKey] = document.getElementById(elemKey).value;
        }
    }

    document.getElementById('snippet_text').textContent = getSnippetTextAfterProcessing();
}


export { updateSnippetOnInput, updateSnippetOnLoad };