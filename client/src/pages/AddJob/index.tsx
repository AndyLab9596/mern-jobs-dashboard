import React, { ChangeEvent, SyntheticEvent } from 'react';
import { Alert, FormRow } from '../../components';
import FormRowSelect from '../../components/FormRowSelect';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../Styles/DashboardFormPage.style';

const AddJob = () => {
  const {
    isEditing,
    isLoading,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob

  } = useAppContext();

  // const newJobType = removeItem([...jobTypeOptions], 'all')
  // console.log(newJobType)

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    handleChange({ name, value })
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return
    }

    if (isEditing) {
      editJob();
      return;
    };

    createJob()
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type={'text'}
            name='position'
            label='Position'
            value={position}
            handleChange={handleChangeInput}
          />
          <FormRow
            type={'text'}
            name='company'
            label='Company'
            value={company}
            handleChange={handleChangeInput}
          />
          <FormRow
            type={'text'}
            name='jobLocation'
            label='Job Location'
            value={jobLocation as string}
            handleChange={handleChangeInput}
          />

          <FormRowSelect
            label='Status'
            name='status'
            value={status}
            list={statusOptions}
            handleChange={handleChangeInput}
          />

          <FormRowSelect
            label='Job type'
            name='jobType'
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleChangeInput}
          />

          <div className="btn-container">
            <button className='btn btn-block submit-btn'
              type='submit'
              disabled={isLoading}
            >
              submit
            </button>
            <button className='btn btn-block clear-btn'
              type='button'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob