import styled from "styled-components";

const Wrapper = styled.aside`
    display: none;
    @media (min-width: 992px) {
        display: block;
        box-shadow: rgb(0 0 0 / 10%) 1px 0px 0px 0px;
        .sidebar-container {
            min-height: 100vh;
            height: 100%;
            width: 250px;
            margin-left: -250px;
            background-color: #fff;
            transition: var(--transition)
        }

        .show-sidebar {
            margin-left: 0;
        }

        .content {
            position: sticky;
            top: 0
        }

        header {
            height: 6rem;
            display: flex;
            align-items: center;
            padding-left: 2.5rem;
        }

        .nav-links {
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
        }

        .nav-link {
            display: flex;
            align-items: center;
            padding: 1rem 0;
            padding-left: 2.5rem;
            text-transform: capitalize;
            transition: var(--transition);
            color: var(--grey-500);
        }

        .icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            display: grid;
            place-items: center;
            transition: var(--transition);
        }

        .nav-link:hover {
            background-color: var(--grey-50);
            padding-left: 3rem;
            color: var(--grey-900)
        }

        .nav-link:hover .icon {
            color: var(--primary-500)
        }

        .active {
            color: var(--grey-900);
        }

        .active .icon {
            color: var(--primary-500)
        }
    }
`

export default Wrapper;