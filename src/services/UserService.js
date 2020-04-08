export const createUser = (user) =>
    fetch(`https://gentle-waters-31699.herokuapp.com/api/users/`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())



export default {
    createUser
}