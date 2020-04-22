export const createUser = (user) =>
    // fetch(`https://gentle-waters-31699.herokuapp.com/api/users/`, {
        fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const getProfile = () =>
    fetch('https://enigmatic-atoll-63616.herokuapp.com/api/profile', {
        method: 'POST',
        credentials: "include"
    }).then(response => response.json())

export const getProfileForGuest = (profileId) =>
fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/profile/${profileId}`, {
    method: 'GET',
    credentials: "include"
}).then(response => response.json())

export const likeListing = (listingId) =>
fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/details/${listingId}`, {
    method: 'POST',
    credentials: "include"
}).then(response => response.json())

export const updateProfile = (profile) =>
fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/profile`, {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: {
        'content-type': 'application/json'
    },
    credentials: "include"
}).then(response => response.json())

export const findLandlords = () =>
    fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/landlords`, {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())

export default {
    createUser,
    getProfile,
    likeListing,
    updateProfile,
    findLandlords,
    getProfileForGuest

}
