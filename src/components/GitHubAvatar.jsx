import React from 'react';
import { useSelector } from "react-redux";

const GitHubAvatar = () => {

    const avatar_url = useSelector( state => {
            if ( state.authInfo.signUpUserData !== null ) {
                return state.authInfo.signUpUserData.githubAvatarUrl
            } else {
                return null;
            }
        }
    );

    return (
        <>
            { avatar_url && <img
                src={ avatar_url }
                alt="Profile"
                style={ styles.profileImage }
            /> }
        </>
    );
}

export default GitHubAvatar;

const styles = {
    profileImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginLeft: '1rem',
        objectFit: 'cover',
    },
};
