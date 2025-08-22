import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ManagersPage from "./pages/main/Managers";
import ClientsPage from "./pages/main/Clients";
import CareGiversPage from "./pages/main/CareGivers";
import ErrorPage from "./pages/Error";
import AuthenticationPage from "./pages/Authentication";
import Profile from "./pages/profile/Profile";
import { useAppSelector } from "./store/Hooks";
import Edit from "./pages/Edit/Edit";


// const oldRouter = createBrowserRouter([
//     {
//         path: '/',
//         element: <AuthenticationPage />,
//         id: 'auth',
//         loader: authInfoLoader,
//     },
//     {
//         path: '/apis/auth/callback',
//         element: <GitHubCallback />
//     },
//     {
//         path: '/main',
//         element: <RootLayout />,
//         id: 'root',
//         errorElement: <ErrorPage />,
//         loader: authInfoLoader,
//         children: [
//             { path: '', element: <HomePage /> },
//             { path: 'managers', element: <ManagersPage /> },
//             { path: 'clients', element: <ClientsPage /> },
//             { path: 'caregivers', element: <CareGiversPage /> },
//             { path: 'logout', action: LogoutAction },
//         ]
//     }
// ]);

const Router = () => {
    const isLogin = useAppSelector((state) => state.authInfo.isLogin);

    return (
        <>
            <BrowserRouter >
                {!isLogin ? (
                    <Routes>
                        <Route path='/' element={ <AuthenticationPage router="signIn" /> } />
                        <Route path='/accounts/emailsignup' element={ <AuthenticationPage router="signUp" /> } />
                        <Route path='/accounts/login' element={ <AuthenticationPage router="signIn" />} />
                        <Route path='*' element={<Navigate to="/" replace />} />
                    </Routes>
                ): (
                    <Routes>
                        <Route path='/' element={ <RootLayout /> }>
                            <Route index element={ <HomePage /> }/>
                            <Route path='managers' element={ <ManagersPage /> }/>
                            <Route path='clients' element={ <ClientsPage /> }/>
                            <Route path='caregivers' element={ <CareGiversPage /> }/>
                            <Route path='error' element={ <ErrorPage /> }/>
                            <Route path='accounts/edit' element={ <Edit /> } />
                            <Route path='profile/:username' element={ <Profile /> }/>
                            <Route path='*' element={<Navigate to="/" replace />} />
                        </Route>
                    </Routes>
                )}
            </BrowserRouter>
        </>
    );
}

export default Router;
