export const login = (username, password) =>
    // fetch(`https://gentle-waters-31699.herokuapp.com/api/login`, {
        fetch(`http://localhost:8080/api/login`, {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())



export default {
    login
}
