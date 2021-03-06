import { mapService } from './services/map-service.js';

var gMap;
console.log('Main!');

mapService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {

    document.querySelector('.go-location').addEventListener('click', (ev) => {
        const value = document.querySelector('input[name=location-search]').value;
        mapService.getLocsBySearch(value)
            .then(panTo)
        document.querySelector('input[name=location-search]').value = '';
    })

    initMap()
        .then(() => {
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(() => console.log('INIT MAP ERROR'));
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get your location",
                position: { lat, lng },
            });
            infoWindow.open(gMap);
            gMap.addListener("click", (mapsMouseEvent) => {
                infoWindow.close();
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                );
                const pos = mapsMouseEvent.latLng.toJSON();
                const locId = mapsMouseEvent.placeId;
                infoWindow.open(gMap);
                mapService.createLocations(pos, locId)
                    .then(locations => {
                        console.log('locations', locations);
                        renderNewLocation(locations);
                    })
            });
        })

}

function renderNewLocation(locations) {
    console.log('locations', locations);
    document.querySelector('.location-table').innerHTML = Object.keys(locations).map((location) => {
        console.log('locations[location].pos', locations[location].pos);
        return `
            <div class="location-chose">
                <div class="id">name : ${locations[location].name}</div>
                <button class="remove-button" onclick="onRemoveLoc('${location}')">remove</button>
                <button class="go-button" onclick="onGoLoc('${location}')">go</button>
            </div>
            `
    }).join('')
}

window.onRemoveLoc = (location) => {
    const locationsArray = mapService.getLocations();
    delete locationsArray[location];
    renderNewLocation(locationsArray);
    mapService.updateLocations(locationsArray);
}

window.onGoLoc = (location) => {
    const locationsArray = mapService.getLocations();
    var lng = locationsArray[location].pos.lng;
    var lat = locationsArray[location].pos.lat;
    panTo(lat, lng);
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAchi1_MEb0QoTUt3dFyTQ7wJ6Rn7Db574';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


window.onMyLocation = () => {
    const elMyLocation = document.querySelector('.my-location')
    console.log('elMyLocation', elMyLocation);
    // getPosition()
    //     .then(pos => {
    //         initMap(pos.coords.latitude, pos.coords.longitude)
    //     })
    //     .catch(err => {
    //         console.log('err!!!', err);
    //     })

}
