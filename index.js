/* Maria Jose Midence */
/* Calendar Exercise - n8*/

/**
 * Basic function that is called after the window has been loaded.
 * Binds the event listener's function to the submit button to calculate the calendar rendering.
 * @function onload
 */
window.onload = function() {
    addEventListeners();
};

/**
 * Add Event Listener is a function that will bind a listener to the button  
 * to submit and signal that the calendar should be rendered according to the parameters.
 * @function addEventListeners
 */
function addEventListeners() {
    document.getElementById("submit").addEventListener("click", function () {
        createCalendar();
    });
}   

/**
 * Initial function that will call the subfunctions to render a calendar  
 * according to the parameters specified by the user.
 * @function createCalendar
 */
function createCalendar() {
    let input = getInputData();
}

/**
 * Gets the values of the user inputs based on the array passed in the function to 
 * calculate the payment. The results will be sent to validate later on.
 * @function getInputData
 */
function getInputData() {
    return {
        days: document.getElementById("days").value,
        code: document.getElementById("code").value,
        date: document.getElementById("date").value
    }
}

