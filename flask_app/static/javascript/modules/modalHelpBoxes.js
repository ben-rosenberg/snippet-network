/**
 * 
 * @param {Number} intervalDuration The duration in milliseconds between calls
 *   to intervalCallback()
 * @param {Number} timeoutDuration The duration in milliseconds before cancelling
 *   the interval
 * @param {Function} intervalCallback The callback to execute every intervalDuration
 *   milliseconds.
 */
const setIntervalWithTimeout = (intervalDuration, timeoutDuration, intervalCallback) => {
    const intervalId = setInterval(() => {
        console.log('calling');
        intervalCallback();
    }, intervalDuration);

    timeoutPromise(timeoutDuration)
        .then((timeoutId) => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        });
}

/**
 * 
 * @param {Number} timeoutDuration 
 * @returns
 */
const timeoutPromise = (timeoutDuration) => {
    const promise = new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            resolve(timeoutId);
        }, timeoutDuration);
    });

    return promise;
}

/**
 * Opens the informational modal dialog box corresponding to the info button
 * that was clicked by the user. This function is appended to mouseclick
 * listeners for each input/output element's info button. The ID of the modal
 * HTML element corresponding to the clicked info button is determined from
 * the ID of the button. A cleaner solution is needed.
 * 
 * @param {MouseEvent} event The info button click event
 */
const openModal = (event) => {
    const modalElemId = event.target.id.slice(0, -11) + 'modal';
    const modalElem = document.getElementById(modalElemId);
    
    console.log(typeof modalElem.showModal);

    if (!modalElem) {
        throw new Error(`Error: ${modalElemId} is not a valid element name`);
    }

    modalElem.style.opacity = 0;
    let prevOp = 0;
    modalElem.showModal();

    const backdrop = window.getComputedStyle(modalElem, '::backdrop');
    console.log(backdrop['opacity']);

    const intervalCallback = () => {
        if (prevOp >= 1) {
            clearInterval()
        }
        console.log(prevOp);
        prevOp += 0.02;
        modalElem.style.opacity = prevOp;
    };

    const intervalId = setInterval(() => {
        if (prevOp >= 1) {
            clearInterval(intervalId);
        }
        console.log(prevOp);
        prevOp += 0.02;
        modalElem.style.opacity = prevOp;
    }, 10);

    //setIntervalWithTimeout(10, 500, intervalCallback);

    /* const intervalId = setInterval(() => {
        modalElem.style.opacity += 0.01;
    }, 5)

    const timeoutId =  */
}

/**
 * Closes the informational modal dialog box that was opened by the user.
 * A listener with this callback is appended to all modal close buttons in
 * main.js.
 * NOTE: It may be worth it to modify this to accept the currently open modal
 * element as an argument, and rather than add this to listeners on all the
 * close buttons, add it to one listener with the { once: true } option from
 * the openModal() function. 
 * 
 * @param {MouseEvent} event The modal close button mouseclick event 
 */
const closeModalAnimation = (event) => {
    const thisModalElemId = event.target.id.slice(0, -12) + 'modal';
    const modalElem = document.getElementById(thisModalElemId);

    let previousOpacity = 1;

    const intervalId = setInterval(() => {
        modalElem.style.opacity = previousOpacity - 0.01;
        previousOpacity = modalElem.style.opacity;
    }, 4);

    animation(modalElem, intervalId).then(timeoutId => clearTimeout(timeoutId));

    /* const timeoutId = setTimeout(() => {
        modalElem.style.opacity = 1;
        modalElem.close();
        clearInterval(intervalId);
    }, 200); */

    //clearTimeout(timeoutId);
}

const animation = (modalElem, intervalId) => {
    const promise = new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            modalElem.style.opacity = 1;
            modalElem.close();
            clearInterval(intervalId);
            resolve(timeoutId);
        }, 400);
    });

    return promise;
}

const modalHelpBoxFunctions = { openModal, closeModalAnimation };
export default modalHelpBoxFunctions;