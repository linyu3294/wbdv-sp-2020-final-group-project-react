import React from "react";
import {connect} from "react-redux";
import SearchService, {getListingDetails} from "../../services/SearchService";
import UserService from "../../services/UserService";
import ListingService from "../../services/ListingService";
import LoginService from "../../services/LoginService";
import "./ListingDetailComponent.css"

class ListingDetailComponent extends React.Component {

    componentDidMount() {
        SearchService.getAllListings(this.props.city, this.props.state)
                .then(actualListings => this.setState({
                    listings: actualListings
                })).then(response => {
                    console.log("in this.state.listings")
                    console.log(this.state.listings)
                    let pageListing = this.state.listings.filter(listing =>
                        listing.listing_id === this.props.listingId)
                        console.log(pageListing)
                        console.log(pageListing[0])
                    this.setState({
                        listing: pageListing[0]
                    })
 
                }
                )
        

        let details = SearchService.getListingDetails(this.props.listingId, this.props.propStatus, this.props.propertyId)
        
        details.then(response => this.setState({
            listingInfo: response,
        }))

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
                        {/* <img 
                            src={this.state.listingInfo.listing.photo.href}
                            alt="Property image"
                        /> */}
                    </div>
                </div>

                
                {
                    this.state.listingInfo.listing &&
                    <div className="row">


                        <div className="col-sm-6">
                            <div class="jumbotron bg-dark text-white">
                                <div class="container">
                                    <h1 class="display-4"><h1>Price: ${this.state.listingInfo.listing.price}/mo</h1></h1>
                                    <p class="lead">{this.state.listing.address}</p>
                                    <button onClick={() => this.userLikeListing(this.props.listingId)} class="btn btn-warning">Like this listing</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            
                            <div className="row">
                                	<iframe
                                        width="600"
                                        height="450"
                                        frameborder="0" style={{border:0}}
                                        src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyC75gsTAWrMRR9ErLo2jwakIk-uHMu9378&location=${this.state.listing.lat},${this.state.listing.lon}`} allowfullscreen>
                                    </iframe>
                                	<iframe
                                        width="600"
                                        height="450"
                                        frameborder="0" style={{border:0}}
                                        src={`https://maps.google.com/?q=${this.state.listing.lat},${this.state.listing.lon}&output=svembed`} allowfullscreen>
                                    </iframe>
                                <img 
                                src={this.state.listingInfo.listing.photo.href}
                                alt="Property image"
                                />
                            </div>
                            <div className="row">
                                {this.state.listingInfo.listing.photos.map(photo => (
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

export default connect(stateToPropertyMapper)(ListingDetailComponent)
