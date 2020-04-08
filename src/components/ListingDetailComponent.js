import React from "react";
import {connect} from "react-redux";
import SearchService, {getListingDetails} from "../services/SearchService";

class ListingDetailComponent extends React.Component {


    componentDidMount() {
        console.log(this.props.listings)
        let pageListing = this.props.listings.filter(listing =>
        listing.listing_id === this.props.listingId)

        let details = SearchService.getListingDetails(pageListing[0].listing_id, pageListing[0].prop_status, pageListing[0].property_id)
        this.setState({
            listing: pageListing[0]
        })
        details.then(response => this.setState({
            listingInfo: response
        }))
    }

    state = {
        listing: {},
        listingInfo:{}
    }

    render() {
        return (
            <div>
                <h1>Listing detail component</h1>
                {
                    this.state.listing &&
                    <div>
                        <h1>LISTING FOUND!!!</h1>
                        <h1>{this.state.listing.address}</h1>
                        <img src={this.state.listing.photo}/>
                    </div>

                }

                {
                    this.state.listingInfo.listing &&
                    <div>
                        <h1>This is the Details</h1>
                        {console.log("Coming from the detaiuls")}
                        {console.log(this.state.listingInfo)}
                        {console.log(this.state.listingInfo.listing)}

                        {this.state.listingInfo.listing.photos.map(photo => (
                            <img src={photo.href}/>
                        ))}

                    </div>
                }
            </div>
        )
    }

}

const stateToPropertyMapper = (state) => {
    return {
        listings: state.listings.listings
    }
}

export default connect(stateToPropertyMapper)(ListingDetailComponent)