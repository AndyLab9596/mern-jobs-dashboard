import styled from "styled-components";

interface IWrapper {
    color: string,
    bcg: string
}

const Wrapper = styled.article<IWrapper>`
    padding: 2rem;
    background-color: #fff;
    border-radius: var(--borderRadius);
    border-bottom: 5px solid ${props => props.color};

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .count {
        display: block;
        font-weight: 700;
        font-size: 50px;
        color: ${props => props.color}
    }

    .icon {
        width: 70px;
        height: 60px;
        background-color: ${props => props.bcg};
        border-radius: var(--borderRadius);
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            font-size: 2rem;
            color: ${props => props.color}
        }
    }

    .title {
        margin: 0;
        text-transform: capitalize;
        letter-spacing: var(--letterSpacing);
        text-align: left;
        margin-top: 0.5rem;
    }
`

export default Wrapper;