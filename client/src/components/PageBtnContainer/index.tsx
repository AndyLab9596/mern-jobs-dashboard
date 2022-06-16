import React from 'react'
import Wrapper from './PageBtnContainer.style';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useAppContext } from '../../context/appContext';

const PageBtnContainer = () => {
    const { numOfPages, page, changePage } = useAppContext();

    const prevPage = () => {
        let newPage = page - 1;
        if (newPage < 1) {
            newPage = numOfPages
        }
        changePage(newPage);
    };
    const nextPage = () => {
        let newPage = page + 1;
        if (newPage > numOfPages) {
            newPage = numOfPages
        }
        changePage(newPage);
    };

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1
    })

    return (
        <Wrapper>
            <button className='prev-btn' onClick={() => prevPage()}>
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className="btn-container">
                {pages.map((pageNumber) => {
                    return (
                        <button
                            type='button'
                            key={pageNumber}
                            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                            onClick={() => changePage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    )
                })}
            </div>
            <button className="next-btn" onClick={() => nextPage()} >
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    )
}

export default PageBtnContainer