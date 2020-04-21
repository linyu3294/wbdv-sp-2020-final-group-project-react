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


export const findInterestedUsers = (listingId) =>
fetch(`http://localhost:8080/api/listings/${listingId}/users`, {
    method: 'GET',
    credentials: "include"
}).then(response => response.json())


export const landlordCreateListing = (listing) => 
    fetch(`http://localhost:8080/api/listings/landlord/create`, {
        method: "POST",
        body: JSON.stringify(listing),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())



export const findLandlordForListing = (listingId) => 
    fetch(`http://localhost:8080/api/listings/${listingId}/landlord`, {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())



export default {
    saveListing,
    landlordCreateListing,
    findInterestedUsers,
    findLandlordForListing
}