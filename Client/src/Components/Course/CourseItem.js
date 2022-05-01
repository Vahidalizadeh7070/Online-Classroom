import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CourseItem = props => {
    return (
        <Fragment>
            <div className="col-lg-6 pb-3">
                <div className="card rounded-3 h-100">
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            Level: <small className="text-secondary">{props.level}</small> |
                            Capacity: <small className="text-secondary">{props.capacity}</small>
                        </h6>
                        <p className="card-text text-truncate">{props.about}</p>
                        <p className="card-text">
                            Start at: {props.start}
                        </p>
                        <p className="card-text">
                            Finished at: {props.end}
                        </p>
                        <Link to={"/CourseDetails/" + props.id } className="link-danger text-decoration-none">
                            Details
                        </Link>
                        <Link to='/Teacher' className="link-primary text-decoration-none px-2">
                            {props.teacher}
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CourseItem;