var Calendar = {  
    data: {
        html: ""
    },
    drawCalendar: function(initialDate, daysToRender, countryCode, htmlString) {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            daysInMonth = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            limitForRows = [7, 14, 21, 28, 35, 42],
            rowBreak = [8, 14, 21, 28, 35, 42],
            paint = true;
        
        var getFirstDay = function(date) {
            let day = -1,
                realDate = date.toString();
            day = realDate.split(" ")[2].replace(/(^|-)0+/g, "$1");
            return day;
        }
        
        var getDaysOfTheMonth = function(month, year) {
            let daysToRender = -1;
            if (month === 1) {
                daysToRender = (((year % 100 != 0) && (year % 4 == 0)) || (year % 400 == 0)) ? 29 : 28;
            } else {
                daysToRender = daysInMonth[month];
            }
            return daysToRender;
        }

        // Consumes REST api
        var getHolidays = function (year, month) {
            var url = "https://holidayapi.com/v1/holidays?key=184143e0-a679-4f20-af41-7afd666ef867&country=" + countryCode + "&year=" + year + "&month=" + month;
            var httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', url, false);
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4) {
                    if (httpRequest.status == 200) {
                        try {
                            data = JSON.parse(httpRequest.response);
                        } catch (e) {
                            console.log(e.toString());
                        }
                    } else {
                        console.log("Error", httpRequest.statusText);
                    }
                }
            }
            httpRequest.onerror = function (e) {
                console.error(httpRequest.statusText);
            }
            httpRequest.send();
        }

        isHoliday = function(d) {
            for (let i = 0; i < data.holidays.length; i++) {
                if (data.holidays[i].date.split("-")[2].replace(/(^|-)0+/g, "$1") == d)
                    return data.holidays[i].name;
            }
            return false;
        }

        let monthToRender = initialDate.getMonth(),
            yearToRender = initialDate.getFullYear(),
            startDate = initialDate.getDay()+1,
            initialDay = getFirstDay(initialDate),
            title = "",
            holidayName = -1,
            style = "weekday",
            value;

        getHolidays(yearToRender, monthToRender + 1);

        htmlString += '<div><table cols="7" cellpadding="0" cellspacing="0" class="month-container"><tr align="center" class="days">';

        // Days of the week title
        if(paint){
            for (let s = 0; s < 7; s++) {
                htmlString += '<td class="day-title">' + "SMTWTFS".substr(s, 1) + '</td>';
            }
            paint = false;
        }   

        htmlString += '</tr><tr align="center">';
        htmlString += '<td colspan="7" align="center" class="month-title">' + months[monthToRender] + ' - ' + yearToRender + '</td></tr><tr align="center"> </tr><tr align="center">';

        //Render the calendar, 42  possible individual cells
        for (let i = 1; i <= 42; i++) {

            //This row will be added to specify when no more rows should be added and should break out of the for loop
            if (value === '&nbsp;' && (i > startDate) && rowBreak.indexOf(i) != -1) {
                break;
            }

            if ((i >= startDate) && (initialDay <= getDaysOfTheMonth(monthToRender, yearToRender)) && (daysToRender > 0)) {
                value = initialDay;
                daysToRender--;
                initialDay++;

                // Returns true if the day is a holiday
                holidayName = isHoliday(value);

                if (holidayName) {
                    style = "holiday";
                    title = 'title="' + holidayName + '"';
                } else {
                    style = ((i) % 7 == 0) || ((i - 1) % 7 == 0) ? "weekend" : "weekday";
                    title = "";
                }
            } else {
                //Invalid date should be color gray
                value = '&nbsp;';
                style = "invalid-date";
            }

            htmlString += '<td class="' + style + '"' + title + '">' + value + '</td>';

            //Limit the number of days per row
            if(limitForRows.indexOf(i) != -1 ) {
                htmlString += '</tr><tr align="center">';
            }  
        }
        htmlString += '</tr></table></div>';

        //Call drawCalendar to render every month needed
        if (daysToRender > 0) {
            let nextMonth = monthToRender === 11 ? 0 : monthToRender + 1,
                yearToRender2 = nextMonth === 1 ? yearToRender2 + 1 : yearToRender,
                date = new Date(yearToRender2, nextMonth, 01);

            this.drawCalendar(date, daysToRender, countryCode, htmlString);
        } else {
            this.data.html = htmlString;
        }
    },
    getHtmlString: function() {
        return this.data.html;
    }
};