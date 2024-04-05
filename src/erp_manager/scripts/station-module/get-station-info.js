document.addEventListener("DOMContentLoaded", function() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.fuelsync.hertinox.fr/settings/getsettings.php", true);
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var response = JSON.parse(request.responseText);
                for (var i = 0; i < response.length; i++) {
                    if (response[i].settingID === "openHour") {
                        document.getElementById("schedule-start").value = response[i].settingValue;
                    } else if (response[i].settingID === "closeHour") {
                        document.getElementById("schedule-end").value = response[i].settingValue;
                    } else if (response[i].settingID === "phone") {
                        var phoneValue = response[i].settingValue;
                        var formattedPhone = phoneValue.match(/.{1,2}/g).join(" ");
                        document.getElementById("phone-input").value = formattedPhone;
                    }
                }
            } else {
                console.error("Error: Status code " + request.status);
            }
        }
    };
    request.send();
});
