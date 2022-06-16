import React, { ChangeEvent } from 'react'
import { JobStatus, JobStatusTuple, JobType, JobTypeTuple, SortType, SortTypeTuple } from '../models/jobModel';

interface IFormRowSelect {
    label: string;
    name: string;
    value: JobStatus | JobType | SortType;
    list: JobStatusTuple | JobTypeTuple | SortTypeTuple;
    handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const FormRowSelect: React.FC<IFormRowSelect> = ({ label, name, value, handleChange, list }) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {label}
            </label>
            <select name={name}
                value={value}
                onChange={handleChange}
                className='form-select'
            >
                {list.map((item, index) => {
                    return (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default FormRowSelect