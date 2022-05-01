import React,{ Fragment, useState, useEffect } from "react";
import {  ArrowLeftShort } from "react-bootstrap-icons";

const UserProfileForm = props => {
    const [about, setAbout] = useState('');
    const [tel, setTel] = useState('');
    const [twitter, setTwitter] = useState('');
    const [facebook, setFacebook] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (props.isEdit) {
            setAbout(props.userProfileEdit.about);
            setTel(props.userProfileEdit.phoneNumber);
            setTwitter(props.userProfileEdit.twitterAccount);
            setFacebook(props.userProfileEdit.facebookAccount);
        }
        if(!message)
        {
            setTimeout(()=>{
                setMessage('');
            },3000)
        }
    }, [message, props.isEdit, props.userProfileEdit.about, props.userProfileEdit.phoneNumber, props.userProfileEdit.twitterAccount, props.userProfileEdit.facebookAccount])

    const aboutHandler = event => {
        setAbout(event.target.value);
    }
    const telHandler = event => {
        setTel(event.target.value);
    }
    const twitterHandler = event => {
        setTwitter(event.target.value);
    }
    const facebookHandler = event => {
        setFacebook(event.target.value);
    }

    const ShowEditForm = (event) => {
        event.preventDefault();
        props.isEdit();
    }

    const StoreInfo = event => {
        let url = 'https://vahidalizadeh7070.ir/api/UserProfiles/';
        let method = '';
        let UserProfile = {};
        if (props.isEdit) {
            UserProfile = {
                id: props.userProfileEdit.id,
                email: props.email,
                about: about,
                phoneNumber: tel,
                twitterAccount: twitter,
                facebookAccount: facebook
            }
            method = 'PUT';
        }
        else {
            UserProfile = {
                email: props.email,
                about: about,
                phoneNumber: tel,
                twitterAccount: twitter,
                facebookAccount: facebook
            }
            method = 'POST'
        }

        event.preventDefault();
        setIsLoading(true);
        setMessage('');

        fetch(url,
            {
                method: method,
                body: JSON.stringify(UserProfile),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            if (res.ok) {

                // do something with login 
                // You can redirect or show a string message
                if (props.isEdit) {
                    setMessage('Your profile has been updated successfully.');
                }
                else {
                    setMessage('You have created profile successfully.');
                }
                
                setIsLoading(false);
                props.ChangeStateOfForm();
                return res.json();
            }
            else {
                return res.json().then((data) => {
                    let errorMessage = 'There is an error';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                });
            }
        }).catch((error) => {
            setIsLoading(false);
            setError(error.message);
        });
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-10">
                    <h3>{!props.isEdit ? "New Profile" : "Edit Profile"}</h3>
                    {!props.isEdit && <small className="text-secondary fw-light">Please fill all information in your profile. This makes you provide the necessary information to register for a course.</small>}
                </div>
                <div className="col-2">
                    {props.isEdit && <button className="btn btn-light border border-1 rounded-circle float-end" onClick={ShowEditForm}><ArrowLeftShort size={20}/></button>}
                </div>
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            <hr />
            {props.isEdit && message && <p className="text-danger text-center">{message}</p>}
            {isLoading && (
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {!isLoading && (
                <form onSubmit={StoreInfo}>
                    <div className="row">
                        <div className="col-12 pb-3">
                            <textarea type="text" className="form-control" value={about} onChange={aboutHandler} placeholder="Write about yourself" />
                        </div>
                        <div className="col-4 pb-3">
                            <input type="tel" className="form-control" value={tel} onChange={telHandler} placeholder="604-509-69955" />
                        </div>
                        <div className="col-4 pb-3">
                            <input type="text" className="form-control" value={twitter} onChange={twitterHandler} placeholder="Twitter account" />
                        </div>
                        <div className="col-4 pb-3">
                            <input type="text" className="form-control" value={facebook} onChange={facebookHandler} placeholder="Facebook account" />
                        </div>
                        <div className="pb-2">
                            <button className="btn btn-primary rounded-3 shadow float-end">
                                {isLoading ? (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                ) : "Save"}
                            </button>

                        </div>
                    </div>
                </form>
            )}
        </Fragment>
    )
}

export default UserProfileForm;