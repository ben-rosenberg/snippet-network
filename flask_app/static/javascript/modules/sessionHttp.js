import { updateSnippetOnLoad } from './processCodeToJson.js';
import CONSTANTS from './CONSTANTS.js';

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
            reject('Something went wrong');
        }

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(`Something went wrong (status code ${xhr.status})`)
            } else {
                resolve(xhr.response);
            }
        }

        xhr.send(JSON.stringify(updatedData));
    });

    return promise;
};

/**
 * HTTP request to server using fetch() and async/await.
 * 
 * @param {String} method The HTTP verb for this request
 * @param {String} url The URL of server route
 * @param {Object} updatedData The updated data in the case of a POST request
 * @returns {Promise}
 */
const serverHttpRequestFetch = (method, url, updatedData = undefined) => {
    if (method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'POST') {
        throw new Error(`Error (method = ${method}): Method must be 'GET' or 'POST'`);
    }

    /* const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(updatedData)
    });

    return response.json(); */

    return fetch(url, {
        method: method.toUpperCase(),
        headers: updatedData ? { 'Content-Type': 'application/json' } : {},
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (response.status >= 400) {
                const jsonResPromise = response.json();
                return jsonResPromise.then((errorResponseData => {
                    const errorObj = new Error('Something went wrong: Bad server request');
                    errorObj.data = errorResponseData;
                    throw error;
                }));
            }
            return response.json();
        });
};

const loadStoredValues = (allInputElems) => {
    serverHttpRequest('GET', '/retrieve')
        .then(responseData => {
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
    
    /* serverHttpRequestFetch('GET', '/retrieve')
        .then(response => console.log(response))
        .catch(err => console.log(err)); */
};

const loadStoredValuesFetch = () => {
    serverHttpRequestFetch( 'GET', '/retrieve')
        .then(responseData => {
            console.log(responseData);
            for (let key in responseData) {
                if (CONSTANTS.ELEMENTS_STORED_IN_SESSION.hasOwnProperty(key)) {
                    console.log('in if');
                    CONSTANTS.ELEMENTS_STORED_IN_SESSION[key].value = responseData[key];
                }
            }
            updateSnippetOnLoad();
        }).catch(error => {
            console.log(error);
        })
}

/**
 * 
 * @param {Event} event 
 */
const sendNewValue = (event) => {
    serverHttpRequest('POST', '/save', { element: event.target.id, value: event.target.value })
        .then(responseData => console.log('POST:\n' + responseData))
        .catch(error => console.log(error));
}


const sendNewValueFetch = (event) => {
    serverHttpRequestFetch('POST', '/save', { element: event.target.id, value: event.target.value })
        .then(responseData => console.log('POST:\n' + responseData))
        .catch(error => console.log(error));
}

export { sendNewValue, loadStoredValues, loadStoredValuesFetch, sendNewValueFetch };