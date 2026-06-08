import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Navigation from "../Navigation/Navigation"
import {useAnalyticsData, useGetData} from "../../utils/Utils"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"

function Home(){
  // Queries
    const { isPending, error } = useGetData();
    const { } = useAnalyticsData();

   
       if (isPending) return 'Loading...'
   
       if (error) return 'An error has occurred'
    return(
        <ErrorBoundary fallback={<div>Failed to load</div>}>
        <div className="md:flex md:flex-col md:h-full bg-slate-100">
            <Header/>
        <div className="flex-col md:flex md:flex-row md:flex-1 h-full md:overflow-hidden">
            <Navigation/>
            <div className="flex-1 overflow-y-auto">
            <Outlet/>
            </div>
        </div>
            <Footer/>
        </div>
        </ErrorBoundary>
    )

}

export default Home