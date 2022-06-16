import React from 'react';
import NotFoundWrapper from './NotFoundStyle.style';
import NotFoundImg from '../../assets/images/not-found.svg';
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <NotFoundWrapper>
      <div>
        <img src={NotFoundImg} alt='404' />
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/" >Back Home</Link>
      </div>
    </NotFoundWrapper>
  )
}

export default NotFoundPage