import React from "react";

const urlPrepend = "https://realtor.p.rapidapi.com/properties/list-for-rent?radius=10&sort=relevance&state_code="
const urlMid = "&limit=200&city="
const urlEnd = "&offset=0"

//const search = `${urlPrepend}/${state}/${urlMid}/${city}/${urlEnd}`

 export const getAllListings = async ( city_param, state_code_param) => {
    
    const url = new URL("https://realtor.p.rapidapi.com/properties/list-for-rent")
    url.search = new URLSearchParams({
        radius: 10,
        city: city_param,
        state_code: state_code_param,
        offset: 0,
        sort: "relevance",
        limit: 10
    })

    return await fetch(`${url}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": "99d22da811msh236db1e628775c8p1286c2jsneeac5b338c9d"
        }
    })
        .then(response => response.json())
        .then(actualResponse => actualResponse["listings"])
        .catch(err => {
            console.log(err);
        });

    }

    export const getListingDetails = async (listing_id, prop_status, property_id) => {

    const url = new URL("https://realtor.p.rapidapi.com/properties/detail")
    url.search = new URLSearchParams({
        listing_id: listing_id,
        prop_status: prop_status,
        property_id: property_id
    })

    return await fetch(url,{
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": "99d22da811msh236db1e628775c8p1286c2jsneeac5b338c9d"
        }
    }).then(response => response.json())


    }

    export const getStoredListings = async (city, state) => {
        return await fetch(`http://localhost:8080/api/listings/search/${city}/${state}`)
            .then(response => response.json())
    }

    export const getStoredListingById = async (listingId) => {
        return await fetch(`http://localhost:8080/api/listings/${listingId}`)
            .then(response => response.json())
    }



 export default {
     getAllListings,
     getListingDetails,
     getStoredListings,
     getStoredListingById
 }


     //  await fetch("https://realtor.p.rapidapi.com/properties/list-for-rent?radius=10&sort=relevance&state_code=NY&limit=200&city=New York City&offset=0", {
    //      "method": "GET",
    //      "headers": {
    //          "x-rapidapi-host": "realtor.p.rapidapi.com",
    //          "x-rapidapi-key": "99d22da811msh236db1e628775c8p1286c2jsneeac5b338c9d"
    //      }
    //  })
    //      .then(response => response.json())
    //      .then(actualResponse => actualResponse["listings"])
    //      .catch(err => {
    //          console.log(err);
    //      });
    //?radius=10&sort=relevance&state_code=NY&limit=200&city=New York City&offset=0"