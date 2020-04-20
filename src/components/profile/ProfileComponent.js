import React, { Fragment } from "react";
import UserService from '../../services/UserService';
import LoginService from "../../services/LoginService";
import ResultsListItemComponent from "../results/ResultListItemComponent";
import "./ProfileComponentStyles.css"

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        editingMode: false,
        profile: {},
        userNameCopy: '',
        visitor: this.props.visitor,
        photo: null
    }

    componentDidMount() {
        console.log(this.state.visitor)
        if (this.state.visitor === true) {
            this.getUserProfileForGuest(this.props.profileId)
            console.log(this.state.profile)
        } else {
            this.getUserProfile()
            console.log(this.state.profile)
        }
    }

    handleEditMode = () => {
        this.setState({
            editingMode: !this.state.editingMode
        })
    }

    getUserProfileForGuest = (userId) => {
    UserService.getProfileForGuest(userId).then(actualResponse => {
        console.log(actualResponse)
            this.setState({profile: actualResponse})
    })
    }

    getUserProfile = () => {
    UserService.getProfile().then(actualResponse => {
        console.log(actualResponse)
            this.setState({profile: actualResponse})
    })
    }

    logout = () => {
        LoginService.logout()
        .then(this.setState({
            profile: {}
        }))
    }

    saveProfileChanges = () => {
        this.handleEditMode();
        UserService.updateProfile(this.state.profile)
        .then(updatedUser => {
            if (updatedUser.username == "username already taken!!") {
                alert("That username is already taken! Try again.")
                this.setState({
                    profile: {
                        ...this.state.profile,
                        username: "---"
                    }
                })
            } else {
            this.setState({
                profile: updatedUser
            })
        }
        });
    }

    render() {
        return (
            <Fragment>
            { this.state.visitor === false &&

            <div className="container-fluid">
            { this.state.profile.userId == null &&
                <div className="jumbotron">
                    <h4>You are not logged in. Go to <a href="/login">login page</a></h4>
                </div>
            }

            { this.state.profile.userId != null &&
            <Fragment>

                <div className="row">
                    <button onClick={() => this.logout()} 
                        className="btn btn-danger btn-md logout-button" 
                        href="#"
                        role="button">Log out
                    </button>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="jumbotron">
                            <div className="row">
                            
                                <div className="col-sm-3">

                                    <img
                                        className="profile-picture" 
                                        src={require('../../profilepicture.png')} 
                                        alt="Profile Picture"
                                    />
                                    <br/>
                                    <p className="lead">
                                        <div className="form-group">
                                            <label htmlFor="firstNameInput">First name: {this.state.profile.firstName}</label>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastNameInput">Last name: {this.state.profile.lastName}</label>
                                        </div>
                                    </p>
                                </div>  
                                <div className="col-sm-9">

                                    <h1 className="display-4">Hi, {this.state.profile.firstName}!</h1>
                                    
                                    <p className="lead">Here are your details.</p>
                                    
                                    { this.state.editingMode === false &&
                                    <p className="lead">
                                        <form>
                                            <button onClick={() => this.handleEditMode()}>Edit your profile</button>
                                            <div className="form-group">
                                                <label htmlFor="usernameInput">Username: {this.state.profile.username}</label>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="emailInput">Email: {this.state.profile.email}</label>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phoneInput">Phone: {this.state.profile.phone}</label>
                                            </div>
                                        </form>
                                    </p>
                                    }

                                    { this.state.editingMode === true &&
                                    <p className="lead">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="usernameInput">Username:                         
                                            <input
                                                placeholder={this.state.profile.username}
                                                onChange={(e) => this.state.profile.username = e.target.value}
                                            />
                                            </label>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="firstNameInput">First name:                         
                                            <input
                                                placeholder={this.state.profile.firstName}
                                                onChange={(e) => this.state.profile.firstName = e.target.value}
                                            />
                                            </label>

                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="lastNameInput">Last name:                     
                                        <input
                                                placeholder={this.state.profile.lastName}
                                                onChange={(e) => this.state.profile.lastName = e.target.value}
                                            />
                                            </label>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="emailInput">Email:                         
                                            <input
                                                placeholder={this.state.profile.email}
                                                onChange={(e) => this.state.profile.email = e.target.value}
                                            />
                                            </label>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phoneInput">Phone:                         
                                            <input
                                                placeholder={this.state.profile.phone}
                                                onChange={(e) => this.state.profile.phone = e.target.value}
                                            />
                                            </label>

                                        </div>
                                        <button onClick={() => this.saveProfileChanges()}>Save your profile changes</button>
                                    </form>
                                    </p>
                                    }

                                    <p className="lead">
                                        <a href="/">Home</a>
                                        <br/>
                                        <a href="/search">Go to search</a>
                                    </p>
                                    </div>
                                </div>
                            </div>                     
                        </div>

                        <div className="col-sm-4 listings-column">
                            <div className="jumbotron bg-gradient-secondary">
                                { this.state.profile.userType == "RENTER" &&
                                <Fragment>
                                <h2 className="display-6">Your Liked Listings</h2>
                                        { this.state.profile.likedListings &&
                                            this.state.profile.likedListings.map((listing, index) => 
                                                <ResultsListItemComponent
                                                key={listing.property_id}
                                                listing={listing}
                                                cityQuery={listing.city}
                                                stateQuery={listing.state}
                                                />
                                            )
                                        }
                                    </Fragment>
                                    }
                                    { this.state.profile.userType == "LANDLORD" &&
                                <Fragment>
                                <h2 className="display-6">Your owned listings</h2>
                                        { this.state.profile.ownedListing &&
                                            this.state.profile.ownedListing.map((listing, index) => 
                                                <ResultsListItemComponent
                                                key={listing.property_id}
                                                listing={listing}
                                                cityQuery={listing.city}
                                                stateQuery={listing.state}
                                                />
                                            )
                                        }
                                        
                                        <a className="col-sm-4" href="/createlisting">
                                            <button className="btn btn-success btn-md" href="#"
                                                    role="button">Create New Listing
                                            </button>
                                        </a>
                            
                                    </Fragment>
                                    }
                            </div>
                        </div>
                </div>
            </Fragment>
            }
            </div>
        }

        { this.state.visitor === true &&

            <Fragment>

            { this.state.profile.userId == null &&
                <div className="jumbotron">
                    <h4>Can't find that user. <a href="/">Go home</a></h4>
                </div>
            }

            {this.state.profile.userId != null &&

            <div className="container-fluid">



                <div className="row">
                    <button onClick={() => this.logout()} 
                        className="btn btn-danger btn-md logout-button" 
                        href="#"
                        role="button">Log out
                    </button>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="jumbotron">
                            <div className="row">
                            
                                <div className="col-sm-3">

                                    <img
                                        className="profile-picture" 
                                        src={require('../../profilepicture.png')} 
                                        alt="Profile Picture"
                                    />
                                    <br/>
                                    <p className="lead">
                                        <div className="form-group">
                                            <label htmlFor="firstNameInput">First name: {this.state.profile.firstName}</label>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastNameInput">Last name: {this.state.profile.lastName}</label>
                                        </div>
                                    </p>
                                </div>  
                                <div className="col-sm-9">
                                    
                                    <p className="lead">Here are {this.state.profile.firstName}'s details.</p>
                                    
                                    <p className="lead">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="usernameInput">Username: {this.state.profile.username}</label>
                                            </div>
                                        </form>
                                    
                                    
                                        <a href="/">Home</a>
                                        <br/>
                                        <a href="/search">Go to search</a>
                                    </p>

                                    </div>
                                </div>
                            </div>                     
                        </div>
                        <div className="col-sm-4 listings-column">
                            <div className="jumbotron bg-gradient-secondary">
                                <h2 className="display-6">{this.state.profile.firstName}'s Liked Listings</h2>
                                        { this.state.profile.likedListings &&
                                            this.state.profile.likedListings.map((listing, index) => 
                                                <ResultsListItemComponent
                                                key={listing.property_id}
                                                listing={listing}
                                                cityQuery={listing.city}
                                                stateQuery={listing.state}
                                                />
                                            )
                                        }
                            </div>
                        </div>
                </div>

            </div>
            }
            </Fragment>
        }
        </Fragment>          
        )
    }

}

export default ProfileComponent

  // {/* <input type="file"
  //     id="avatar" name="avatar"
  //     accept="image/png, image/jpeg"
  //     onChange={(e) => this.state.photo = e.target.value}/>

  // <img src={this.state.photo} alt="Profile Picture"></img> */}

