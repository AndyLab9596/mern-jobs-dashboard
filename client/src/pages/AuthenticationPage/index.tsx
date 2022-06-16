import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Logo } from '../../components';
import { FormRow } from '../../components/';
import { useAppContext } from '../../context/appContext';
import AuthWrapper from './Authentication.style';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true
}

const AuthenticationPage = () => {
    const { displayAlert, showAlert, setupUser, user, isLoading } = useAppContext()
    const navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return;
        }
        const currentUser = isMember ? { email, password } : { email, password, name };
        if (isMember) {
            setupUser({
                currentUser,
                endPoint: 'login',
                alertText: 'Login Successful! Redirecting...'
            })
        } else {
            setupUser({
                currentUser,
                endPoint: 'register',
                alertText: 'User created! Redirecting...'
            })
        }
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    return (
        <AuthWrapper>
            <form className='form' onSubmit={handleSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}
                {!values.isMember && (
                    <FormRow name='name' type={'text'} label='Name' value={values.name} handleChange={handleChange} />
                )}
                <FormRow name='email' type={'email'} label='Email' value={values.email} handleChange={handleChange} />
                <FormRow name='password' type={'password'} label='password' value={values.password} handleChange={handleChange} />
                <button type='submit' className='btn btn-block' disabled={isLoading} >
                    Submit
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member'}
                    {" "}
                    <button type='button' className='member-btn' onClick={() => toggleMember()} >
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </AuthWrapper>
    )
}

export default AuthenticationPage