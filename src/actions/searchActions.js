export const FIND_ALL_LISTINGS = "FIND_ALL_LISTINGS"
export const findAllListings = (actualListings) => ({
    type: FIND_ALL_LISTINGS,
    listings: actualListings
})