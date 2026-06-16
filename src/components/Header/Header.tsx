import { UserStar } from "lucide-react"
import Toggle from "../Toggle/Toggle"
import { ADMIN_PORTAL } from "../../utils/constants"

function Header(){



    return(
        <>
        <header className="h-14 min-h-14 bg-white border-b border-slate-200 flex items-center sm:justify-start md:justify-between px-5 gap-3 z-10 dark:dark:bg-slate-950 dark:border-slate-700">
            <h1 className="font-bold text-slate-800 dark:text-slate-100">{ADMIN_PORTAL}</h1>
            <Toggle/>
        </header>
        </>
    )

}

export default Header