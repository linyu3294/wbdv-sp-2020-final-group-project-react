import React from "react";
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
            prop_status: "for_rent"

        },
        searchState: "AL",
        passwordMatch: false,
        profile:{}
    }

    componentDidMount() {
        this.getUserProfile()
    }

    createListing = (listing) => {
        // this.setState(prevsState => ({
        //     newListing: {...prevsState.newListing, state: this.state.searchState}
        // }))
        ListingService.landlordCreateListing(listing);
        alert("saved listing")
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
            <div class="jumbotron">
                <a href="/">Home</a>
                <h1 class="display-4">Create a new listing.</h1>
                <p class="lead">Enter your name, email, phone, and
                    whether you are a renter or a landlord to get going.</p>
                <p class="lead">
                    <form>
                        <div class="form-group">
                                <label for="firstNameInput">City</label>
                                <input type="text" id="firstNameInput"
                                       onChange={(e) => this.state.newListing.city = e.target.value}
                                       class="form-control" placeholder="City"/>
                        </div>

                        <div class="form-group">
                            <label For="stateInput">State</label>
                            <select id="stateInput" className="form-control"
                                    value={this.state.searchState} onChange={(e) => this.setSearchState(e)}>
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
                        <div class="form-group">
                            <label for="phoneInput">Address</label>
                            <input type="phone" class="form-control"
                                   onChange={(e) => this.state.newListing.address = e.target.value}
                                   id="phoneInput" placeholder="Enter the listing address"/>
                        </div>

                        <div class="form-group">
                            <label for="usernameInput">Beds</label>
                            <input type="text" class="form-control"
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
                <button onClick={() => this.createListing(this.state.newListing)} type="button" class="btn btn-success">Create Listing</button>
            </div>
        )
    }
}

export default CreateListingComponent



