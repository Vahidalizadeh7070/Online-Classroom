import React,{ Fragment, useCallback, useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CourseDetails from '../../Components/Course/CourseDetails';


const CourseDetailsPage = props => {
    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const params = useParams();
    const RetrieveCourse = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://vahidalizadeh7070.ir/api/Courses/' + params.id);
            if (!response.ok || response.status === 404) {
                throw new Error('Something went wrong!!!');
            }
            const data = await response.json();
            setCourse({
                id: data.id,
                title: data.title,
                level: data.level,
                about: data.about,
                start: data.start,
                end: data.end,
                teacher: data.teacher,
                capacity: data.capacity
            })
        }
        catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [params.id]);

    useEffect(() => {
        RetrieveCourse();
    }, [RetrieveCourse])


    let content = <p className='fs-4 text-center'>There is no course.</p>;
    if (isLoading) {
        content = (
            <div className="d-flex justify-content-center mt-5 mb-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    if (error) {
        content = <p className='text-danger text-center fs-4'>{error}</p>;
    }
    else {
        content = (
            <CourseDetails course={course} />
        )
    }

    return (
        <Fragment>
            <div className="container mt-3">
                <h2>Details</h2>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Details</li>
                    </ol>
                </nav>
                <hr />
                <div className="pt-1">
                    {content}
                </div>
            </div>
        </Fragment>
    )
}

export default CourseDetailsPage;