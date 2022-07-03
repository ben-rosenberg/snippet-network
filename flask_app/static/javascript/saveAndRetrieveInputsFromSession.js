//import { ALL_INPUT_ELEM_IDS } from './CONSTANTS';

const CONSTANTS = {
    ALL_INPUT_ELEM_IDS: [
        'title_text',
        'prefix_text',
        'description_text',
        'body_text',
        'tab_stop_number'
    ]
}

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

/**
 * 
 * @param {Event} event 
 */
 const sendNewValue = (event) => {
    serverHttpRequest('POST', '/save', { element: event.target.id, value: event.target.value })
        .then(responseData => console.log('POST:\n' + responseData))
        .catch(error => console.log(error));
}

const loadStoredValues = () => {
    console.log('loadfunc');
    const allInputElems = initAllInputElems();

    serverHttpRequest('GET', '/retrieve')
        .then(responseData => {
            console.log(responseData);
            for (let key in responseData) {
                if (allInputElems.hasOwnProperty(key)) {
                    allInputElems[key].value = responseData[key];
                }
            }
        }).catch(error => {
            console.log(error);
        });
};

const initAllInputElems = () => {
    const allInputElems = {};

    for (let id of CONSTANTS.ALL_INPUT_ELEM_IDS) {
        allInputElems[id] = document.getElementById(id);
        allInputElems[id].addEventListener('change', sendNewValue);
    }

    return allInputElems;
};

window.addEventListener('load', loadStoredValues);