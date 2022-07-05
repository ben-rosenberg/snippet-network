import { updateSnippetOnLoad } from './processCodeToJson.js';


/**
 * 
 * @param {String} method 
 * @param {String} url 
 * @param {Object|Undefined} updatedData 
 * @returns {Promise}
 */
 const serverHttpRequest = (method, url, updatedData = undefined) => {
    if (method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'POST') {
        throw new Error(`Error (method = ${method}): Method must be 'GET' or 'POST'`);
    }

    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onerror = () => {
            reject(`Something went wrong (status code ${xhr.status})`);
        }

        xhr.onload = () => {
            resolve(xhr.response);
        }

        xhr.send(JSON.stringify(updatedData));
    });

    return promise;
};

const loadStoredValues = (allInputElems) => {
    /* const allInputElems = {
        title_text: document.getElementById('title_text'),
        prefix_text: document.getElementById('prefix_text'),
        body_text: document.getElementById('body_text'),
        description_text: document.getElementById('description_text'),
    }; */

    serverHttpRequest('GET', '/retrieve')
        .then(responseData => {
            console.log(responseData);
            for (let key in responseData) {
                if (allInputElems.hasOwnProperty(key)) {
                    allInputElems[key].value = responseData[key];
                }
            }
        }).then(() => {
            updateSnippetOnLoad();
        }).catch(error => {
            console.log(error);
        });
};

/**
 * 
 * @param {Event} event 
 */
const sendNewValue = (event) => {
    serverHttpRequest('POST', '/save', { element: event.target.id, value: event.target.value })
        .then(responseData => console.log('POST:\n' + responseData))
        .catch(error => console.log(error));
}


export { sendNewValue, loadStoredValues };