import React,{ Fragment, useContext, useEffect, useState, useCallback } from "react";
import AuthContext from "../../store/auth-context";
import UserCoursesItem from "./UserCoursesItem";

const UserCoursesRegistered = props => {
    const context = useContext(AuthContext);
    const email = context.email;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [course, setCourse] = useState([]);

    const RetrieveYourCourse = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://vahidalizadeh7070.ir/api/userCourses?email=' + email);
            if (!response.ok) {
                setIsLoading(false);
                setCourse([]);
            }
            const data = await response.json();

            const loadCourses = [];
            for (const key in data.$values) {

                loadCourses.push(
                    {
                        courseId: data.$values[key].courseId,
                        courseName: data.$values[key].courseName,
                        level: data.$values[key].level,
                        isReady: data.$values[key].isReady,
                        registerDate: data.$values[key].registerDate
                    }
                );
            }
            setCourse(loadCourses);
        }
        catch {
            setCourse([]);
        }
        setIsLoading(false);
    }, [email]);


    useEffect(() => {
        RetrieveYourCourse();
    }, [RetrieveYourCourse])

    let content;
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
        content = <p className='text-danger text-center'>{error}</p>;

    }
    if (course.length === 0 && !isLoading && !error) {
        content = <p className="text-danger text-center">There is no courses.</p>
    }
    if (course.length > 0 && !error) {
        content = (
            course.map(courses =>
                <UserCoursesItem
                    courseId={courses.courseId}
                    key={courses.courseId}
                    courseName={courses.courseName}
                    level={courses.level}
                    registerDate={courses.registerDate}
                    isReady={courses.isReady}
                />
            )
        )
    }

    return (
        <Fragment>
            <h3>Your courses</h3>
            <small className="text-socondary fw-light">All courses that you have registered are demonstrated in this list</small>
            <hr />
            <div className="row">
                {content}
            </div>
        </Fragment>
    )
}

export default UserCoursesRegistered;