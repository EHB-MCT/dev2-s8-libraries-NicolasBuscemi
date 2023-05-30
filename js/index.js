'use strict';

const app = {
    map: null, // use this variable to reference the map throughout the application

    init() {
        // initialize the map
        this.map = L.map('map').setView([50.846475, 4.352793], 13);

        // add a tile layer using the OpenStreetMap tile URL
        L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        // use the function "loadMarkers" to add markers to the map
        this.loadMarkers();
    },

    loadMarkers() {
        // fetch the data from opendata.brussels.be
        fetch('https://opendata.brussels.be/api/records/1.0/search/?dataset=toiletten&q=&rows=100&geofilter.distance=50.846475%2C+4.352793%2C+5000')
            .then((response) => response.json())
            .then((data) => {
                // loop over the items
                data.records.forEach((item) => {
                    // check if coordinates are available
                    if (item.geometry && item.geometry.coordinates) {
                        const lat = item.geometry.coordinates[1];
                        const lon = item.geometry.coordinates[0];

                        // use the addMarker function to add a marker to the map
                        this.addMarker(lat, lon);
                    }
                });
            });
    },

    addMarker(lat, lon) {
        // create a marker at the specified lat, lon coordinates
        L.marker([lat, lon]).addTo(this.map)
            .bindPopup('Toilet location'); // add a popup that displays the location of the toilet
    },
};

app.init();
