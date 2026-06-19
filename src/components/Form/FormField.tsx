import { className as defaultClass } from "../../utils/constants"


function FormField({type, placeholder,name,onChange,className, value,errors,maxlength,style,data }: {type?: string, placeholder?: string, name?: string, onChange?: any, className?: string, value?:any, errors?:any, maxlength?:number, style?:any, data?:any}) {
    function handleOnchange(e: any){
        name && data ? onChange({ ...data, [name]: e.target.value },name) : onChange(e)
    }
    return <>
    <input style={style} maxLength={maxlength} value={value} type={type || "text"} name={name || "text"}  onChange={handleOnchange} className={className || defaultClass} placeholder={placeholder} />
            {name && errors && errors[name] && <span style={{ color: "red", fontSize: "12px" }}>{errors[name]}</span>}
    </>
}

export default FormField