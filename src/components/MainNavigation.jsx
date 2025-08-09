import {NavLink, useNavigate} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/Hooks";
import { authInfoActions } from "../store/ducks/auth/AuthInfoSlice";

import classes from './styles/MainNavigation.module.css';

function MainNavigation({authInfo} ) {
    const isLogin = useAppSelector((state) => state.authInfo.isLogin);

    const github_id = useAppSelector( state => {
            if ( state.authInfo.signUpUserData !== null ) {
                return state.authInfo.signUpUserData.githubId;
            } else {
                return null;
            }
        }
    );

    let token = isLogin;
    if ( token === null ) {
        token = github_id;
    }

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(authInfoActions.logout());
        navigate('/');
    }

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to='/'
                            className={({isActive}) => isActive ? classes.active : undefined}
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li><NavLink to='/managers' className={({isActive}) => isActive ? classes.active : undefined}>Managers</NavLink></li>
                    <li><NavLink to='/clients' className={({isActive}) => isActive ? classes.active : undefined}>Clients</NavLink></li>
                    <li><NavLink to='/caregivers' className={({isActive}) => isActive ? classes.active : undefined}>CareGivers</NavLink></li>
                </ul>
            </nav>
            <span className={classes.active} onClick={logoutClickHandler}>
                Logout
            </span>
        </header>
    );
}

export default MainNavigation;

