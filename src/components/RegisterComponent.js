import React from "react";
import userService from '../services/UserService';

class RegisterComponent extends React.Component {

    state = {
        user: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            userType: "RENTER",
            username: "",
            password: "",
            confirmPassword: ""
        },
        passwordMatch: false
    }

    validatePasswords() {
        if (this.state.user.password != this.state.user.confirmPassword) {
            document.getElementById("confirmPasswordField").innerHTML="Passwords not matching!";
            return false; 
        }
        document.getElementById("confirmPasswordField").innerHTML="";
        return true;
    }

    createUser = (user) => {
        userService.createUser(user).then(actualUser => console.log(actualUser))
        this.props.history.push("/profile")
    }

    render() {
        return (
            <div class="jumbotron">
                <h1 class="display-4">Register for RentMatch</h1>
                <p class="lead">Enter your name, email, phone, and 
                whether you are a renter or a landlord to get going.</p>
                <p class="lead">
                <form>
                    <div class="form-row">
                        <div class="col">
                        <label for="firstNameInput">First name</label>
                        <input type="text" id="firstNameInput" 
                        onChange={(e) => this.state.user.firstName = e.target.value}
                        class="form-control" placeholder="First name"/>
                        </div>
                        <div class="col">
                        <label for="lastNameInput">Last name</label>
                        <input type="text" id="lastNameInput" 
                        onChange={(e) => this.state.user.lastName = e.target.value}
                        class="form-control" placeholder="Last name"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="emailInput">Email</label>
                        <input type="email" class="form-control" 
                        onChange={(e) => this.state.user.email = e.target.value}
                        id="emailInput" placeholder="Enter your email"/>
                    </div>
                    <div class="form-group">
                        <label for="phoneInput">Phone</label>
                        <input type="phone" class="form-control" 
                        onChange={(e) => this.state.user.phone = e.target.value}
                        id="phoneInput" placeholder="Enter your phone number"/>
                    </div>
                    <div class="row border" data-toggle="buttons">
                        <div class="col-2">
                            <label>
                                <input 
                                onChange={(e) => this.state.user.userType = e.target.value}
                                value="RENTER" type="radio" name="options" 
                                id="option1" autocomplete="off" checked/> Renter
                            </label>
                        </div>
                        <br/>
                        <div class="col-2">
                            <label>
                                <input 
                                onChange={(e) => this.state.user.userType = e.target.value}
                                value="LANDLORD" type="radio" name="options" 
                                id="option2" autocomplete="off"/> Landlord
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="usernameInput">Username</label>
                        <input type="text" class="form-control" 
                        onChange={(e) => this.state.user.username = e.target.value}
                        id="usernameInput" placeholder="Enter your username"/>
                    </div>
                    <div class="form-group">
                        <label for="passwordInput">Password</label>
                        <input type="password" class="form-control" 
                        onChange={(e) => {
                            this.state.user.password = e.target.value
                            this.validatePasswords()
                        }
                        }
                        id="passwordInput" placeholder="Enter your password"/>
                    </div>
                    <p id="confirmPasswordField"></p>
                    <div class="form-group">
                        <label for="confirmInput">Confirm Password</label>
                        <input type="password" class="form-control" 
                        onChange={(e) => {
                            this.state.user.confirmPassword = e.target.value
                            this.validatePasswords()
                        }
                        }
                        id="confirmInput" placeholder="Confirm your password"/>
                    </div>
                </form>
                </p>
                <button onClick={() => this.createUser(this.state.user)} type="button" class="btn btn-success">Register</button>
            </div>
        )
    }
}

export default RegisterComponent



