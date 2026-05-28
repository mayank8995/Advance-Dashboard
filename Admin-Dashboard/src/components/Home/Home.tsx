import { Outlet, Route, Routes,  useNavigate } from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Navigation from "../Navigation/Navigation"

function Home(){
    return(
        <div className="md:flex md:flex-col md:h-screen md:overflow-hidden bg-slate-100">
            <Header/>
        <div className="flex-col md:flex md:flex-row md:flex-1 md:overflow-hidden">
            <Navigation/>
            <Outlet/>
        </div>
            <Footer/>
        </div>
    )

}

export default Home