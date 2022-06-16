import styled from "styled-components";

const Wrapper = styled.section`
    border-radius: var(--borderRadius);
    width: 100%;
    background-color: #fff;
    padding: 3rem 2rem 4rem;
    box-shadow: var(--shadow-2);

    h3 {
        margin-top: 0;
    }

    .form {
        margin: 0;
        padding: 0;
        border-radius: 0;
        box-shadow: none;
        max-width: 100%;
        width: 100%;
    }

    .form-row {
        margin-bottom: 0;
    }

    .form-center {
        display: grid;
        row-gap: 0.5rem;
    }

    .form-center button {
        align-self: center;
        height: 35px;
        margin-top: 1rem;
    }

    .btn-container {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        column-gap: 1rem;
        align-self: center;
        margin-top: 0.5rem;
        button {
            height: 35px;
            margin-top: 2rem

        }
    }

    .clear-btn {
        background-color: var(--grey-500);
    }

    .clear-btn:hover {
        background-color: #222;
    }


    @media (min-width: 992px) {
        .form-center {
            grid-template-columns: 1fr 1fr;
            align-items: center;
            column-gap: 1rem;
        }
        .btn-container {
            margin-top: 0
        }
    }

    @media (min-width: 1120px) {
        .form-center {
            grid-template-columns: 1fr 1fr 1fr;
        }
        .form-center button {
            /* margin-top: 2rem */
        }
    }
`;

export default Wrapper;