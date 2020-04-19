import React from "react";
import {Link} from "react-router-dom";
import './ResultListItemStyle.css'


class ResultsListItemComponent extends React.Component {

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
            </div>
            
        </div>
    </div>
            //     {/* <div className="card text-center highlighted-card bg-primary" onClick={this.selectCard}>
            //     <div className="card-header">
            //         <h5>Course</h5>
            //     </div>
            //     <div className="card-body">

            //         <FontAwesomeIcon icon={faFileAlt} color="white"/>
            //             {   !this.state.editing &&
            //                 <Link to={`/CourseEditorContainer/courses/${this.props.course._id}`}>
            //                 {this.state.course.title}
            //                 </Link>
            //             }

            //         <p className="card-text">Last Modified: {this.state.course.dateCreated}</p>
            //     </div>
            //     <div className="card-footer text-muted">
            //         <button onClick={() => this.props.deleteCourse(this.props.course)}>
            //         <FontAwesomeIcon icon={faTrashAlt} color="white"/></button>
            //         <button onClick={this.handleEditing}>
            //         <FontAwesomeIcon icon={faPencilAlt} color="white"/></button>
            //     </div>
            // </div> */}
        )
    }

}

export default ResultsListItemComponent
