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

export default {
    createUser,
    getProfile
}