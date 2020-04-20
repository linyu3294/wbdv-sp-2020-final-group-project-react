import React from "react";

export const saveListing = (listing) =>
fetch(`http://localhost:8080/api/listings`, {
    method: "POST",
    body: JSON.stringify(listing),
    headers: {
        'content-type': 'application/json'
    },
    credentials: "include"
}).then(response => response.json())

export const landlordCreateListing = (listing) => {
    fetch(`http://localhost:8080/api/listings/landlord/create`, {
        method: "POST",
        body: JSON.stringify(listing),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    })
}

export default {
    saveListing,
    landlordCreateListing
}