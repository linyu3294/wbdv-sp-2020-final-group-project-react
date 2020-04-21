import React from "react";
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

                    ListingService.findInterestedUsers(this.state.listing.listing_id)
                    .then(actualUsers => {
                        this.setState({
                            interestedUsers: actualUsers
                        })
                        console.log("interested USERSSSSS")
                        console.log(this.state.interestedUsers)
                    })

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
        suggestedListing: {},
        listing: {},
        listingInfo:{},
        landLords:[],
        landLord:{},
        // randoUser: {},
        // randoUserPic: ''
        userLikesThisListing: false,
        interestedUsers: [],
        storedUser:{}
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

        // const listingSendObject = 
        // (({ property_id, listing_id, prop_status, address, price_raw, beds, baths, photo }) => 
        // ({ property_id, listing_id, prop_status, address, price_raw, beds, baths, photo }))(this.state.listing);
        // listingSendObject['city'] = this.props.city
        // listingSendObject['state'] = this.props.state
        // const address = this.state.listing.address
        // listingSendObject['zipCode'] = address.slice(address.length-5,address.length)

        // console.log("sending: ")
        // console.log(listingSendObject)
        // ListingService.saveListing(listingSendObject)

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
                <img src={require('./logo.png')} className="logo" alt="img" width="50" height="50"/>
                <a href="/">Back to home</a>
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
                                {this.state.randoUser &&
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <img src={this.state.randoUserPic}/>
                                            <h5>Landlord</h5>
                                        </div>
                                        <div className="col-sm-9">
                                            <h3>
                                                {this.state.randoUser.name.title + " "}
                                                {this.state.randoUser.name.first + " "}
                                                {this.state.randoUser.name.last}
                                            </h3>
                                            <h4>
                                                Email: {this.state.randoUser.email}
                                            </h4>
                                            <h4>
                                                Cell: {this.state.randoUser.cell}
                                            </h4>
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
                                <h1 className="display-9">No users have liked this listing yet.</h1>
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
