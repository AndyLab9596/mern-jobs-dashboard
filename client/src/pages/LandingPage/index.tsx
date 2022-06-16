import React from 'react';
import { Link } from 'react-router-dom';
import LandingMainImg from '../../assets/images/main.svg';
import { Logo } from '../../components/';
import LandingWrapper from './LandingPage.style';
const LandingPage = () => {
    return (
        <LandingWrapper>
            <nav className='navbar'>
                {/* Logo */}
                <Logo/>
            </nav>
            {/* Content */}
            <div className='container landing__body'>
                <div className="landing__body__content">
                    <h1>
                        Job <span>Tracking</span> App
                    </h1>
                    <p>
                    I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin coffee chia. Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch narwhal.
                    </p>
                    <Link to="/auth" className='btn btn-hero' >
                        Login/Register
                    </Link>
                </div> 
                {/* Landing img */}
                <img className='landing__body__img' src={LandingMainImg} alt="main"/>
            </div>
        </LandingWrapper>
    )
}

export default LandingPage  