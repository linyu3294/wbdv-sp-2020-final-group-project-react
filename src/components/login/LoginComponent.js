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
        status: ''
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

    handleLogin = (response) => {
        this.setState({status: response.status})
        if (this.state.status === 'true') {
            this.props.history.push('/')
        } else {
            this.rejectMessage()
        }
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
                        {this.state.status === 'false' &&
                         <div>
                             <div className="list-group-item-danger">
                                 Invalid username and/or password!
                             </div>
                             <br></br>
                         </div>}
                        <input type="text"
                               placeholder="Username"
                               autofocus
                               onChange={(e) =>
                                   this.setUsername(e)}/>
                        <input type="password"
                               placeholder="Password"
                               autofocus
                               onChange={(e) =>
                                   this.setPassword(e)}/>
                        <a className="forgot-password" href="#">Forgot your password?</a>
                        <br/>
                        <a className="new-user" href="/register">New User? Register here</a>
                        <button type="button"
                                className="btn btn-success"
                                onClick={() => LoginService.login(this.state.username,
                                                                  this.state.password)
                                    .then(response => this.handleLogin(response))}>
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
