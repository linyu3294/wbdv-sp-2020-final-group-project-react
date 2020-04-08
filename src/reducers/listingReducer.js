import {FIND_ALL_LISTINGS} from "../actions/searchActions";

const initialState = {
    listings: []
}


const listingReducer = (state = initialState, action) => {

    switch (action.type) {
        case FIND_ALL_LISTINGS:
            return  {
                listings: action.listings
            }
        default:
            return state
    }


}


export default listingReducer