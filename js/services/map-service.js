import { storageService } from './storage-service.js';

export const mapService = {
    getLocs,
    createLocations
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

function createLocations(pos, locId) {
    let locations = storageService.loadFromStorage(window.KEY);
    if (locations && locations[locId]) {
        return Promise.resolve(locations)
    }
    if (!locId) {
        alert('This is not a place')
        return Promise.reject('not a place');
    }
    var name = prompt('Enter name of your place')
    window.gLocations[locId] = {
        name: name,
        lat: pos.lat,
        lng: pos.lng,
        createdAt: Date.now(),
    };
    storageService.saveToStorage(window.KEY, window.gLocations)
    return Promise.resolve(window.gLocations);
}
