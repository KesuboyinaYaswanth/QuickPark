function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    alert("Location detected: Lat " + position.coords.latitude + ", Long " + position.coords.longitude);
    loadParkingSpots("Nearby");
}

function showError(error) {
    alert("Error getting location. Please enter manually.");
}

function loadParkingSpots(location = null) {
    let manualInput = document.getElementById("manualLocation").value;
    if (!location) location = manualInput || "Unknown Location"; 

    const parkingSpots = [
        { name: "City Center Garage", price: "$5/hr", distance: "0.5 km", type: "🅿️ Garage" },
        { name: "Open Lot - Downtown", price: "$3/hr", distance: "0.8 km", type: "🌳 Open Lot" },
        { name: "Airport Parking", price: "$10/hr", distance: "5 km", type: "✈️ Drive-in" },
        { name: "Mall Parking", price: "$4/hr", distance: "1 km", type: "🏢 Mall Parking" }
    ];

    let parkingContainer = document.getElementById("parkingSpots");
    parkingContainer.innerHTML = `<h2>Available Parking in ${location}</h2>`;

    parkingSpots.forEach(spot => {
        let spotDiv = document.createElement("div");
        spotDiv.classList.add("parking-spot");
        spotDiv.innerHTML = `
            <div class="spot-info">
                <h3>${spot.name}</h3>
                <p><strong>Price:</strong> ${spot.price}</p>
                <p><strong>Distance:</strong> ${spot.distance}</p>
                <p><strong>Type:</strong> <span class="parking-type">${spot.type}</span></p>
            </div>
        `;
        parkingContainer.appendChild(spotDiv);
    });
}
