import React from "react";


export const findSimilarListings = async (zipCode, listingId) => {
    return await fetch(`https://realtor.p.rapidapi.com/properties/v2/list-similar-rental-homes?`
                    +`postal_code=${zipCode}&property_id=${listingId}`, {
        method: "GET",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": "99d22da811msh236db1e628775c8p1286c2jsneeac5b338c9d"
        }
    })
        .then(response => response.json())
        // .then(actualResponse => actualResponse["listings"])  //From Josh's code... was causing errors
        .catch(err => {
                console.log(err);
            }
        )
}


export default {
    findSimilarListings
}
