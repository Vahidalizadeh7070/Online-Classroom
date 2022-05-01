import React, { Fragment, useState, useCallback, useEffect } from "react";
import CourseItem from "./CourseItem";

const ListOfCourses = props => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const RetrieveCourses = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://vahidalizadeh7070.ir/api/Courses');
            if (!response.ok) {
                throw new Error('Something went wrong!!!');
            }
            const data = await response.json();
            const loadCourses = [];
            for (const key in data.$values) {

                loadCourses.push(
                    {
                        id: data.$values[key].id,
                        title: data.$values[key].title,
                        level: data.$values[key].level,
                        about: data.$values[key].about,
                        start: data.$values[key].start,
                        end: data.$values[key].end,
                        teacher: data.$values[key].teacher,
                        capacity: data.$values[key].capacity,
                    }
                );
            }

            setCourses(loadCourses);
        }
        catch (error) {
            setError(error.message);

        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        RetrieveCourses();
    }, [RetrieveCourses])

    let content = <p className='fs-4 text-center'>There is no course in the list.</p>;
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
    if (courses.length > 0) {
        content = (
            courses.map(course =>
                <CourseItem
                    id={course.id}
                    key={course.id}
                    title={course.title}
                    level={course.level}
                    about={course.about}
                    start={course.start}
                    end={course.end}
                    capacity={course.capacity}
                    teacher={course.teacher}
                />
            )
        )
    }

    return (
        <Fragment>
            <div className='shadow p-3 rounded-3'>
                <h3>Courses</h3>
                <hr />
                <div className="row">
                    {content}
                </div>
            </div>
        </Fragment>
    )
}

export default ListOfCourses;