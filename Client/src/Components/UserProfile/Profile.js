import React,{ Fragment, useContext, useState, useEffect, useCallback } from "react"
import AuthContext from "../../store/auth-context";
import UserCoursesRegistered from "./UserCoursesRegistered";
import UserProfileForm from "./UserProfileForm";
import UserProfileInformation from './UserProfileInformation';

const Profile = props => {
    const context = useContext(AuthContext);
    const email = context.email;

    const [userProfileExist, setUserProfileExist] = useState(true);
    const [userProfile, setUserProfile] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const EditForm = () => {
        if (isEdit) {
            setIsEdit(false);
        }
        else {
            setIsEdit(true);
        }
    }

    const RetrieveProfile = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://vahidalizadeh7070.ir/api/UserProfiles/' + email);
            if (!response.ok) {
                setIsLoading(false);
                setUserProfileExist(false);
                return;
            }
            const data = await response.json();

            setUserProfile({
                id: data.id,
                email: data.email,
                about: data.about,
                phoneNumber: data.phoneNumber,
                twitterAccount: data.twitterAccount,
                facebookAccount: data.facebookAccount
            });
            setUserProfileExist(true);
        }
        catch {
            setError('Something went wrong');
        }
        setIsLoading(false);
    }, [email]);

    useEffect(() => {
        RetrieveProfile();
    }, [RetrieveProfile])

    let content;

    content = (
        <Fragment>
            {
                !userProfileExist && <UserProfileForm userProfileEdit={userProfile} ChangeStateOfForm={RetrieveProfile} email={email} />
            }
            {
                isEdit && userProfileExist && <UserProfileForm isEdit={EditForm} userProfileEdit={userProfile} ChangeStateOfForm={RetrieveProfile} email={email} />
            }
            {
                !isEdit && userProfileExist && (<UserProfileInformation EditForm={EditForm} error={error} isLoading={isLoading} userProfile={userProfile} email={email} changeState={RetrieveProfile} />)
            }
        </Fragment>
    )


    return (
        <Fragment>
            <div className="shadow p-3 rounded-3 mb-3">
                {content}
            </div>
            <div className="shadow p-3 rounded-3 mb-3 mt-5">
                <UserCoursesRegistered />
            </div>
        </Fragment>
    )
}

export default Profile;