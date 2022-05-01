import React,{ Fragment } from "react"
import { Calendar, List } from "react-bootstrap-icons";
import Moment from 'moment';

const RoomInformation = props => {
    console.log(props.info)
    return (
        <Fragment>
            <div className="col-md-6 col-12">
                <div className="shadow rounded-3">
                    <div className="p-3">
                        <h3>Room information</h3>
                        <hr />
                        <div className="pb-2">
                            <label className="text-secondary">Title</label>
                            <p className="small p-2">{props.info.courseName}</p>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label className="text-secondary pb-2">Registeration date</label>
                                <p className="small"><Calendar /> {Moment(props.info.registerDate).format('dddd - DD MMMM yyyy')}</p>
                            </div>
                            <div className="col-6">
                                <label className="text-secondary pb-2">level</label>
                                <p className="small"><List />{props.info.level}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RoomInformation;