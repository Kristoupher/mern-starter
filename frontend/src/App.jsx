import {Outlet} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
    return (
        <>
            <ScrollToTop>
                <main>
                    <Outlet />
                </main>
            </ScrollToTop>
        </>
    );
};

export default App;