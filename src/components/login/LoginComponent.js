import React from "react";
import LoginComponentStyle from "./LoginComponentStyle.css";

import LoginService from "../../services/LoginService";
import {connect} from "react-redux";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: '',
        password: '',
        failedLogin: false
    }

    // current cycle has state, but once state passes through store, it becomes the previous props

    setUsername = (e) => {
        const inputUsername = e.target.value;
        this.setState((prevState) => ({
                          ...prevState,
                          username: inputUsername
                      })
        )
    }

    setPassword = (e) => {
        const inputPassword = e.target.value;
        this.setState((prevState) => ({
                          ...prevState,
                          password: inputPassword
                      })
        )
    }



    login = () => {
        LoginService.login(this.state.username, this.state.password)
            .then(response => {
                if ("userId" in response) {
                    this.props.history.push('/')
                }
                else {
                    this.setState(prevState => ({
                        ...prevState,
                        failedLogin: true
                    }))
                   }
                })
    }
    rejectMessage = () => {
        return (
            <div>
                 <div className="list-group-item-danger">
                     Invalid username and/or password!
                 </div>
                 <br></br>
            </div>
        )
    }

    render() {
        return (
            <div id="login-component">
                <div className="login-background">
                    <img className="login-background-image"
                         src='https://architectureandinteriordesign.files.wordpress.com/2013/07/pretty-house.jpg'
                         alt="img"/>
                </div>
                <div class="login-box container-fluid">
                    <form class="login">
                        <p class="title">Log in</p>


                             {this.state.failedLogin &&
                             this.rejectMessage()}

                        <input type="text"
                               placeholder="Username"
                               autoFocus
                               onChange={(e) =>
                                   this.setUsername(e)}/>
                        <input type="password"
                               placeholder="Password"
                               autoFocus
                               onChange={(e) =>
                                   this.setPassword(e)}/>
                        <br/>
                        <a className="new-user" href="/register">New User? Register here</a>
                        <button type="button"
                                className="btn btn-success"
                                onClick={() => this.login()}>
                            Login
                        </button>
                        {/*{this.state.status === 'false' && this.rejectMessage()}*/}
                    </form>
                </div>
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        login: state.login.login
    }
}

export default connect(stateToPropertyMapper)
(LoginComponent)
