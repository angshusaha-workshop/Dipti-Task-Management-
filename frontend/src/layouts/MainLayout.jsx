import { Outlet } from "react-router";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;