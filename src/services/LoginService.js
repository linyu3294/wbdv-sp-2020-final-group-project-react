export const login = (username, password) =>
    // fetch(`https://gentle-waters-31699.herokuapp.com/api/login`, {
        fetch(`http://localhost:8080/api/login`, {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const logout = () =>
    fetch(`http://localhost:8080/api/logout`, {
    method: "POST",
    credentials: "include"
})


export default {
    login,
    logout
}
