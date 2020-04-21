import React, { Fragment } from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import SearchService, {getListingDetails} from "../../services/SearchService";
import UserService from "../../services/UserService";
import ListingService from "../../services/ListingService";
import LoginService from "../../services/LoginService";
import "./ListingDetailComponent.css"
import HomeService from "../../services/HomeService";

class ListingDetailComponent extends React.Component {

    componentDidMount() {

        // If this is a listing that we created as a landlord
        if (this.props.listingId.indexOf("T") > -1 ) {
            this.setState({
                userCreatedListing: true
            })

            SearchService.getStoredListingById(this.props.listingId)
            .then(response => {
                let googleString = this.createGoogleString(response)
                this.setState({
                    listing: response,
                    googleSearchListingString: googleString
                })
                this.getUserProfile()
                ListingService.findLandlordForListing(this.state.listing.listing_id)
                .then(actualLandlord => {
                    this.setState({
                        landLord: actualLandlord
                    })
                    console.log(this.state.landLord)
                    console.log(this.state.listing)
                })
                console.log(this.state.listing)

                fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.googleSearchListingString}&key=AIzaSyC75gsTAWrMRR9ErLo2jwakIk-uHMu9378`)
                .then(response => response.json()).then(result => 
                    this.setState({
                        googleLat: result.results[0].geometry.location.lat,
                        googleLon: result.results[0].geometry.location.lng
                    }))

                ListingService.findInterestedUsers(this.state.listing.listing_id)
                .then(actualUsers => {
                    this.setState({
                        interestedUsers: actualUsers
                    })
                })
            })
            .then(console.log(this.state.listing.listing_id))

            

        // If this is a listing coming back from our API
        } else {

        SearchService.getAllListings(this.props.city, this.props.state)
                .then(actualListings => this.setState({
                    listings: actualListings
                })).then(response => {
                    let pageListing = this.state.listings.filter(listing =>
                        listing.listing_id === this.props.listingId)
                    this.setState({
                        listing: pageListing[0]
                    })
                    
                    this.getUserProfile()

                    const listingSendObject = 
                    (({ property_id, listing_id, prop_status, address, price_raw, beds, baths, photo }) => 
                    ({ property_id, listing_id, prop_status, address, price_raw, beds, baths, photo }))(this.state.listing);
                    listingSendObject['city'] = this.props.city
                    listingSendObject['state'] = this.props.state
                    const address = this.state.listing.address
                    listingSendObject['zipCode'] = address.slice(address.length-5,address.length)

                    console.log("sending: ")
                    console.log(listingSendObject)
                    ListingService.saveListing(listingSendObject)
                    .then(actualListing => {
                        ListingService.findLandlordForListing(listingSendObject.listing_id)
                        .then(actualLandlord => {
                            this.setState({
                                landLord: actualLandlord
                            })
                            console.log(this.state.landLord)
                            console.log(this.state.listing)
                        })
                    })

                    ListingService.findInterestedUsers(this.state.listing.listing_id)
                    .then(actualUsers => {
                        this.setState({
                            interestedUsers: actualUsers
                        })
                    })
                })

                let details = SearchService.getListingDetails(this.props.listingId, this.props.propStatus, this.props.propertyId)

                details.then(response => this.setState({
                    listingInfo: response,
                }))

        }
    }

    state = {
        profile: {},
        listings: [],
        suggestedListing: {},
        listing: {},
        listingInfo:{},
        landLords:[],
        landLord:{},
        userLikesThisListing: false,
        interestedUsers: [],
        storedUser:{},
        userCreatedListing: false,
        googleSearchListingString: null,
        googleLat: null,
        googleLon: null
    }

    createGoogleString(listing) {
        let searchString = listing.address.split(" ").join("+")
        searchString += "+" + listing.city + "+"
        searchString += listing.state + ""
        console.log(searchString)
        return searchString
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

        UserService.likeListing(listingId)
            .then(response => {
                console.log(response)
            this.setState({
                userLikesThisListing: true
            })})
    }

    render() {
        return (
            <div className="container-fluid">
                {/* User created listing */}
                {
                    this.state.userCreatedListing == true &&
                    <Fragment>
                    <img src={require('./logo.png')} className="logo" alt="img" width="50" height="50"/>
                    <span><a href="/">Back to home</a>
                    <a href="/search">Back to search</a></span>
                    <div className="jumbotron jumbotron-fluid header-jumbotron">
                    <div className="row">
                        <div className="col-sm-6 details-col">
                        
                            <h1 className="display-4">Listing details</h1>
                            <h6 className="lead">Find out more about this listing.</h6>

                            { this.state.listing &&
                            <div className="jumbotron bg-dark text-white details-jumbotron">
                                <div className="row top-row">
                                    <h1 className="display-4"><h1>Price: ${this.state.listing.price_raw}/mo</h1></h1>
                                </div>
                                <div className="row address-row">
                            <p className="lead">{this.state.listing.address}, {this.state.listing.city} {this.state.listing.state}</p>
                                </div>
                                <div className="row beds-baths-row">
                                <p className="lead">Beds: {this.state.listing.beds + " "}</p>
                                <p className="lead">, Baths: {this.state.listing.baths + " "}</p>
                                </div>
                                <div className="row button-row">
                                    { this.state.userLikesThisListing === false && this.state.profile.userId != null &&
                                    <button onClick={() => this.userLikeListing(this.props.listingId)} 
                                        className="btn btn-warning like-button">Like this listing</button>
                                    }
                                    { this.state.userLikesThisListing === true &&
                                        <button className="btn btn-warning">You Like This Listing!</button>
                                    }
                                </div>
                                    {this.state.landLord &&
                                        <div className="row">
                                            <div className="col-sm-6 landlord-photo-row">
                                                <img src={require('./profileimage.jpg')}/>
                                                <h5>Landlord</h5>
                                            </div>
                                            <div className="col-sm-6">
                                                <h3>
                                                    {this.state.landLord.firstName + " "}
                                                    {this.state.landLord.lastName}
                                                </h3>
                                                <h4>
                                                Email: {this.state.landLord.email}
                                                </h4>
                                                <h4>
                                                Cell: {this.state.landLord.phone}
                                                </h4>
                                                <button>
                                                    <Link to={`/profile/${this.state.landLord.userId}`}><h5>View Profile</h5></Link>
                                                </button>
                                            </div>
                                            
                                        </div>
                                    }
                                </div>
                            }
                            
                        </div>

                        { this.state.googleSearchListingString &&
                        <div className="col-sm-6 google-image-col">
                            <iframe
                                width="600"
                                height="450"
                                frameBorder="0" style={{border:0}}
                                src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyC75gsTAWrMRR9ErLo2jwakIk-uHMu9378&q=${this.state.googleSearchListingString}`} allowFullScreen>
                            </iframe>
                        </div>
                        }
                    </div>

                    <div className="row photos-row">
                        <img src={require('./homeforsale.jpg')}/>
                    </div>
                </div>
                
                    <div className="row">

                        <div className="col-sm-4 liked-listing-col">

                        
                            <div className="jumbotron bg-muted user-liked-jumbotron">

                                {
                                    this.state.interestedUsers.length == 0 &&
                                    <h1 className="display-6">No users have liked this listing yet.</h1>
                                }

                                { this.state.interestedUsers.length != 0 &&
                                <h1 className="display-9">Users who liked this listing:</h1>
                                    // <p className="lead">Users who liked this listing:</p>
                                }
                                
                                {
                                    this.state.interestedUsers &&

                                    this.state.interestedUsers.map((user, index) => 
                                    <div key={user.userId} className="card" style={{width: 18+"rem"}}>
                                        <img className="card-img-top" src={require('../../profilepicture.png')} 
                                            alt="Card image cap"/>
                                        <div className="card-body">
                                        <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                                            <p className="card-text">{user.username}</p>
                                            <button>
                                                <Link to={`/profile/${user.userId}`}><h5>View Profile</h5></Link>
                                            </button>
                                        </div>
                                    </div>
                                    )

                                }
                            </div>
                        </div>

                        <div className="col-sm-8">
                            
                        { this.state.googleSearchListingString &&
                        <div className="col-sm-6 google-image-col">
                            <iframe
                                width="600"
                                height="450"
                                frameBorder="0" style={{border:0}}
                                src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyC75gsTAWrMRR9ErLo2jwakIk-uHMu9378&location=${this.state.googleLat},${this.state.googleLon}`} allowFullScreen>
                            </iframe>
                        </div>
                        }
                            
                        </div>
                    </div>
                }

                </Fragment>
                }

                {/* Listing saved from Realtor API */}
                {

                this.state.userCreatedListing == false &&
                <Fragment>
                

                <img src={require('./logo.png')} className="logo" alt="img" width="50" height="50"/>
                <span><a href="/">Back to home</a>
                    <a href="/search">Back to search</a></span>
                <div className="jumbotron jumbotron-fluid header-jumbotron">
                    <div className="row">
                        <div className="col-sm-6 details-col">
                        <br/>
                        <h1 className="display-4"><h1>Listing details</h1></h1>
                        <p className="lead">Find out more about this listing.</p>
                        {
                        this.state.listingInfo.listing &&
                        <div className="jumbotron bg-dark text-white details-jumbotron">
                            <div className="row top-row">
                                <h1 className="display-4"><h1>Price: ${this.state.listingInfo.listing.price}/mo</h1></h1>
                                <p className="lead">{this.state.listing.address}</p>
                                { this.state.userLikesThisListing === false && this.state.profile.userId != null 
                                &&
                                <button onClick={() => this.userLikeListing(this.props.listingId)} 
                                    className="btn btn-warning like-button">Like this listing</button>
                                }
                                { this.state.userLikesThisListing === true &&
                                    <button className="btn btn-warning">You Like This Listing!</button>
                                }
                                    {this.state.landLord &&
                                        <div className="row">
                                            <div className="col-sm-6 landlord-photo-row">
                                                <img src={require('./profileimage.jpg')}/>
                                                <h5>Landlord</h5>
                                            </div>
                                            <div className="col-sm-6">
                                                <h3>
                                                    {this.state.landLord.firstName + " "}
                                                    {this.state.landLord.lastName}
                                                </h3>
                                                <h4>
                                                Email: {this.state.landLord.email}
                                                </h4>
                                                <h4>
                                                Cell: {this.state.landLord.phone}
                                                </h4>
                                                <button>
                                                    <Link to={`/profile/${this.state.landLord.userId}`}><h5>View Profile</h5></Link>
                                                </button>
                                            </div>
                                            
                                        </div>
                                    }
                            </div>
                        </div>
                        }
                        </div>

                        <div className="col-sm-6 google-image-col">
                            <iframe
                                width="600"
                                height="450"
                                frameBorder="0" style={{border:0}}
                                src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyC75gsTAWrMRR9ErLo2jwakIk-uHMu9378&location=${this.state.listing.lat},${this.state.listing.lon}`} allowFullScreen>
                            </iframe>
                        </div>
                        
                        
                    </div>


                    <div className="row photos-row">
                            
                            { this.state.listingInfo.listing &&
                            this.state.listingInfo.listing.photos.map(photo => (
                                    <img src={photo.href}/>
                            ))
                            }
                    </div>
                </div>



                
                {
                    this.state.listingInfo.listing &&
                    <div className="row">

                        <div className="col-sm-6">

                        
                            <div className="jumbotron bg-muted user-liked-jumbotron">

                                {
                                    this.state.interestedUsers.length == 0 &&
                                    <h1 className="display-6">No users have liked this listing yet.</h1>
                                }

                                { this.state.interestedUsers.length != 0 &&
                                <h1 className="display-9">Users who have liked this listing</h1>
                                    // <p className="lead">Users who liked this listing:</p>
                                }
                                
                                {
                                    this.state.interestedUsers &&

                                    this.state.interestedUsers.map((user, index) => 
                                    <div className="card" style={{width: 18+"rem"}}>
                                        <img className="card-img-top" src={require('../../profilepicture.png')} 
                                            alt="Card image cap"/>
                                        <div className="card-body">
                                        <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                                            <p className="card-text">Take a look at their profile!</p>
                                            <button>
                                                <Link to={`/profile/${user.userId}`}><h5>View Profile</h5></Link>
                                            </button>
                                        </div>
                                    </div>
                                    )

                                }
                            </div>
                        </div>

                        <div className="col-sm-6">
                            
                            <div className="row">

                                	<iframe
                                        width="600"
                                        height="450"
                                        frameBorder="0" style={{border:0}}
                                        src={`https://maps.google.com/?q=${this.state.listing.lat},${this.state.listing.lon}&output=svembed`} allowFullScreen>
                                    </iframe>
                                <img 
                                src={this.state.listingInfo.listing.photo.href}
                                alt="Property image"
                                />
                            </div>
                            
                        </div>
                    </div>
                } 
                </Fragment>
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


//  {/* <div className="jumbotron bg-dark text-white">

//                                 <div className="container">
//                                     <h1 className="display-4"><h1>Price: ${this.state.listingInfo.listing.price}/mo</h1></h1>
//                                     <p className="lead">{this.state.listing.address}</p>
//                                     { this.state.userLikesThisListing === false && this.state.profile.userId != null 
//                                     &&
//                                     <button onClick={() => this.userLikeListing(this.props.listingId)} 
//                                         className="btn btn-warning like-button">Like this listing</button>
//                                     }
//                                     { this.state.userLikesThisListing === true &&
//                                         <button className="btn btn-warning">You Like This Listing!</button>
//                                     }
//                                 </div>
//                             </div> */}
