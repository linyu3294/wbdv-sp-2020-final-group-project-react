import React from "react";
import {Link} from "react-router-dom";
import './ResultListItemStyle.css'

class ResultsListItemComponent extends React.Component {

    render() {
    return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">

       <div className="card">
           {this.props.listing.photo && <img className="card-img-top" src={this.props.listing.photo} alt="Card image cap"/>}
           {this.props.listing.property_id === "1" && <img className="card-img-top no-listing-photo" src="https://cdn.pixabay.com/photo/2014/04/03/00/38/house-308936_960_720.png" alt="Card image cap"/>}
            <div className="card-body">
                <h6 className="card-title">{this.props.listing.address}</h6>
                <p className="card-text">{this.props.listing.price}</p>
                {/* <a href="#" class="btn btn-primary">View Listing</a> */}
                <button className="btn btn-primary">
                    {/* TODO: on refresh, losing access to this.props.listings, need to pass down */}
                    <Link to={`/search/${this.props.cityQuery}/${this.props.stateQuery}/${this.props.listing.listing_id}/${this.props.listing.prop_status}/${this.props.listing.property_id}`} className="view-listing-button"><h5>View Listing</h5></Link>
                </button>
            </div>
            
        </div>
    </div>
        )
    }

}

export default ResultsListItemComponent
