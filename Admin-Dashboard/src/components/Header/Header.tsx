import Toggle from "../Toggle/Toggle"

function Header(){



    return(
        <>
        <header className="h-14 min-h-14 bg-white border-b border-slate-200 flex items-center px-5 gap-3 z-10">
            <h1 className="dark:text-amber-50">Header</h1>
            <Toggle/>
        </header>
        </>
    )

}

export default Header