import type { InputFieldType } from '../../types/types';
import { className as defaultClass } from '../../utils/constants';

function FormField({
  type,
  placeholder,
  name,
  onChange,
  className,
  value,
  errors,
  maxlength,
  style,
  data,
  checked,
  onClick,
  id,
}: InputFieldType) {
  function handleOnchange(e: any) {
    name && data
      ? onChange?.({ ...data, [name]: e.target.value }, name)
      : onChange?.(e);
  }
  return (
    <>
      <input
        style={style}
        maxLength={maxlength}
        value={value}
        type={type || 'text'}
        name={name || 'text'}
        onChange={handleOnchange}
        className={className || defaultClass}
        placeholder={placeholder}
        checked={checked}
        onClick={onClick}
        id={id}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
      {name && errors && errors[name] && (
        <span className="text-red-400 px-2" style={{ fontSize: '12px' }}>
          {errors[name]}
        </span>
      )}
    </>
  );
}

export default FormField;
