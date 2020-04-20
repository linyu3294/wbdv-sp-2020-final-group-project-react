export const createUser = (user) =>
    // fetch(`https://gentle-waters-31699.herokuapp.com/api/users/`, {
        fetch(`http://localhost:8080/api/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const getProfile = () =>
    fetch('http://localhost:8080/api/profile', {
        method: 'POST',
        credentials: "include"
    }).then(response => response.json())

export const getProfileForGuest = (profileId) =>
fetch(`http://localhost:8080/api/profile/${profileId}`, {
    method: 'GET',
    credentials: "include"
}).then(response => response.json())

export const likeListing = (listingId) =>
fetch(`http://localhost:8080/api/details/${listingId}`, {
    method: 'POST',
    credentials: "include"
}).then(response => response.json())

export const updateProfile = (profile) =>
fetch(`http://localhost:8080/api/profile`, {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: {
        'content-type': 'application/json'
    },
    credentials: "include"
}).then(response => response.json())

export const findLandlords = () =>
    fetch(`http://localhost:8080/api/landlords`, {
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
