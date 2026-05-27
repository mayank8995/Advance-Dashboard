import Dashboard from "../../../pages/dashboard/Dashboard"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Navigation from "../Navigation/Navigation"

function Home(){
console.log("DGSGS")
    return(
        <div className="block md:flex">
        <Navigation/>
        <div className="min-w-full ">
        <Header/>
        <Dashboard/>
        <Footer/>
        </div>
        </div>
    )

}

export default Home