import React from "react";
import {connect} from "react-redux";
import SearchService, {getListingDetails} from "../../services/SearchService";
import UserService from "../../services/UserService";
import ListingService from "../../services/ListingService";
import LoginService from "../../services/LoginService";
import "./ListingDetailComponent.css"
import HomeService from "../../services/HomeService";

class SuggestedListingDetailComponent extends React.Component {
    componentDidMount() {

        let details = SearchService.getListingDetails(this.props.listingId, this.props.propStatus, this.props.propertyId)

        details.then(response => this.setState({
            listing: response.listing,
        })).then(r=>console.log(this.state.listing))

        this.getUserProfile()


    }

    state = {
        profile: {},
        listings: [],
        listing: {},
        listingInfo:{}
    }

    getUserProfile = () => {
        UserService.getProfile().then(actualResponse => {
            this.setState({profile: actualResponse})
            console.log(actualResponse)
            console.log(this.state.profile)
        })
    }

    logout = () => {
        LoginService.logout()
            .then(this.setState({
                profile: {}
            }))
    }

    userLikeListing = (listingId) => {

        // Create a cleaner version of listing to send to save in database
        const listingSendObject =
            (({ property_id, listing_id, prop_status, address, price_raw, beds, baths }) =>
                ({ property_id, listing_id, prop_status, address, price_raw, beds, baths }))(this.state.listing);

        listingSendObject['address'] =  this.state.listing.address.line + ' ' +
                                        this.state.listing.address.city + ' ' +
                                        this.state.listing.address.state_code + ' ' +
                                        this.state.listing.address.postal_code

        listingSendObject['city'] = '' + this.state.listing.address.city
        listingSendObject['state'] = '' + this.state.listing.address.state_code
        listingSendObject['beds'] = this.state.listing.beds
        listingSendObject['price_raw'] = this.state.listing.price
        listingSendObject['zipCode'] = this.state.listing.address.postal_code
        listingSendObject['photo'] = this.state.listing.photo.href


        // listingSendObject['aa']


        console.log("sending: ")
        console.log(listingSendObject)
        listingSendObject.listing_id = parseInt(listingSendObject.listing_id)

        ListingService.saveListing(listingSendObject)
            .then(response => {
                console.log(response)
                return UserService.likeListing(listingSendObject.listing_id)
            }).then(response => console.log(response))
    }

    render() {
        return (
            <div className="container-fluid">
                <a href="/">Home</a>
                <div class="jumbotron jumbotron-fluid header-jumbotron">
                    {
                        this.state.profile.userId &&
                        <button onClick={() => this.logout()}
                                className="btn btn-danger btn-md logout-button"
                                href="#"
                                role="button">Log out
                        </button>
                    }
                    <div class="container">
                        <h1 class="display-4"><h1>Listing details</h1></h1>
                        <p class="lead">See out more of this listing.</p>
                        {/*{<img*/}
                        {/*    src={this.state.listing.photo.href}*/}
                        {/*    alt="Property image"*/}
                        {/*/>}*/}
                    </div>
                </div>


                {
                    this.state.listing.address != null &&
                    <div className="row">


                        <div className="col-sm-6">
                            <div class="jumbotron bg-dark text-white">
                                <div class="container">
                                    <h1 class="display-4"><h1>Price: ${this.state.listing.price}/mo</h1></h1>
                                    {/*<p class="lead">{this.state.listing.address}</p>*/}
                                    <button onClick={() => this.userLikeListing(this.state.listing.listing_id)} class="btn btn-warning">Like this listing</button>
                                    { this.state.userLikesThisListing === true &&
                                    <button className="btn btn-warning">You Like This Listing!</button>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="row">
                                <iframe
                                    width="600"
                                    height="450"
                                    frameborder="0" style={{border:0}}
                                    src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyC75gsTAWrMRR9ErLo2jwakIk-uHMu9378&location=${this.state.listing.address.lat},${this.state.listing.address.long}`} allowfullscreen>
                                </iframe>
                                    <iframe
                                width="600"
                                height="450"
                                frameborder="0" style={{border:0}}
                                src={`https://maps.google.com/?q=${this.state.listing.address.lat},${this.state.listing.address.long}&output=svembed`} allowfullscreen>
                            </iframe>
                                <img
                                    src={this.state.listing.photo.href}
                                    alt="Property image"
                                />
                            </div>
                            <div className="row">
                                {this.state.listing.photos.map(photo => (
                                    <img src={photo.href}/>
                                ))}
                            </div>

                        </div>
                    </div>
                }
            </div>
        )
    }

}

const stateToPropertyMapper = (state) => {
    return {
        listings: state.listings.listings
    }
}

export default connect(stateToPropertyMapper)(SuggestedListingDetailComponent)
