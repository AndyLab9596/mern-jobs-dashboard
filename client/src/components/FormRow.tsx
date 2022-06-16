import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styled from 'styled-components';

interface IFormRowProps {
    name: string;
    label?: string;
    type: HTMLInputTypeAttribute;
    value: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputElement = styled.div`
    margin-bottom: 1rem;
    .form-label {
        display: block;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        text-transform: capitalize;
        letter-spacing: var(--letterSpacing);
    }

    .form-input {
        height: 35px;
        width: 100%;
        padding: 0.35rem 0.75rem;
        border-radius: var(--borderRadius);
        background-color: var(--grey-50);
        border: 1px solid var(--grey-200);
    }
`

const FormRow : React.FC<IFormRowProps>= ({name, label, type, value, handleChange }) => {
  return (
    <InputElement>
        <label htmlFor={name} className="form-label">
            {label || name}
        </label>
        <input type={type} value={value} name={name} onChange={handleChange} className="form-input" />
    </InputElement>
  )
}

export default FormRow