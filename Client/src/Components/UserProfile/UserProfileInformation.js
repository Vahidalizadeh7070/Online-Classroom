import React,{ Fragment } from "react";

const UserProfileInformation = props => {

    const ShowEditForm = () => {
        props.EditForm();
    }

    return (
        <Fragment>
            <h3>Profile {props.userProfile.email}</h3>
            <hr />
            {props.isLoading && !props.error &&(
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {props.error && <p className="text-danger text-center">{props.error}</p>}
            {
                !props.error && !props.isLoading &&(
                    <div className="row">
                        <div className="col-12 pb-5">
                            <p className="text-secondary">About you</p>
                            {props.userProfile.about}
                        </div>
                        <div className="col-md-4">
                            {props.userProfile.phoneNumber}
                        </div>
                        <div className="col-md-4">
                            <a href={"https://www.facebook.com/" + props.userProfile.facebookAccount} className="text-primary text-decoration-none">facebook Account</a>
                        </div>
                        <div className="col-md-4">
                            <a href={"https://www.twitter.com/" + props.userProfile.twitterAccount} className="text-info text-decoration-none">twitter Account</a>
                        </div>
                        <div className="pb-3 pt-3">
                            <button className="btn rounded-3 btn-danger shadow float-end" onClick={ShowEditForm}>Update</button>
                        </div>
                    </div>
                )
            }
        </Fragment>
    )
}

export default UserProfileInformation;