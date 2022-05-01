import React,{ Fragment } from "react";
import { CameraVideo, ThreeDots } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Moment from 'moment';

const UserCoursesList = props => {
    return (
        <Fragment>
            <div className="col-lg-4 mb-3">
                <div className="card rounded-3 h-100">
                    <div className="card-body">
                        <h5 className="card-title pb-3">{props.courseName}</h5>
                        <h6 className="card-subtitle pb-3 text-muted">Level: {props.level}</h6>
                        <p className="card-text">{Moment(props.registerDate).format('dddd - DD MMMM yyyy')}</p>
                    </div>
                    <p className="px-3">
                        <Link to={"./courseDetails/" + props.courseId} className="btn btn-sm btn-info rounded-circle text-light float-end"><ThreeDots /></Link>
                        
                            <Link to={"./lobby/" + props.courseId} className="btn btn-sm btn-success rounded-circle text-light float-end mx-1"><CameraVideo /></Link>
                       
                    </p>
                </div>
            </div>
        </Fragment>
    )
}
export default UserCoursesList;