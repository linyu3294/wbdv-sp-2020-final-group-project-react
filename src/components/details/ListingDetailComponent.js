import React from "react";
import {connect} from "react-redux";
import SearchService, {getListingDetails} from "../../services/SearchService";
import UserService from "../../services/UserService";
import ListingService from "../../services/ListingService";
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

    }

    state = {
        listings: [],
        listing: {},
        listingInfo:{}
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

                <div class="jumbotron jumbotron-fluid header-jumbotron">
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