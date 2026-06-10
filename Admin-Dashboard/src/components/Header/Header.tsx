import { UserStar } from "lucide-react"
import Toggle from "../Toggle/Toggle"

function Header(){



    return(
        <>
        <header className="h-14 min-h-14 bg-white border-b border-slate-200 flex items-center px-5 gap-3 z-10">
            <Toggle/>
            <div>
            {/* <UserStar /> */}
            {/* <h1 className="dark:text-amber-50">Header</h1> */}
            </div>
        </header>
        </>
    )

}

export default Header