import React,{ Fragment } from "react"
import CourseBookmark from "../../Components/Bookmark/CourseBookmark";
import Profile from "../../Components/UserProfile/Profile";

const UserProfilePage = props => {
    return (
        <Fragment>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-lg-8 col-md-7">
                        <Profile />                        
                    </div>
                    <div className="col-lg-4 col-md-5">
                        <CourseBookmark />
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default UserProfilePage;