export const createUser = (user) =>
    fetch(`http://localhost:8080/api/users/`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())



export default {
    createUser
}