import React from "react";
import {Link} from "react-router-dom";
import './ResultListItemStyle.css'


class ResultListOwnedItemComponent extends React.Component {

    render() {
        return (
            //    <div className="card container">
            //         <div className="card-body">
            //             <h1>{this.props.listing.price}</h1>
            //             <Link to={`/query/${this.props.listing.listing_id}`}><h2>{this.props.listing.address}</h2></Link>
            //             <img src={this.props.listing.photo}/>
            //         </div>
            //    </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">

                <div className="card">
                    <img className="card-img-top" src={this.props.listing.photo} alt="Card image cap"/>
                    <div className="card-body">
                        <h6 className="card-title">{this.props.listing.address}</h6>
                        <p className="card-text">{this.props.listing.price}</p>
                        {/* <a href="#" class="btn btn-primary">View Listing</a> */}
                        <button>
                            {/* TODO: on refresh, losing access to this.props.listings, need to pass down */}
                            <Link to={`/search/${this.props.cityQuery}/${this.props.stateQuery}/${this.props.listing.listing_id}/${this.props.listing.prop_status}/${this.props.listing.property_id}`}><h5>View Listing</h5></Link>
                        </button>
                        <a href={`/editlisting/${this.props.listing.listing_id}`}>
                            <button className="btn btn-success">
                                Edit Listing
                            </button>
                        </a>
                    </div>

                </div>
            </div>

        )
    }

}

export default ResultListOwnedItemComponent
