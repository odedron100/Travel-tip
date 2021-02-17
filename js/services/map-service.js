import { utilService } from './util-service.js';
export const mapService = {
    getLocs,
    createLocations,
    getLocsBySearch
}
var locs = [{ lat: 11.22, lng: 22.11 }]
window.gLocations = [];

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function createLocations(pos, locId) {
    var createNewLocation = {
        id: locId,
        // name: ,
        lat: pos.lat,
        lng: pos.lng,
        // weather: ,
        createdAt: Date.now(),
        // updatedAt:,
    }
    if (!createNewLocation.id) {
        alert('This is not a place')
        return Promise.reject('not a place');
    }
    window.gLocations.push(createNewLocation);
    return Promise.resolve(window.gLocations);
}

function getLocsBySearch() {
    const API_KEY = 'AIzaSyAchi1_MEb0QoTUt3dFyTQ7wJ6Rn7Db574';
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => console.log(data));
}