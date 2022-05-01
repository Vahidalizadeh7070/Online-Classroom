import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Bookmark, BookmarkFill, PeopleFill, PlusLg } from "react-bootstrap-icons";
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Toasts from "../Toast/Toasts";

const CourseDetails = props => {
    const context = useContext(AuthContext);
    const [isBookMark, setIsBookMark] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isLoad, setIsLoad] = useState(false);

    const bookMarkedValue = JSON.parse(localStorage.getItem('course'));


    const onClose = () => {
        setShowToast(false);
        setToastMessage('');
    }

    useEffect(() => {
        if (bookMarkedValue !== null) {
            bookMarkedValue.forEach(element => {
                if (element.id === props.course.id) {
                    setIsBookMark(true);
                }
            });
        }
    }, [bookMarkedValue, props.course.id])

    const AddToBookmark = useCallback(() => {
        const newValue = {
            id: props.course.id,
            title: props.course.title,
            level: props.course.level
        }

        if (bookMarkedValue !== null) {
            if (isBookMark) {
                const x = bookMarkedValue.filter((item => item.id !== props.course.id));
                localStorage.setItem('course', JSON.stringify(x));
                setIsBookMark(false);
                setToastMessage('Remove Bookmark. This course removed from your profile.');
            }
            else {
                localStorage.setItem('course', JSON.stringify([...bookMarkedValue, newValue]));
                setIsBookMark(true);
                setToastMessage('Add Bookmark. You can see this course in your profile.');
            }
        }
        else {
            localStorage.setItem('course', JSON.stringify([newValue]));
            setIsBookMark(true);

            setToastMessage('Add Bookmark. You can see this course in your profile.');
        }
        setShowToast(true);
    }, [props.course.id, props.course.level, props.course.title, isBookMark, bookMarkedValue])

    const RegisterCourse = (event) => {
        event.preventDefault();
        setIsLoad(true);

        let url = "https://vahidalizadeh7070.ir/api/userCourses/";
        let method = 'POST';
        let UserCourses = {};
        UserCourses = {
            email: context.email,
            courseId: props.course.id
        }
        fetch(url,
            {
                method: method,
                body: JSON.stringify(UserCourses),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {
                setShowToast(true);
                setToastMessage('Your course has been added to your list successfully. Please wait to confirm the registeration.\n All of information about this course will be demonstrated in your profile.');
                setIsLoad(false);
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    let errorMessage;
                    if (data.status === 405) {
                        errorMessage = 'You can not add this course, because it is already registered. \n Please contact with admin to remove it from your list';
                    }
                    if (data.status === 404) {
                        errorMessage = 'You can not add this course, because you are not logged in';
                    }
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                });
            }
        }).catch((error) => {
            setShowToast(true);
            setIsLoad(false);
            setToastMessage(error.message);
        });
    }



    return (
        <Fragment>
            <div className="shadow rounded-3">
                {showToast && <Toasts message={toastMessage} onClose={onClose} show={showToast} status="Add" />}
                <div className="p-4">
                    <div className="row">
                        <h4 className="text-secondary fw-light">Basic information</h4>
                        <div className="col-4">
                            <p>Title</p>
                            {props.course.title}
                        </div>
                        <div className="col-4">
                            <p>Level</p>
                            {props.course.level}
                        </div>
                        <div className="col-4">
                            <p>Teacher</p>
                            {props.course.teacher}
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow rounded-3 mt-3">
                <div className="p-4">
                    <div className="row">
                        <h4 className="text-secondary fw-light">Specific information about the {props.course.title}</h4>
                        <div className="col-12 pb-5">
                            <p>About</p>
                            {props.course.about}
                        </div>
                        <center className="col-4">
                            <p>Capacity</p>
                            {props.course.capacity} <PeopleFill size={15} />
                        </center>
                        <center className="col-4">
                            <p>Start date</p>
                            {props.course.start}
                        </center>
                        <center className="col-4">
                            <p>End date</p>
                            {props.course.end}
                        </center>
                    </div>
                    <div className="pb-5 pt-5">
                        <button className="btn float-end border border-1 shadow rounded-3" onClick={AddToBookmark}>{!isBookMark ? <Bookmark size={22} className="text-black" /> : <BookmarkFill size={22} />}</button>
                        {context.isLoggedIn && <button className="btn float-end border border-1 shadow rounded-3 mx-2" onClick={RegisterCourse}>
                            {
                                isLoad ? (
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) :
                                    <PlusLg size={22} className="text-black" />
                            }
                        </button>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CourseDetails;