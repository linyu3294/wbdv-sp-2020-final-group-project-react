import React from "react";

export const saveListing = (listing) =>
fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/listings`, {
    method: "POST",
    body: JSON.stringify(listing),
    headers: {
        'content-type': 'application/json'
    },
    credentials: "include"
}).then(response => response.json())


export const findInterestedUsers = (listingId) =>
fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/listings/${listingId}/users`, {
    method: 'GET',
    credentials: "include"
}).then(response => response.json())


export const landlordCreateListing = (listing) => 
    fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/listings/landlord/create`, {
        method: "POST",
        body: JSON.stringify(listing),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())



export const findLandlordForListing = (listingId) => 
    fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/listings/${listingId}/landlord`, {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())



export const landlordEditListing = (listing, listingId) => {
    fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/listings/landlord/edit/${listingId}`,{
        method: "PUT",
        body: JSON.stringify(listing),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())
}

export const getListingDetails = (listingId) =>
    fetch(`https://enigmatic-atoll-63616.herokuapp.com/api/listings/${listingId}`, {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())

export default {
    saveListing,
    landlordCreateListing,
    findInterestedUsers,
    getListingDetails,
    landlordEditListing,
    findLandlordForListing
}