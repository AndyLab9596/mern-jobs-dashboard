import React, { SyntheticEvent, useState } from 'react';
import { Alert, FormRow } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../Styles/DashboardFormPage.style';

const Profile = () => {

  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();

  const [name, setName] = useState(user?.name as string);
  const [lastName, setLastName] = useState(user?.lastName as string);
  const [email, setEmail] = useState(user?.email as string);
  const [location, setLocation] = useState(user?.location as string);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!name || !lastName || !email || !location) {
      displayAlert();
      return
    }
    const currentUser = { name, lastName, location, email };
    const alertText = 'Update user successfully !!!'
    updateUser({ currentUser, alertText });
  }


  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type={'text'}
            name='name'
            label='Name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type={'text'}
            name='lastName'
            label='Last Name'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type={'text'}
            name='email'
            label='Email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type={'text'}
            name='location'
            label='Location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading} >
            {isLoading ? 'Please wait ...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile