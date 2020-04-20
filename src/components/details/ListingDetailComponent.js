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

                    this.getUserProfile()

                }
                )

    let details = SearchService.getListingDetails(this.props.listingId, this.props.propStatus, this.props.propertyId)
        
        details.then(response => this.setState({
            listingInfo: response,
        }))



        fetch('https://randomuser.me/api/?nat=us')
            .then(response => response.json())
            .then(ru => this.setState({
                randoUser: ru.results[0],
                randoUserPic: ru.results[0].picture.large
            })).then(print => {
                console.log(this.state.randoUser)
                console.log(this.state.randoUserPic)
            })


        SearchService.getStoredListingById(this.props.listingId)
            .then(response => {
                console.log(response)
                this.setState({
                    listing:response
                })
            })

    }

    state = {
        profile: {},
        listings: [],
        listing: {},
        listingInfo:{},
        landLords:[],
        landLord:{},
        // randoUser: {},
        // randoUserPic: ''
        storedUser:{},
        userLikesThisListing: false
    }

    checkIfUserLikedListing() {
        this.state.profile.likedListings.forEach((element, index, array) => {
            if ((element.listing_id + "") === this.state.listing.listing_id) {
                this.setState({
                    userLikesThisListing: true
                })
            }
        })

    }

    getUserProfile = () => {
        UserService.getProfile().then(actualResponse => {
            this.setState({profile: actualResponse})
            this.checkIfUserLikedListing()
        })
    }

    logout = () => {
        LoginService.logout()
        .then(this.setState({
            profile: {}
        }))
    }

    userLikeListing = (listingId) => {

        const listingSendObject = 
        (({ property_id, listing_id, prop_status, address, price_raw, beds, baths, photo }) => 
        ({ property_id, listing_id, prop_status, address, price_raw, beds, baths, photo }))(this.state.listing);
        listingSendObject['city'] = this.props.city
        listingSendObject['state'] = this.props.state
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
                            <div className="jumbotron bg-dark text-white">
                                <div className="container">
                                    <h1 className="display-4"><h1>Price: ${this.state.listingInfo.listing.price}/mo</h1></h1>
                                    <p className="lead">{this.state.listing.address}</p>
                                    { this.state.userLikesThisListing === false &&
                                    <button onClick={() => this.userLikeListing(this.props.listingId)} className="btn btn-warning">Like this listing</button>
                                    }
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

                {this.state.randoUser &&
                <div>
                    <h1>Landlord</h1>
                    <h3>{this.state.randoUser.gender}</h3>
                    <img src={this.state.randoUserPic}/>
                </div>}
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
