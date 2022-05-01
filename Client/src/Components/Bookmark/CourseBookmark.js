import React,{ Fragment, useEffect, useState } from "react"
import { BookmarkFill, ThreeDots } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const CourseBookmark = props => {
    const [bookmarkList, setBookmarkList] = useState([]);
    const bookmarkCourse = JSON.parse(localStorage.getItem('course'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
        if (bookmarkCourse !== null) {
            setBookmarkList(bookmarkCourse);
        }
    }, [bookmarkCourse])

    const bookmarkHandler = (id) => {
        const x = bookmarkCourse.filter(item => item.id !== id);
        localStorage.removeItem('course');
        localStorage.setItem('course', JSON.stringify(x));
        setBookmarkList(x);
    }

    let content;

    if (bookmarkList.length > 0) {
        content = (
            bookmarkList.map(item => {
                return (
                    <ol className="list-group mb-3 rounded-3" key={item.id}>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{item.title}</div>
                                Level: {item.level}
                            </div>
                            <button className="btn rounded-circle border border-1 btn-sm pb-2 mx-1" onClick={() => bookmarkHandler(item.id)}><BookmarkFill /></button>
                            <Link className="btn rounded-circle border border-1 btn-sm pb-2" to={"./courseDetails/"+ item.id}><ThreeDots/></Link>
                        </li>
                    </ol>

                )
            })
        )
    }
    if(bookmarkList.length ===0) {

        content = <p className="text-danger text-center">There is no item in your bookmark list</p>;
    }
    return (
        <Fragment>
            <div className="shadow rounded-3">
                <div className="p-3">
                    <h3><BookmarkFill /> Bookmark</h3>
                    <hr />
                    {isLoading &&
                        (
                            <div className="d-flex justify-content-center mt-5 mb-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    {content}
                </div>
            </div>

        </Fragment>
    )
}

export default CourseBookmark;