import { utilService } from './util-service.js';
export const mapService = {
    getLocs
}
var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

// function managingLocations() {
//     var CreateNewLocation = {
//         id: utilService.makeId(),
//         name: ,
//         lat: ,
//         lng,
//         weather: ,
//         createdAt:,
//         updatedAt:,
//     }
// }
