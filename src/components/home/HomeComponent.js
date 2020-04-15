import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as router, route} from "react-router-dom";
import "./HomeComponent.css"
import UserService from "../../services/UserService";

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: 'Ben',
        profile: {}
    }

    componentDidMount() {
        UserService.getProfile().then(actualResponse => {
            this.setState({profile: actualResponse})
            console.log("here in component did mount.")
            console.log(actualResponse)
        })
    }

    // {this.state.username && <h1>Welcome {this.state.username}</h1>}
    // {!this.state.username && <h1>Welcome To RentMatch.com</h1>}

    render() {
        return (
            <div class="container">
                <div class="logo-box">
                    <img src={require('./logo.png')} className="logo" alt="img"/>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div className="jumbotron">
                            <h1 className="display-4">Welcome {this.state.username}</h1>
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
                            {}
                            <a href="/login">
                                <button className="btn btn-primary btn-lg" href="#"
                                        role="button">Login
                                </button>
                            </a>
                            <span class="col-3"/>
                            <a href="/register">
                                <button className="btn btn-secondary btn-lg" href="#"
                                        role="button">Register
                                </button>
                            </a>
                            <a href="/search">
                                <span className="col-3"/>
                                <button href="/search" className="btn btn-success btn-lg" href="#"
                                        role="button">Go to search
                                </button>
                            </a>
                            <span className="col-3"/>
                            <a href="/profile">
                                <button className="btn btn-dark btn-lg" href="#"
                                        role="button">Go to profile
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeComponent
