import { redirect } from "react-router-dom";

import { store } from "../store/store";
import { authInfoActions } from "../store/ducks/auth/AuthInfoSlice.ts";

function LogoutAction() {
    localStorage.removeItem('token');
    store.dispatch( authInfoActions.setGithubId( null ) );
    store.dispatch( authInfoActions.setGithubAvatarUrl( null ) );

    return redirect('/');
}

export default LogoutAction;
