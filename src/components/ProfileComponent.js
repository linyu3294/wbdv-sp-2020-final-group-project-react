import React from "react";
import userService from '../services/UserService';

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
            <div>
                <h1>Profile</h1>
                <h2>Hello {this.state.profile.firstName}</h2>
            </div>
        )
    }
}

export default ProfileComponent