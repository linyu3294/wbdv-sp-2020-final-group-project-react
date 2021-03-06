import React from "react";
import {Route} from "react-router-dom";
import SearchBarComponent from "../../components/search/SearchBarComponent";
import ResultsListComponent from "../../components/results/ResultsListComponent";
import {combineReducers, createStore} from "redux"
import listingReducer from "../../reducers/listingReducer";
import loginReducer from "../../reducers/loginReducer"
import {Provider} from "react-redux"
import ListingDetailComponent from "../../components/details/ListingDetailComponent";
import LoginComponent from "../../components/login/LoginComponent";
import RegisterComponent from "../../components/register/RegisterComponent";
import ProfileComponent from "../../components/profile/ProfileComponent";
import PrivacyPageComponent from "../../components/privacy/PrivacyPageComponent";
import HomeComponent from "../../components/home/HomeComponent";
import SuggestedListingDetailComponent from "../../components/details/SuggestedListingDetailComponent";
import CreateListingComponent from "../../components/create-listing/CreateListingComponent";
import EditListingComponent from "../../components/edit-listing/EditListingComponent";


const rootReducer = combineReducers({
    listings: listingReducer,
    login: loginReducer,
})

const store = createStore(rootReducer)

class ListingSearchContainer extends React.Component{

    state = {}
        
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Route path="/search" exact={true} render={(props) =>
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

                    <Route path="/privacy" exact={true} render={(props) =>
                        <div>
                            <PrivacyPageComponent
                                history={props.history}/>
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
                            history={props.history}
                            />
                        </div>
                    }>

                    </Route>

                    <Route path="/profile" exact={true} render={(props) =>
                        <div>
                            <ProfileComponent
                            history={props.history}
                            visitor={false}
                            />
                        </div>
                    }>
                    </Route>

                    <Route path="/profile/:profileId" exact={true} render={(props) =>
                        <div>
                            <ProfileComponent
                            history={props.history}
                            visitor={true}
                            profileId={props.match.params.profileId}
                            />
                        </div>
                    }>
                    </Route>

                    <Route path="/" exact={true} render={(props) =>
                        <div>
                            <HomeComponent
                                history={props.history}
                            />
                        </div>
                    }>
                    </Route>


                    <Route path="/search/:cityQuery/:stateQuery" exact={true} render={(props) =>
                        <div>
                            <SearchBarComponent
                                loginStatus={this.props.loginStatus} //contains login state
                                history={props.history}
                                cityQuery={props.match.params.cityQuery}
                                stateQuery={props.match.params.stateQuery}
                                handleSearch={this.handleSearch}
                                history={props.history}
                            />

                            <ResultsListComponent 
                                cityQuery={props.match.params.cityQuery}
                                stateQuery={props.match.params.stateQuery}
                                listings={this.props.listings}
                                history={props.history}
                            />

                        </div>}>

                    </Route>

                    <Route path="/search/:cityQuery/:stateQuery/:listingId/:propStatus/:propertyId" exact={true} render={(props) =>
                        <ListingDetailComponent
                        listings={this.props.listings}
                        city={props.match.params.cityQuery}
                        state={props.match.params.stateQuery}
                        listingId={props.match.params.listingId}
                        propStatus={props.match.params.propStatus}
                        propertyId={props.match.params.propertyId}
                        history={props.history}
                        />
                    }
                    >
                    </Route>


                    <Route path="/:cityQuery/:stateQuery/:listingId/:propStatus/:propertyId/suggested" exact={true} render={(props) =>
                        <SuggestedListingDetailComponent
                            city={props.match.params.cityQuery}
                            state={props.match.params.stateQuery}
                            listingId={props.match.params.listingId}
                            propStatus={props.match.params.propStatus}
                            propertyId={props.match.params.propertyId}
                            history={props.history}
                        />
                    }
                    >
                    </Route>
                    
                    <Route path="/createlisting" exact={true} render={(props) =>
                        <div>
                            <CreateListingComponent
                                history={props.history}
                            />
                        </div>
                    }>
                    </Route>

                    <Route path="/editlisting/:listingId" exact={true} render={(props) =>
                        <div>
                            <EditListingComponent
                                history={props.history}
                                listingId={props.match.params.listingId}
                            />
                        </div>
                    }></Route>

                </div>
            </Provider>
        )
    }

}


export default ListingSearchContainer
