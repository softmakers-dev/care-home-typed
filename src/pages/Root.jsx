import {Outlet} from "react-router-dom";
// import Header from "../components/Header";
import Header from "../components/common/Header";

function RootLayout() {

    return (
        <>
            <Header />
            <main style={{ paddingTop: '54px' }}>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
