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
 * according to the parameters specified by the user
 * @function createCalendar
 */
function createCalendar() {
    clearHTML();
    if(validateInputData()){
        let input = getInputData();
        let calendar = Object.create(Calendar);
        calendar.drawCalendar(input.date, input.days, input.code, "");
        getCalendar(calendar.getHtmlString());
    }    
}

/**
 * Gets the values of the user inputs based on the array passed in the function to 
 * calculate the payment. The results will be sent to validate later on.
 * @function getInputData
 */
function getInputData() {
    let inputDate = document.getElementById("date").value,
    //New Date will make date one less day because of the timezone
    realDate = new Date(inputDate);
    //Adding the lost day to keep accuracy
    realDate.setDate(realDate.getDate() + 1);
    return {
        days: document.getElementById("days").value,
        code: document.getElementById("code").value,
        date: realDate
    }
}

/**
 * This function in particular will append the html string created directly to the page
 * @function getCalendar
 */
function getCalendar(htmlText) {
    document.querySelector(".calendar").insertAdjacentHTML("beforeend", htmlText);
}

/**
 * Clearing the existing HTML because if not the new calendar rendition will just be added 
 * to the page beside the existing one.
 * @function clearHTML
 */
function clearHTML() {
    var elem = document.querySelector(".calendar");
    elem.innerHTML = "";
}

/**
 * Validation for the user input data
 * @function validateInputData
 */
function validateInputData() {
    var valid = 0;
    var message = "";

    if (!document.getElementById("date").checkValidity()) {
        valid++;
    }
    if (!document.getElementById("days").checkValidity()) {
        valid++;
    }
    if (!document.getElementById("code").checkValidity()) {
        valid++;
    }

    if (valid > 0) {
        alert("Please insert valid input data.");
    } 

    return valid == 0;
}