import { storageService } from './storage-service.js';
import { utilService } from './util-service.js';

export const mapService = {
    getLocs,
    createLocations,
    getLocsBySearch,
    getLocations,
    updateLocations
}
var locs = [{ lat: 11.22, lng: 22.11 }]
window.gLocations = {};
window.KEY = 'location';

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function getLocations() {
    return window.gLocations;
}

function updateLocations(locations) {
    window.gLocations = locations;
    storageService.saveToStorage(window.KEY, window.gLocations);
}

function createLocations(pos, locId) {
    let locations = storageService.loadFromStorage(window.KEY);
    if (locations && locations[locId]) {
        return Promise.resolve(locations)
    }
    if (!locId) {
        locId = utilService.makeId();
    }
    var name = prompt('Enter name of your place')
    window.gLocations[locId] = {
        name: name,
        pos: { lat: pos.lat, lng: pos.lng },
        createdAt: Date.now(),
    };
    storageService.saveToStorage(window.KEY, window.gLocations)
    return Promise.resolve(window.gLocations);
}

function getLocsBySearch(place) {
    const API_KEY = 'AIzaSyAchi1_MEb0QoTUt3dFyTQ7wJ6Rn7Db574';
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${place},+CA&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => data.results[0].geometry.location)
}
