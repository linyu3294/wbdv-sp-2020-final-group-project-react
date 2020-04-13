import React from "react";
import userService from '../../services/UserService';

class ProfileComponent extends React.Component {

    state = {
        profile: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            username: '',
            userType: ''
            // will have listings here eventually too
        }
    }

    componentDidMount() {
        userService.getProfile().then(actualProfile =>
            this.setState({profile: actualProfile}))
    }


    render() {
        return (
            <div class="jumbotron">
                <h1 class="display-4">Hi, {this.state.profile.firstName}!</h1>
                <p class="lead">Here are your details.</p>
                <p class="lead">
                <form>
                    <div class="form-group">
                        <label for="usernameInput">Username: {this.state.profile.username}</label>
                    </div>
                    <div class="form-group">
                        <label for="firstNameInput">First name: {this.state.profile.firstName}</label>
                    </div>
                    <div class="form-group">
                    <label for="lastNameInput">Last name: {this.state.profile.lastName}</label>
                    </div>
                    <div class="form-group">
                        <label for="emailInput">Email: {this.state.profile.email}</label>
                    </div>
                    <div class="form-group">
                        <label for="phoneInput">Phone: {this.state.profile.phone}</label>
                    </div>
                </form>
                </p>
                <a href="/">Go to search</a>
            </div>
        )
    }
}

export default ProfileComponent