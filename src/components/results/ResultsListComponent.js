import React from "react";
import SearchService from "../../services/SearchService";
import {findAllListings} from "../../actions/searchActions";
import {connect} from "react-redux";
import {unmountComponentAtNode} from "react-dom";
import ResultsListItemComponent from "./ResultListItemComponent";
import './ResultListStyle.css'

class ResultsListComponent extends React.Component {

    state = {
        dbListings: []
    }

    componentDidMount() {
        this.props.findAllListings(this.props.cityQuery, this.props.stateQuery).then(listings => {
        this.props.findListingsFromDb(this.props.cityQuery, this.props.stateQuery)
            .then(r => {
                console.log("this is r")
                console.log(r)


                this.setState({
                    dbListings: r,
                    combinedListings: r.concat(this.props.listings)
                })
                console.log(this.state.combinedListings)
            })

        })
         console.log("this is from did mount listings are")
         console.log(this.props.listings)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listings !== this.props.listings){
            // this.props.findAllListings()
            // console.log("this is from did update listings are")
            // console.log(this.props.listings)
        }
    }

    render() {
        return (
            <div className="row">
                {this.props.listings.length === 0 && <h5>No results</h5>}
                {this.state.combinedListings && this.state.combinedListings.map(listing => (

                        <ResultsListItemComponent
                        key={listing.property_id}
                        cityQuery = {this.props.cityQuery}
                        stateQuery = {this.props.stateQuery}
                        listing={listing}
                        />
                ))}

            </div>
        )
    }

}


const stateToPropertyMapper = (state) => {
    return {
        listings: state.listings.listings
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findAllListings: (city, state) =>
            SearchService.getAllListings(city, state)
                .then(actualListings => dispatch(findAllListings(actualListings))),
            //dispatch(findAllListings(SearchService.getAllListings()))

        findListingsFromDb: (city, state) =>
            SearchService.getStoredListings(city, state)
                .then(response => response)
    }
}


export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(ResultsListComponent)
