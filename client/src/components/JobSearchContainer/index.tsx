import React, { ChangeEvent, SyntheticEvent } from 'react';
import { useAppContext } from '../../context/appContext';
import FormRow from '../FormRow';
import FormRowSelect from '../FormRowSelect';
import Wrapper from './SearchContainer.style';

const JobSearchContainer = () => {
    const {
        isLoading,
        search,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        handleChange,
        clearFilters
    } = useAppContext();

    const handleSearch = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (isLoading) return;
        handleChange({ name: event.target.name, value: event.target.value })
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        clearFilters()
    }

    return (
        <Wrapper>
            <form className="form">
                <h4>Search Form</h4>

                <div className="form-center">
                    {/* Search  */}
                    <FormRow
                        type={'text'}
                        name='search'
                        value={search}
                        handleChange={handleSearch}
                    />

                    <FormRowSelect
                        label='status'
                        name='searchStatus'
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={statusOptions}
                    />

                    <FormRowSelect
                        label='type'
                        name='searchType'
                        value={searchType}
                        handleChange={handleSearch}
                        list={jobTypeOptions}
                    />

                    <FormRowSelect
                        label='sort'
                        name='sort'
                        value={sort}
                        list={sortOptions}
                        handleChange={handleSearch}
                    />

                    <button className="btn btn-block btn-danger"
                        disabled={isLoading}
                        onSubmit={handleSubmit}>
                        Clear filters
                    </button>

                </div>

            </form>

        </Wrapper>
    )
}

export default JobSearchContainer