import styled from 'styled-components';

const NotFoundWrapper = styled.div`
    min-height: 100vh;
    display: grid;
    place-items: center;
    text-align: center;

    img {
        max-width: 600px;
        display: block;
        margin-bottom: 2rem;
    }

    h3 {
        margin-bottom: 0.5rem;
    }

    p {
        color: var(--grey-500);
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    a {
        color: var(--primary-500);
        text-decoration: underline;
        text-transform: capitalize;
    }
`

export default NotFoundWrapper