import styled from "styled-components";

import ProfileHeader from "../../components/Profile/Header/ProfileHeader";

const Layout = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    background-color: #fafafa;

    .container {
        flex-grow: 1;
        margin: 0 auto 30px;
        max-width: 935px;
    }

    @media (min-width: 736px) {
        .container {
            padding: 30px 20px 0;
            width: calc(100% - 40px);
            box-sizing: content-box;
        }
    }
`;

const Profile = () => {

    return (
        <Layout>
            <div className="container">
                <ProfileHeader />
            </div>
        </Layout>
    );
}

export default Profile;
