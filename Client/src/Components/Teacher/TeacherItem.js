import { Fragment } from "react"

const TeacherItem = props =>{
    console.log(props)
    return (
        <Fragment>
            <div className="col-lg-6 pb-3">
                <div className="card rounded-3 h-100">
                    <div className="card-body">
                        <h5 className="card-title">{props.fullName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            Age: <small className="text-secondary">{props.age}</small> |
                            Education: <small className="text-secondary">{props.education}</small>
                        </h6>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default TeacherItem;