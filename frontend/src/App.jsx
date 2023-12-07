import {Outlet} from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { Toaster } from "sonner";

const App = () => {
    return (
        <>
            <ScrollToTop>
                <Toaster />
                <main>
                    <Outlet />
                </main>
            </ScrollToTop>
        </>
    );
};

export default App;