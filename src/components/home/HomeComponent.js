import React from "react";
import "./HomeComponent.css"
import UserService from "../../services/UserService";
import LoginService from "../../services/LoginService";
import HomeService from "../../services/HomeService";
import { Slide } from 'react-slideshow-image';

import { Fade } from 'react-slideshow-image';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            similarListings: [],
            profile: {}
        }
    }

    findSimiliarListings = (zipCode, listingId) => {
        HomeService.findSimilarListings(zipCode, listingId).then(foundListings => {
            this.setState({similarListings: foundListings})
        })
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


    slideShowProps = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: false,
        pauseOnHover: true,
        onChange: (oldIndex, newIndex) => {
            console.log(`slide transition from ${oldIndex} to ${newIndex}`);
        }
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

    componentDidMount() {
        this.getUserProfile()
        this.findSimiliarListings('02111', '2912313023')
    }

    render() {
        console.log(this.state.profile)
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


                            {!this.state.profile.userId &&
                            <p className="lead">Connect with Local Landlords to Find your Perfect Home</p>}

                            {this.state.profile.userId &&
                            <p className="lead">Navigate to Profile Page to View your Liked Listings </p>}

                            {this.slideshow()}




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
                            {
                                this.state.profile.username != null && this.state.profile.userType === "LANDLORD" &&
                                <a className="col-sm-4" href="/createlisting">
                                    <button className="btn btn-success btn-md" href="#"
                                            role="button">Create New Listing
                                    </button>
                                </a>
                            }

                        </div>
                    </div>

                </div>



            </div>
        )
    }
}

export default HomeComponent
