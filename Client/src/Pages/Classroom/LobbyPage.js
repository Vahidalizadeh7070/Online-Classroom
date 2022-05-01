import React,{ Fragment, useCallback, useContext, useEffect, useState } from "react";
import VideoChat from '../../Components/VideoChat/VideoChat';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import RoomInformation from "../../Components/VideoChat/RoomInformation";
import AuthContext from "../../store/auth-context";

const LobbyPage = props => {
    const params = useParams();
    const context = useContext(AuthContext);

    const [exist, setExist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState({});
    const email = context.email;

    const existCourse = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://vahidalizadeh7070.ir/api/UserCourses/'+ email +'&' + params.courseId);
            if (!response.ok) {
                setIsLoading(false);
                setExist(false);
                setError('There is an error');
                return;
            }
            const data = await response.json();
            setExist(true);
            setCourse(data);
            
        }
        catch {
            setExist(false);
            setError('Something went wrong');
        }
        setIsLoading(false);

    }, [email, params.courseId])

    useEffect(() => {
        existCourse();
    }, [existCourse])

    return (
        <Fragment>
            <div className="container mt-3">
                <h2>Details</h2>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Lobby</li>
                    </ol>
                </nav>
                <hr />
                <div className="pt-1">
                    <div className="row">
                        {!error ? <VideoChat userName={email} roomName={course.courseName} /> : <p className="text-danger text-center">There is an error. Please try again later</p> }
                        {!error ? <RoomInformation info={course}/> : <p className="text-danger text-center">There is an error. Please try again later</p> }
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default LobbyPage;