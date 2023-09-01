document.addEventListener("DOMContentLoaded", function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            )
                .then((response) => response.json())
                .then((data) => {

                    const city = document.getElementById("city");
                    city.innerText = data.address.state;
                    const country = document.getElementById("country");
                    country.innerText = data.address.country;
                    const time = document.getElementById("time");
                    time.innerText = new Date().toLocaleTimeString();
                    const altitude = document.getElementById("altitude");
                    altitude.innerText = position.coords.altitude;
                    // document.getElementById("country").textContent = country;
                    // document.getElementById("time").textContent = time;
                    // document.getElementById("altitude").textContent = altitude;

                    document.getElementById("locationInfo").style.display =
                        "block";
                })
                .catch((error) =>
                    console.error("Error fetching location data:", error)
                );
        });
    } else {
        alert("Geolocation is not available in your browser.");
    }
});
