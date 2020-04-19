import React from "react";
import UserService from '../../services/UserService';
import LoginService from "../../services/LoginService";

class ProfileComponent extends React.Component {

    state = {
        editingMode: false,
        profile: {}
    }

    componentDidMount() {
        this.getUserProfile()
        console.log(this.state.profile)
    }

    handleEditMode = () => {
        this.setState({
            editingMode: !this.state.editingMode
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
        // probably need to reset profile with this response
        console.log("about to call update profile baby")
        UserService.updateProfile(this.state.profile)
        .then(response => {
            console.log(response)
            this.setState({
                profile: response
            })
        });
        console.log(this.state.profile)
    }


    render() {
        return (
            
            <div className="jumbotron">
                <a href="/">Home</a>
                <h1 className="display-4">Hi, {this.state.profile.firstName}!</h1>
                
                {
                    this.state.profile.userId &&
                    <button onClick={() => this.logout()}
                        className="btn btn-danger btn-md logout-button"
                        href="#"
                        role="button">Log out
                    </button>
                }

                <p className="lead">Here are your details.</p>
                <p className="lead">
                { this.state.editingMode === false &&

                <form>
                    <button onClick={() => this.handleEditMode()}>Edit your profile</button>
                    <div className="form-group">
                        <label for="usernameInput">Username: {this.state.profile.username}</label>
                    </div>
                    <div className="form-group">
                        <label for="firstNameInput">First name: {this.state.profile.firstName}</label>
                    </div>
                    <div className="form-group">
                    <label for="lastNameInput">Last name: {this.state.profile.lastName}</label>
                    </div>
                    <div className="form-group">
                        <label for="emailInput">Email: {this.state.profile.email}</label>
                    </div>
                    <div className="form-group">
                        <label for="phoneInput">Phone: {this.state.profile.phone}</label>
                    </div>
                </form>
                }
                { this.state.editingMode === true &&
                <form>
                    <div className="form-group">
                        <label for="usernameInput">Username:                         
                        <input
                            placeholder="new username"
                            onChange={(e) => this.state.profile.username = e.target.value}
                        />
                        </label>

                    </div>
                    <div className="form-group">
                        <label for="firstNameInput">First name:                         
                        <input
                            placeholder="new first name"
                            onChange={(e) => this.state.profile.firstname = e.target.value}
                        />
                        </label>

                    </div>
                    <div className="form-group">
                    <label for="lastNameInput">Last name:                     
                    <input
                            placeholder="new last name"
                            onChange={(e) => this.state.profile.lastname = e.target.value}
                        />
                        </label>

                    </div>
                    <div className="form-group">
                        <label for="emailInput">Email:                         
                        <input
                            placeholder="new email"
                            onChange={(e) => this.state.profile.email = e.target.value}
                        />
                        </label>

                    </div>
                    <div className="form-group">
                        <label for="phoneInput">Phone:                         
                        <input
                            placeholder="new phone"
                            onChange={(e) => this.state.profile.phone = e.target.value}
                        />
                        </label>

                    </div>
                    <button onClick={() => this.saveProfileChanges()}>Save your profile changes</button>
                </form>
                }
                </p>
                <a href="/search">Go to search</a>
            </div>
        )
    }

}

export default ProfileComponent
