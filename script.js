document.addEventListener("DOMContentLoaded", function () {
    // Login Form Handling
    const loginForm = document.querySelector("#loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }

    // Dashboard Search Handling
    const manualSearchBtn = document.getElementById("manualSearch");
    if (manualSearchBtn) {
        manualSearchBtn.addEventListener("click", handleManualSearch);
    }

    const gpsButton = document.getElementById("gpsButton");
    if (gpsButton) {
        gpsButton.addEventListener("click", handleGpsSearch);
    }

    // Sign Up Form Handling
    const signUpLink = document.getElementById("signUpLink");
    const signUpForm = document.getElementById("signUpForm");
    const cancelSignUp = document.getElementById("cancelSignUp");
    const registrationForm = document.getElementById("registrationForm");

    if (signUpLink && signUpForm && cancelSignUp && registrationForm) {
        signUpLink.addEventListener("click", () => {
            loginForm.style.display = "none";
            signUpForm.style.display = "block";
        });

        cancelSignUp.addEventListener("click", () => {
            signUpForm.style.display = "none";
            loginForm.style.display = "block";
        });

        registrationForm.addEventListener("submit", handleSignUp);
    }

    // Booking Form Handling
    const bookingDetailsForm = document.getElementById("bookingDetailsForm");
    if (bookingDetailsForm) {
        bookingDetailsForm.addEventListener("submit", handleBookingSubmit);
    }

    // Confirmation Page Logic
    const storedBookingDetails = localStorage.getItem('bookingDetails');
    if (storedBookingDetails) {
        const bookingDetails = JSON.parse(storedBookingDetails);
        const parkingData = {
            manual: [
                { name: "City Mall Parking", price: 50, distance: "1.2 km from City Mall", type: "Garage", rating: "⭐⭐⭐⭐" },
                { name: "Station Parking", price: 30, distance: "2.5 km from Station", type: "Open", rating: "⭐⭐⭐" },
                { name: "Metro Plaza Parking", price: 45, distance: "3.0 km from Metro Plaza", type: "Drive-in", rating: "⭐⭐⭐⭐⭐" }
            ],
            gps: [
                { name: "Downtown Parking", price: 40, distance: "0.8 km from your location", type: "Drive-in", rating: "⭐⭐⭐⭐⭐" },
                { name: "Plaza Parking", price: 35, distance: "1.5 km from your location", type: "Garage", rating: "⭐⭐⭐⭐" },
                { name: "Central Mall Parking", price: 55, distance: "2.2 km from your location", type: "Open", rating: "⭐⭐⭐⭐" }
            ]
        };

        let pricePerHour = 0;
        for (const type in parkingData) {
            const parkingSpots = parkingData[type];
            for (const spot of parkingSpots) {
                if (spot.name === bookingDetails.parking) {
                    pricePerHour = spot.price;
                    break;
                }
            }
            if (pricePerHour !== 0) break;
        }

        const amount = bookingDetails.duration * pricePerHour;

        const bookingSummary = document.getElementById('bookingSummary');
        if (bookingSummary) {
            bookingSummary.innerHTML = `
                <h3>Parking: ${bookingDetails.parking}</h3>
                <p>Check-in: ${bookingDetails.date} at ${bookingDetails.time}</p>
                <p>Duration: ${bookingDetails.duration} hours</p>
                <p>Amount: ₹${amount}</p>
            `;
        }
    }
});

function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginBtn = document.getElementById('loginBtn');

    if (!username || !password) {
        alert("Please enter both username and password!");
        return;
    }

    loginBtn.textContent = "Logging in...";
    loginBtn.disabled = true;

    setTimeout(() => {
        if (username === "test" && password === "password") {
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid username or password");
            loginBtn.textContent = "Login";
            loginBtn.disabled = false;
        }
    }, 1500);
}

function handleManualSearch() {
    const userLocation = document.getElementById("manualLocation").value.trim();
    if (!userLocation) {
        alert("Please enter a location!");
        return;
    }
    showParkingLocations("manual", userLocation);
}

function handleGpsSearch() {
    alert("Fetching Location...");

    setTimeout(() => {
        alert("Location Fetched!");
        showParkingLocations("gps");
    }, 2000);
}

function showParkingLocations(type, userLocation = "") {
    let parkingData = {
        manual: [
            { name: "City Mall Parking", price: "₹50/hr", distance: `1.2 km from ${userLocation}`, type: "Garage", rating: "⭐⭐⭐⭐" },
            { name: "Station Parking", price: "₹30/hr", distance: `2.5 km from ${userLocation}`, type: "Open", rating: "⭐⭐⭐" },
            { name: "Metro Plaza Parking", price: "₹45/hr", distance: `3.0 km from ${userLocation}`, type: "Drive-in", rating: "⭐⭐⭐⭐⭐" }
        ],
        gps: [
            { name: "Downtown Parking", price: "₹40/hr", distance: "0.8 km from your location", type: "Drive-in", rating: "⭐⭐⭐⭐⭐" },
            { name: "Plaza Parking", price: "₹35/hr", distance: "1.5 km from your location", type: "Garage", rating: "⭐⭐⭐⭐" },
            { name: "Central Mall Parking", price: "₹55/hr", distance: "2.2 km from your location", type: "Open", rating: "⭐⭐⭐⭐" }
        ]
    };

    document.getElementById("parkingResults").innerHTML = parkingData[type].map(p => `
        <div class="parking-slot">
            <h3>${p.name}</h3>
            <p>${p.distance}</p>
            <p class="price">${p.price}</p>
            <p>${p.type}</p>
            <p class="rating">${p.rating}</p>
            <a href="booking.html?parking=${p.name}"><button class="book-button">Book Now</button></a>
        </div>
    `).join("");
}

function handleSignUp(event) {
    event.preventDefault();

    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    console.log("Sign Up Details:", {
        username: newUsername,
        password: newPassword
    });

    alert("Sign up successful! (Placeholder - implement server-side logic)");
    document.getElementById("registrationForm").reset();
    document.getElementById("signUpForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

function handleBookingSubmit(event) {
    event.preventDefault();

    const selectedParking = document.getElementById("selectedParking").value;
    const checkinDate = document.getElementById("checkinDate").value;
    const checkinTime = document.getElementById("checkinTime").value;
    const duration = document.getElementById("duration").value;

    if (!selectedParking || !checkinDate || !checkinTime || !duration) {
        alert("Please fill in all the booking details.");
        return;
    }

    const bookingDetails = {
        parking: selectedParking,
        date: checkinDate,
        time: checkinTime,
        duration: duration
    };

    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    window.location.href = "confirmation.html";
}