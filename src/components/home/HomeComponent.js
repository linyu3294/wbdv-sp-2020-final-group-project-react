import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as router, route} from "react-router-dom";
import "./HomeComponent.css"
import UserService from "../../services/UserService";
import LoginService from "../../services/LoginService";

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        profile: {}
    }

    getUserProfile = () => {
        UserService.getProfile().then(actualResponse => {
            this.setState({profile: actualResponse})
        })
    }

    componentDidMount() {
        this.getUserProfile()
    }

    logout = () => {
        LoginService.logout()
        .then(this.setState({
            profile: {}
        }))
    }

    // {this.state.username && <h1>Welcome {this.state.username}</h1>}
    // {!this.state.username && <h1>Welcome To RentMatch.com</h1>}

    render() {
        return (
            <div className="container">
                <div className="logo-box">
                    <img src={require('./logo.png')} className="logo" alt="img"/>
                    {
                        this.state.profile.userId && 
                        <button onClick={() => this.logout()} 
                            className="btn btn-danger btn-md logout-button" 
                            href="#"
                            role="button">Log out
                        </button>
                    }
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="jumbotron">
                            {
                                this.state.profile.username != null && 
                                <h1 className="display-4">Welcome, {this.state.profile.username}!</h1>
                            }
                            {
                                this.state.profile.username == null && 
                                <h1 className="display-4">Welcome, Guest!</h1>
                            }
                            
                            <p className="lead">Find your perfect home with a landlord you like</p>
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
                                <a className="col-sm-4" href="/search">
                                    <button href="/search" className="btn btn-success btn-md" href="#"
                                            role="button">Go to search
                                    </button>
                                </a>
                                <a className="col-sm-4" href="/profile">
                                    <button className="btn btn-dark btn-md" href="#"
                                            role="button">Go to profile
                                    </button>
                                </a>
                                <a className="col-sm-4" href="/privacy">
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
