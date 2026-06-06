import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Navigation from "../Navigation/Navigation"
import {useAnalyticsData, useGetData} from "../../utils/Utils"

function Home(){
  // Queries
    const { isPending, error } = useGetData();
    const { } = useAnalyticsData();

   
       if (isPending) return 'Loading...'
   
       if (error) return 'An error has occurred'
    return(
        <div className="md:flex md:flex-col md:h-screen  bg-slate-100">
            <Header/>
        <div className="flex-col md:flex md:flex-row md:flex-1 ">
            <Navigation/>
            <Outlet/>
        </div>
            <Footer/>
        </div>
    )

}

export default Home