export const login = (username, password) =>
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
