import { utilService } from './util-service.js';
export const mapService = {
    getLocs,
    createLocations
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
    if (!createNewLocation.locId) {
        alert('This is not a place')
        return Promise.reject('not a place');
    }
    window.gLocations.push(createNewLocation);
    return Promise.resolve(window.gLocations);
}

