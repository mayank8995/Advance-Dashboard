

function FormField({type, placeholder,name,onChange,className}: {type?: string, placeholder?: string, name?: string, onChange?: any, className?: string}){
    return <>
    <input type={type || "text"} name={name || "text"} onChange={onChange} className={className || "border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"} placeholder={placeholder} />
    </>
}

export default FormField