import React, { Fragment } from "react";
import UserService from "../../services/UserService";
import ListingService from "../../services/ListingService";

class EditListingComponent extends React.Component {

    state = {
        // newListing: {
        //     city: "",
        //     price_raw: 0,
        //     address: "",
        //     beds:"",
        //     baths:"",
        //     prop_status: "for_rent",
        //     zipCode:""
        // },
        // oldListing: {
        //     city: "",
        //     price_raw: 0,
        //     address: "",
        //     beds:"",
        //     baths:"",
        //     prop_status: "for_rent",
        //     zipCode:""
        // },
        listing: {},
        searchState: "AL",
        passwordMatch: false,
        profile:{},
    }

    componentDidMount() {
        this.getUserProfile()
        this.getListingDetails(this.props.listingId)
    }


    setSearchState = (e) => {
        let newState = e.target.value;
        this.setState( prevState => ({
                newListing: {
                    ...prevState.newListing,
                    state: newState             },
                searchState: newState
            })
        )}

    saveListing = (listing, listingId) => {
        console.log(ListingService.landlordEditListing(listing, listingId))
        this.props.history.push(`/search/${this.state.listing.city}/${this.state.listing.state}/${listingId}/for_rent/${this.state.listing.property_id}`)

        // console.log(this.state.listing)
    }

    getUserProfile = () => {
        UserService.getProfile().then(actualResponse => {
            this.setState({profile: actualResponse})
        })
    }

    setSearchState = (e) => {
        let newState = e.target.value;
        this.setState( prevState => ({
                listing: {...this.state.listing, state: newState}
            })
        )}


        getListingDetails = (listingId) => {
            ListingService.getListingDetails(listingId)
                .then(listing => this.setState({
                    listing: listing,
                    searchState: listing.state
                }))
        }

    render() {
        return (
            <div className="jumbotron">
                {
                    this.state.profile.userId == null &&
                    <h4>You are not logged in. <a href="/login">Go to login</a> to create a listing.</h4>
                }

                {
                    this.state.profile.userId &&
                    <Fragment>
                        <a href="/">Home</a>
                        <h1 className="display-4">Edit Your listing.</h1>
                        <p className="lead">Enter the city, state, address, beds, and baths.</p>
                        <p className="lead">
                            <form>
                                <div className="form-group">
                                    <label for="firstNameInput">City</label>
                                    <input type="text" id="firstNameInput"
                                           defaultValue={this.state.listing.city}
                                           onChange={(e) => this.setState({   listing: {...this.state.listing,   city: e.target.value }})}
                                           class="form-control" placeholder="City"/>
                                </div>

                                <div className="form-group">
                                    <label For="stateInput">State</label>
                                    <select id="stateInput" className="form-control"
                                            value={this.state.listing.state}
                                            onChange={(e) => this.setSearchState(e)}>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priceInput">Price per month</label>
                                    <input id="priceInput"
                                           className="form-control"
                                           type="number"
                                           min="1"
                                           defaultValue={this.state.listing.price_raw}
                                           onChange={(e) => this.setState({   listing: {...this.state.listing,   price_raw: e.target.value }})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="phoneInput">Address</label>
                                    <input type="phone" class="form-control"
                                           defaultValue={this.state.listing.address}
                                           onChange={(e) => this.setState({   listing: {...this.state.listing,   address: e.target.value }})}
                                           id="phoneInput" placeholder="Enter the address"/>
                                </div>

                                <div className="form-group">
                                    <label for="zipcodeInput">Zip code</label>
                                    <input type="text" class="form-control"
                                           defaultValue={this.state.listing.zipCode}
                                           onChange={(e) => this.setState({   listing: {...this.state.listing,   zipCode: e.target.value }})}
                                           id="zipcodeInput" placeholder="Enter the zip code"/>
                                </div>

                                <div className="form-group">
                                    <label for="usernameInput">Beds</label>
                                    <input type="text" class="form-control"
                                           defaultValue={this.state.listing.beds}
                                           onChange={(e) => this.setState({   listing: {...this.state.listing,   beds: e.target.value }})}
                                           id="usernameInput" placeholder="Enter the number of beds"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="usernameInput">Baths</label>
                                    <input type="text" className="form-control"
                                           defaultValue={this.state.listing.baths}
                                           onChange={(e) => this.setState({   listing: {...this.state.listing,   baths: e.target.value }})}
                                           id="usernameInput" placeholder="Enter the number of baths"/>
                                </div>
                            </form>
                        </p>
                        <button onClick={() => this.saveListing(this.state.listing, this.props.listingId)} type="button" class="btn btn-success">Update Listing</button>
                    </Fragment>
                }
            </div>
        )
    }
}

export default EditListingComponent



