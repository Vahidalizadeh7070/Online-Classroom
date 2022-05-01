import { Fragment, useState, useCallback, useEffect } from "react"
import TeacherItem from './TeacherItem';
const ListOfCourses = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [teacher, setTeacher] = useState([]);

    const retrieveTeachers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://vahidalizadeh7070.ir/api/Teachers');
            if (!response.ok) {
                throw new Error('Something went wrong!!!');
            }
            const data = await response.json();
            const loadTeachers = [];
            for (const key in data.$values) {

                loadTeachers.push(
                    {
                        id: data.$values[key].id,
                        fullName: data.$values[key].fullName,
                        age: data.$values[key].age,
                        education: data.$values[key].education
                    }
                );
            }

            setTeacher(loadTeachers);
        }
        catch (error) {
            setError(error.message);

        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        retrieveTeachers();
    }, [retrieveTeachers])

    let content = <p className='fs-4 text-center'>There is no teacher in the list.</p>;
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
    if (teacher.length > 0) {
        content = (
            teacher.map(teachers =>
                <TeacherItem
                    id={teachers.id}
                    key={teachers.id}
                    fullName={teachers.fullName}
                    age={teachers.age}
                    education={teachers.education}
                />
            )
        )
    }


    return (
        <Fragment>
            <div className='shadow p-3 rounded-3'>
                <h3>Teachers</h3>
                <hr />
                <div className="row">
                    {content}
                </div>
            </div>
        </Fragment>
    )
}
export default ListOfCourses;