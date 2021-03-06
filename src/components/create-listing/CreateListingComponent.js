import React, { Fragment } from "react";
import UserService from "../../services/UserService";
import ListingService from "../../services/ListingService";

class CreateListingComponent extends React.Component {

    state = {
        newListing: {
            city: "",
            price_raw: 0,
            address: "",
            beds:"",
            baths:"",
            prop_status: "for_rent",
            zipCode:""
        },
        searchState: "AL",
        passwordMatch: false,
        profile:{},
    }

    componentDidMount() {
        this.getUserProfile()
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

    createListing = (listing) => {
        // this.setState(prevsState => ({
        //     newListing: {...prevsState.newListing, state: this.state.searchState}
        // }))
        ListingService.landlordCreateListing(listing).then(response => {
            this.props.history.push(`/search/${this.state.newListing.city}/${this.state.searchState}/${response.listing_id}/for_rent/${response.property_id}`)
        });        
    }

    getUserProfile = () => {
        UserService.getProfile().then(actualResponse => {
            this.setState({profile: actualResponse})
        })
    }

    setSearchState = (e) => {
        let newState = e.target.value;
        this.setState( prevState => ({

            newListing: {
                ...prevState.newListing,
                state: newState
            },

            searchState: newState
            })
        )}

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
                <h1 className="display-4">Create a new listing.</h1>
                <p className="lead">Enter the city, state, address, beds, and baths.</p>
                <p className="lead">
                    <form>
                        <div className="form-group">
                                <label htmlFor="firstNameInput">City</label>
                                <input type="text" id="firstNameInput"
                                       onChange={(e) => this.state.newListing.city = e.target.value}
                                       className="form-control" placeholder="City"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="stateInput">State</label>
                            <select id="stateInput" className="form-control" value={this.state.searchState} onChange={(e) => this.setSearchState(e)}>
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
                                   onChange={(e) => this.state.newListing.price_raw = e.target.value}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneInput">Address</label>
                            <input type="phone" className="form-control"
                                   onChange={(e) => this.state.newListing.address = e.target.value}
                                   id="phoneInput" placeholder="Enter the address"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="zipcodeInput">Zip code</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => this.state.newListing.zipCode = e.target.value}
                                   id="zipcodeInput" placeholder="Enter the zip code"/>
                        </div>

                        <div className="form-group">
                            <label for="usernameInput">Beds</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => this.state.newListing.beds = e.target.value}
                                   id="usernameInput" placeholder="Enter the number of beds"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="usernameInput">Baths</label>
                            <input type="text" className="form-control"
                                   onChange={(e) => this.state.newListing.baths = e.target.value}
                                   id="usernameInput" placeholder="Enter the number of baths"/>
                        </div>
                    </form>
                </p>
                <button onClick={() => this.createListing(this.state.newListing, this.state.profile.userId)} type="button" class="btn btn-success">Create Listing</button>
                </Fragment>
                }
                </div>
        )
    }
}

export default CreateListingComponent



