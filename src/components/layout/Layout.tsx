import { Outlet } from "react-router-dom";
import HeaderNav from "./nav/HeaderNav";

// outlet component has pages injected dynamically
export function Layout() {
    return(
        <>
            <HeaderNav />
            <Outlet />
            
        </>
    )
}