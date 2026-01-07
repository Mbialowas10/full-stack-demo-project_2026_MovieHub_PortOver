import { Outlet } from "react-router-dom";
import HeaderNav from "./nav/HeaderNav";
import Footer from "./footer/Footer";

/**
 *  Layout - A template structure for all pages in website to follow
 *  ie. each page has a HeaderNav bar at top of page
 * @returns 
 */
// outlet component has pages injected dynamically
export default function Layout() {
    return(
        <>
            {/* HeaderNav applied to all pages in website */}
            <HeaderNav />
            {/* Outlet is where components get loaded into. */}
            <Outlet />
            <Footer />
        </>
    )
}