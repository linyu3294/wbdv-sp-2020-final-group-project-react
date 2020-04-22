import React from "react";
import "./HomeComponent.css"
import UserService from "../../services/UserService";
import LoginService from "../../services/LoginService";
import HomeService from "../../services/HomeService";
import ListingService from "../../services/ListingService";
import { Slide } from 'react-slideshow-image';


class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listings: {},
            profile: {},
            likedListings: {},
            fetchedSimilarListings: false,
            usersWhoLikedAListingState: []
        }
    }

    componentDidMount() {
        this.getUserProfile()
    }

    getRandomArbitrary = (numOfLikedListings) => {
            return Math.floor(Math.random() * Math.floor(numOfLikedListings));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.state.fetchedSimilarListings === false
            && this.state.profile.username != null
            && this.state.profile.likedListings.length != 0) {
            // console.log(this.state.profile)
            // console.log(this.state.profile.likedListings)
            // console.log(this.state.profile.likedListings[0].listing_id)

            const index = this.getRandomArbitrary(this.state.profile.likedListings.length)
            this.findSimiliarListings(this.state.profile.likedListings[index].zipCode,
                this.state.profile.likedListings[index].listing_id)
            this.state.fetchedSimilarListings = true;
        }
    }
    //this.state.profile.likedListings.zipCode

    findSimiliarListings =  (zipCode, listingId) => {
          HomeService.findSimilarListings(zipCode, listingId)
              .then(foundListings => this.setState(
                  {listings: foundListings}
                  ))
    }

    getUserProfile = () => {
        UserService.getProfile().then(actualResponse => {
            this.setState({profile: actualResponse})
        })
    }


    logout = () => {
        LoginService.logout()
        .then(this.setState({
            profile: {}
        }))
    }


    recommendListings = () => {
        return (
            //http://localhost:3000/mobile/AL/2915148844/for_rent/8866996974
             <div>
                 {this.state.fetchedSimilarListings &&
                 console.log(this.state.listings)}

                {this.state.fetchedSimilarListings &&
                this.state.listings.properties.map(eachListing =>
                    <div key={eachListing.listing_id}>
                        <a href={`http://localhost:3000/${eachListing.city.toLowerCase()}/${eachListing.state_code}/${eachListing.listing_id}/${eachListing.prop_status}/${eachListing.property_id}/suggested`
                        }> {eachListing.address}</a>
                    </div>
                )}
            </div>
        )
    }

    slideShowProps = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: false,
        pauseOnHover: true,
        // onChange: (oldIndex, newIndex) => {
        //     console.log(`slide transition from ${oldIndex} to ${newIndex}`);
        // }
    }


    slideshow = () => {
        return (
            <div className="slide-container">
                <Slide {...this.slideShowProps}>
                    <div className="each-slide">
                        <img className = 'home-image' src={require('./home1.jpg')}/>

                    </div>
                    <div className="each-slide">
                        <img className = 'home-image' src={require('./home2.jpg')}/>

                    </div>
                    <div className="each-slide">
                        <img className = 'home-image' src={require('./home3.jpeg')}/>

                    </div>
                </Slide>
            </div>

        )
    }

    recommendListings = () => {
        return (
            //http://localhost:3000/mobile/AL/2915148844/for_rent/8866996974
             <div>
                 {this.state.fetchedSimilarListings && this.state.listings.properties !== null &&
                 console.log(this.state.listings)}

                {this.state.fetchedSimilarListings && this.state.listings.properties  &&
                <div className="slide-container">
                    <Slide {...this.slideShowProps}>
                            {this.state.listings.properties.map
                                    (eachListing =>
                                    <div className="each-slide">
                                        <a href={`http://localhost:3000/${eachListing.city.toLowerCase()}/${eachListing.state_code}/${eachListing.listing_id}/${eachListing.prop_status}/${eachListing.property_id}/suggested`}>
                                            {eachListing.address} {eachListing.city} {eachListing.state_code} -- ${eachListing.price}/mo
                                            <img className = 'home-image' src={eachListing.photo_url}
                                        />
                                        </a>
                                    </div>
                                    )}
                            </Slide>
                    </div>
                }
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="logo-box">
                    <img src={require('./logo.png')} className="logo" alt="img"/>
                    {/*{*/}
                    {/*    this.state.profile.userId && */}
                    {/*    <button onClick={() => this.logout()} */}
                    {/*        className="btn btn-danger btn-md logout-button" */}
                    {/*        href="#"*/}
                    {/*        role="button">Log out*/}
                    {/*    </button>*/}
                    {/*}*/}
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="jumbotron">
                            {
                                this.state.profile.username != null &&
                                <h1 className="display-4">
                                    Welcome, {this.state.profile.firstName} {this.state.profile.lastName}</h1>
                            }
                            {
                                this.state.profile.username == null &&
                                <h1 className="display-4">Welcome, Guest</h1>
                            }


                            {this.state.profile.username == null  &&
                            <p className="lead">Connect with Local Landlords to Find your Perfect Home!</p>}

                            {this.state.profile.username != null  && this.state.profile.likedListings.length == 0 &&
                            <p className="lead">You Currently have no liked listings. Start your next search! </p>}

                            {this.state.profile.username != null  && this.state.profile.userType == "RENTER" && this.state.profile.likedListings.length > 0 &&
                            <p className="lead">Here are some suggested listings based on what you've liked!</p>}

                            {this.state.profile.username != null  && this.state.profile.userType == "LANDLORD" && this.state.profile.likedListings.length > 0 &&
                            <p className="lead">Here are some suggested listings based on what you've liked!</p>}
                            {this.state.profile.username == null   && this.slideshow()}
                            {
                            this.state.profile.username != null 
                                && this.state.profile.userType == "RENTER"  
                                && this.recommendListings()
                            }
                            {
                            this.state.profile.username != null 
                                && this.state.profile.userType == "LANDLORD"  
                                && this.recommendListings()
                            }
                            <hr className="my-4"/>
                            <p>A large subset of the housing population is renters and landlords.
                                Currently, there is no platform that connects potential renters to
                                landlords and vice versa based on their shared values, living
                                preferences, and character qualities. RentMatch creates a platform
                                for renters to search for housing and for landlords based on their
                                profile, their ratings, and any other
                                number of variables that are important to that individual (shared
                                values). Similarly, this platform allows landlords to search for
                                potential renters as well as get an idea of what the renting climate
                                is like in their location based on other listings.</p>
                            {
                            this.state.profile.username == null &&
                            <div className="row">
                            <a className="col-sm-2" href="/login">
                                <button className="btn btn-primary btn-md" href="#"
                                        role="button">Login
                                </button>
                            </a>
                            <a className="col-sm-2" href="/register">
                                <button className="btn btn-secondary btn-md" href="#"
                                        role="button">Register
                                </button>
                            </a>
                            <a className="col-sm-2" href="/search">
                                <button href="/search" className="btn btn-success btn-md" href="#"
                                        role="button">Go to search
                                </button>
                            </a>
                            <a className="col-sm-2" href="/profile">
                                <button className="btn btn-dark btn-md" href="#"
                                        role="button">Go to profile
                                </button>
                            </a>
                            <a className="col-sm-2" href="/privacy">
                                <button className="btn btn-warning btn-md" href="#"
                                        role="button">Privacy statement
                                </button>
                            </a>
                            </div>
                            }

                            {
                                this.state.profile.username != null &&


                                <div className="row">
                                <a className="col-sm-3" href="/">
                                    <button onClick={() => this.logout()}
                                        className="btn btn-danger btn-md logout-btn"
                                        role="button">Log out
                                    </button>
                               </a>

                                <a className="col-sm-3" href="/search">
                                    <button href="/search" className="btn btn-success btn-md" href="#"
                                            role="button">Go to search
                                    </button>
                                </a>
                                <a className="col-sm-3" href="/profile">
                                    <button className="btn btn-dark btn-md" href="#"
                                            role="button">Go to profile
                                    </button>
                                </a>
                                <a className="col-sm-3" href="/privacy">
                                    <button className="btn btn-warning btn-md" href="#"
                                            role="button">Privacy statement
                                    </button>
                                </a>
                                </div>
                            }
                            

                        </div>
                    </div>

                </div>



            </div>
        )
    }
}

export default HomeComponent
