import { className as defaultClass } from "../../utils/constants"


function FormField({type, placeholder,name,onChange,className, defaultValue}: {type?: string, placeholder?: string, name?: string, onChange?: any, className?: string, defaultValue?: Date | string | undefined}) {
    return <>
    <input type={type || "text"} name={name || "text"} defaultValue={defaultValue instanceof Date ? defaultValue.toISOString() : defaultValue ?? ""} onChange={onChange} className={className || defaultClass} placeholder={placeholder} />
    </>
}

export default FormField