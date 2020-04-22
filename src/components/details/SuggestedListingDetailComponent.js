import React, {Fragment} from "react";
import {connect} from "react-redux";
import SearchService, {getListingDetails} from "../../services/SearchService";
import UserService from "../../services/UserService";
import ListingService from "../../services/ListingService";
import LoginService from "../../services/LoginService";
import "./ListingDetailComponent.css"
import HomeService from "../../services/HomeService";
import {Link} from "react-router-dom";

class SuggestedListingDetailComponent extends React.Component {
    componentDidMount() {
           SearchService.getListingDetails(this.props.listingId, this.props.propStatus, this.props.propertyId)
            .then(response => {
                console.log(response)
                this.setState({
                listing: response.listing,
                })

                this.getUserProfile()
                // this.checkIfUserLikedListing()

                const listingSendObject =
                    (({ property_id, listing_id, prop_status, address, price_raw, beds, baths, photo }) =>
                        ({ property_id, listing_id, prop_status, address, price_raw, beds, baths, photo }))(this.state.listing);

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







    }

    state = {
        profile: {},
        listings: [],
        listing: {},


        suggestedListing: {},
        landLords:[],
        landLord:{},
        userLikesThisListing: false,
        interestedUsers: [],
        userCreatedListing: false,
    }

    getUserProfile = () => {
        UserService.getProfile().then(actualResponse => {
            console.log(actualResponse)
            this.setState({profile: actualResponse})

        })
    }
    // checkIfUserLikedListing() {
    //     this.state.profile.likedListings.forEach((element, index, array) => {
    //         if ((element.listing_id + "") === this.state.listing.listing_id) {
    //             this.setState({
    //                 userLikesThisListing: true
    //             })
    //         }
    //     })
    // }

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
                {/*<Fragment>*/}
                    <img src={require('./logo.png')} className="logo" alt="img" width="50" height="50"/>
                    <span>
                    <a href="/search">Back to search</a></span>
                    <div className="jumbotron jumbotron-fluid header-jumbotron">
                        <div className="row">
                            <div className="col-sm-6 details-col">
                                <br/>
                                <h1 className="display-4"><h1>Listing details</h1></h1>
                                <p className="lead">Find out more about this listing.</p>
                                {
                                    this.state.listing &&
                                    <div className="jumbotron bg-dark text-white details-jumbotron">
                                        {/*<div className="row top-row">*/}
                                        {/*    */}
                                        {/*    */}
                                        {/*    /!*<h1 className="display-4"><h1>Price: ${this.state.listing.price}/mo</h1></h1>*!/*/}
                                        {/*    /!*<p className="lead">{this.state.listing.address}</p>*!/*/}
                                        {/*    */}
                                        {/*    { this.state.userLikesThisListing === false && this.state.profile.userId != null*/}
                                        {/*    &&*/}
                                        {/*    <button onClick={() => this.userLikeListing(this.props.listingId)}*/}
                                        {/*            className="btn btn-warning like-button">Like this listing</button>*/}
                                        {/*    }*/}
                                        {/*    { this.state.userLikesThisListing === true &&*/}
                                        {/*    <button className="btn btn-warning">You Like This Listing!</button>*/}
                                        {/*    }*/}
                                        {/*    {this.state.landLord &&*/}
                                        {/*    <div className="row">*/}
                                        {/*        <div className="col-sm-6 landlord-photo-row">*/}
                                        {/*            <img src={require('./profileimage.jpg')}/>*/}
                                        {/*            <h5>Landlord</h5>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col-sm-6">*/}
                                        {/*            <h3>*/}
                                        {/*                {this.state.landLord.firstName + " "}*/}
                                        {/*                {this.state.landLord.lastName}*/}
                                        {/*            </h3>*/}
                                        {/*            <h4>*/}
                                        {/*                Email: {this.state.landLord.email}*/}
                                        {/*            </h4>*/}
                                        {/*            <h4>*/}
                                        {/*                Cell: {this.state.landLord.phone}*/}
                                        {/*            </h4>*/}
                                        {/*            <button>*/}
                                        {/*                <Link to={`/profile/${this.state.landLord.userId}`}><h5>View Profile</h5></Link>*/}
                                        {/*            </button>*/}
                                        {/*        </div>*/}

                                        {/*    </div>*/}
                                        {/*    }*/}
                                        {/*</div>*/}
                                        <div className="row top-row">
                                            {/*<h1 className="display-4">Price: ${this.state.listing.price}/mo</h1>*/}
                                            {/*<p className="lead">{this.state.listing.address.city}</p>*/}

                                            <h3>Price: $750/mo</h3>
                                            <h4>Address: ---------</h4>

                                            {this.state.profile.userId != null
                                            &&
                                            <button onClick={() => this.userLikeListing(this.props.listingId)}
                                                    className="btn btn-warning like-button">Like this listing</button>
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
                            {this.state.listing.address &&
                            <div className="col-sm-6 google-image-col">

                                    <iframe
                                        width="600"
                                        height="450"
                                        frameBorder="0" style={{border: 0}}
                                        src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyC75gsTAWrMRR9ErLo2jwakIk-uHMu9378&location=${this.state.listing.address.lat},${this.state.listing.address.long}`}
                                        allowFullScreen>
                                    </iframe>

                            </div>
                                }



                        </div>

                        {/*{ this.state.listing.photos &&*/}
                        {/*<div className="row photos-row">*/}

                        {/*    this.state.listing.photos.map(photo => (*/}
                        {/*        <img src={photo.href}/>*/}
                        {/*    ))*/}

                        {/*</div>*/}
                        {/*}*/}

                    </div>




                    {
                        this.state.listing &&
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
                                    {/*{this.state.listing.address &&*/}
                                    {/*    < iframe*/}
                                    {/*    width="600"*/}
                                    {/*    height="450"*/}
                                    {/*    frameBorder="0" style={{border:0}}*/}
                                    {/*    src={`https://maps.google.com/?q=${this.state.listing.address.lat},${this.state.listing.address.long}&output=svembed`} allowFullScreen>*/}
                                    {/*    </iframe>*/}
                                    {/*}*/}
                                    {this.state.listing.photo &&
                                    <img
                                        src={this.state.listing.photo.href}
                                        alt="Property image"
                                    />
                                    }
                                </div>


                            </div>
                        </div>
                    }
                {/*</Fragment>*/}
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
