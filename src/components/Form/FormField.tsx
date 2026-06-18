import { className as defaultClass } from "../../utils/constants"


function FormField({type, placeholder,name,onChange,className, value,errors,maxlength,style }: {type?: string, placeholder?: string, name?: string, onChange?: any, className?: string, value?:any, errors?:any, maxlength?:number, style?:any}) {
    return <>
    <input style={style} maxLength={maxlength} value={value} type={type || "text"} name={name || "text"}  onChange={onChange} className={className || defaultClass} placeholder={placeholder} />
            {name && errors && errors[name] && <span style={{ color: "red", fontSize: "12px" }}>{errors[name]}</span>}
    </>
}

export default FormField