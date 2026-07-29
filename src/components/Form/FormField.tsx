/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { ChangeEvent } from 'react';
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
  checked,
  onClick,
  id,
  ref,
}: InputFieldType) {
  function handleOnchange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
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
        aria-describedby={`${name}-error-message`}
        ref={ref}
      />
      {name && errors && errors[name] && (
        <span
          id={`${name}-error-message`}
          aria-live="assertive"
          className="text-red-400 px-2"
          style={{ fontSize: '12px' }}
        >
          {errors[name]}
        </span>
      )}
    </>
  );
}

export default FormField;
