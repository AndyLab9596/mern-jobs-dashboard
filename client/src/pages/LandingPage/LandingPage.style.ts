import styled from 'styled-components';

const LandingWrapper = styled.div`
    .navbar {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: var(--nav-height);
        max-width: var(--max-width);
        width: var(--fluid-width);
        margin: 0 auto;  
    }

    .landing__body {
        @media (min-width: 992px) {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 3rem;
        }

        min-height: calc(100vh - var(--nav-height));
        display: grid;
        align-items: center;
        margin-top: -3rem;

        &__content {
            h1 {
                font-weight: 700;
                margin-top: 0;
                font-size: 3.052rem;
                text-transform: capitalize;
                margin: 0 0 1.38rem;
                line-height: 1.3;
                letter-spacing: var(--letterSpacing);

                span {
                    color: var(--primary-500);
                }
            }

            p {
                color: var(--grey-600);
            }

            .btn-hero {
                font-size: 1.25rem;
                padding: 0.5rem 1.25rem;
                &:hover {
                    background-color: var(--primary-700);
                    box-shadow: var(--shadow-3);
                }
            }

        }   

        &__img {
            @media (min-width: 992px) {
                display: block;
            }
            object-fit: cover;
            width: 100%;
            display: none;
        }

    }
`;

export default LandingWrapper;