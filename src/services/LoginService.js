export const login = (username, password) =>
    // fetch(`https://gentle-waters-31699.herokuapp.com/api/login`, {
        fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/login`, {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const logout = () =>
    fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/logout`, {
    method: "POST",
    credentials: "include"
})


export default {
    login,
    logout
}
