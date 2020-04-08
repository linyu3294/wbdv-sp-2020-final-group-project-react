import React from "react";
import {Route} from "react-router-dom";
import SearchBarComponent from "../../components/SearchBarComponent";
import ResultsListComponent from "../../components/ResultsListComponent";
import SearchService from "../../services/SearchService";
import {combineReducers, createStore} from "redux"
import listingReducer from "../../reducers/listingReducer";
import loginReducer from "../../reducers/loginReducer"
import {Provider} from "react-redux"
import ListingDetailComponent from "../../components/ListingDetailComponent";
import LoginComponent from "../../components/LoginComponent";
import RegisterComponent from "../../components/RegisterComponent";

const rootReducer = combineReducers({
    listings: listingReducer,
    login: loginReducer
})

const store = createStore(rootReducer)

class ListingSearchContainer extends React.Component{

    state = {}
        
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Route path="/" exact={true} render={(props) =>
                        <div>
                            <SearchBarComponent
                                // updateForm={this.updateForm}
                                loginStatus={this.props.loginStatus}
                                history={props.history}
                                searchCity={this.state.searchCity}
                                handleSearch={this.handleSearch}
                            />
                        </div>}>
                    </Route>

                    <Route path="/login" exact={true} render={(props) =>
                        <div>
                            <LoginComponent
                                history={props.history}/>
                        </div>}>
                    </Route>

                    <Route path="/register" exact={true} render={(props) =>
                        <div>
                            <RegisterComponent
                            />
                        </div>
                    }>

                    </Route>

                    <Route path="/:cityQuery/:stateQuery" exact={true} render={(props) =>
                        <div>
                            <SearchBarComponent
                                loginStatus={this.props.loginStatus} //contains login state
                                cityQuery={props.match.params.cityQuery}
                                stateQuery={props.match.params.stateQuery}
                                handleSearch={this.handleSearch}
                            />

                            <ResultsListComponent 
                                cityQuery={props.match.params.cityQuery}
                                stateQuery={props.match.params.stateQuery}
                                listings={this.props.listings}
                            />

                        </div>}>

                    </Route>

                    <Route path="/:cityQuery/:stateQuery/:listingId" exact={true} render={(props) =>
                        <ListingDetailComponent
                        listings={this.props.listings}
                        listingId={props.match.params.listingId}
                        />
                    }
                    >
                    </Route>
                </div>
            </Provider>
        )
    }

}


export default ListingSearchContainer
