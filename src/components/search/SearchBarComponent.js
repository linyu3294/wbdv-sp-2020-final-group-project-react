import React from "react";
import "./SearchBarComponentStyle.css"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import SearchService from "../../services/SearchService";
import {findAllListings} from "../../actions/searchActions";
import ResultsListComponent from "../results/ResultsListComponent";
import LoginComponent from "../login/LoginComponent";
import UserService from '../../services/UserService';
import LoginService from "../../services/LoginService";

class SearchBarComponent extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.listings)
        this.getUserProfile()
    }


    setSearchCity = (e) => {
        let newCity = e.target.value;
        this.setState( prevState => ({
            searchCity: newCity
        })
    )}


    setSearchState = (e) => {
        let newState = e.target.value;
        this.setState( prevState => ({
            searchState: newState
        })
    )}

    handleSearchSubmission = () => {
        this.props.history.push(`/search/${this.state.searchCity}/${this.state.searchState}`)
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

    state = {
        searchCity: "",
        searchState: "AL",
        profile: {}
    }

    render() {
        return (
            <div id="search-component-div">
                <a href="/">Home</a>
                <div>
                    <img className="banner-image"
                         src={require('../../Rent_match.png')} height="250" alt="img"/>
                    {
                        this.state.profile.userId && 
                        <button onClick={() => this.logout()} 
                            className="btn btn-danger btn-md logout-button" 
                            href="#"
                            role="button">Log out
                        </button>
                    }
                </div>

                <div className="input-group container-fluid">
                    {console.log("login status = " + this.props.loginStatus)}
                    <input 
                    type="text" className="form-control" aria-label="Text input with dropdown button"
                    value={this.state.searchCity} placeholder="Enter city" title="Type in the city you want to search"
                    onChange={(e) => this.setSearchCity(e)}
                    />
                    <div className="input-group-append">
                        <select className="state-input" value={this.state.searchState} onChange={(e) => this.setSearchState(e)}>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        <button type="button" className="btn btn-success" onClick={() => this.handleSearchSubmission()}>
                            Search Listings
                        </button>
                    </div>
                </div>

                {/* {
                    this.props.listings.length === 0 &&
                    <h4>Results will appear here</h4>
                } */}

                {/* {
                    this.props.listings.length !== 0 &&
                    <ResultsListComponent
                        findAllListings = {this.props.findAllListings}
                        listings = {this.props.listings}
                    />
                } */}

            </div>
        );
    }

}

// const stateToPropertyMapper = (state) => {
//     return {
//         listings: state.listings.listings
//     }
// }

// const dispatchToPropertyMapper = (dispatch) => {
//     return {
//         findAllListings: (city, state) =>
//             SearchService.getAllListings(city, state)
//                 .then(actualListings => dispatch(findAllListings(actualListings)))
//             //dispatch(findAllListings(SearchService.getAllListings()))
//     }
// }

export default SearchBarComponent

