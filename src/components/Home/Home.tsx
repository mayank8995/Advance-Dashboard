import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Navigation from "../Navigation/Navigation"
import {useAnalyticsData, useGetData, usePerformanceCardData} from "../../utils/Utils"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import { useEffect } from "react"

function Home(){
  // Queries
    const { isPending, error } = useGetData();
    const { } = useAnalyticsData();
    const { } = usePerformanceCardData();

    useEffect(() =>{
         const root = document.documentElement;
        console.log("Localstirage>>>", localStorage.getItem("theme"))
        if(localStorage.getItem("theme") === 'dark')
        {
            root.setAttribute('data-theme', 'dark');
        }
    },[])
   
       if (isPending) return 'Loading...'
   
       if (error) return 'An error has occurred'
    return(
        <ErrorBoundary fallback={<div>Failed to load</div>}>
        <div className="md:flex md:flex-col md:h-full bg-slate-100">
            <Header/>
        <div style={{background: `linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f5f3ff 100%)`}} className=" bg-amber-50 flex-col md:flex md:flex-row md:flex-1 h-full md:overflow-hidden dark:bg-gray-800">
            <Navigation/>
            <div className="flex-1 overflow-y-auto dark:bg-gray-800">
            <Outlet/>
            </div>
        </div>
            {/* <Footer/> */}
        </div>
        </ErrorBoundary>
    )

}

export default Home