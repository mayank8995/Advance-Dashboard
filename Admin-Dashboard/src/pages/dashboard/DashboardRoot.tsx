import { Outlet } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumbs";

export function DashboardRoot(){

    return <>
    {/* <Breadcrumb /> */}
        <Outlet />
    </>
}