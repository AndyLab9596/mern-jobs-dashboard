import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import Job from '../Job';
import Loading from '../Loading';
import PageBtnContainer from '../PageBtnContainer';
import Wrapper from './JobContainer.style'

const JobContainer = () => {
  const { totalJobs, jobs, isLoading, getJobs, searchStatus, searchType, sort, search, numOfPages, page } = useAppContext();

  useEffect(() => {
    getJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStatus, searchType, sort, search, page])

  if (isLoading) {
    return <Loading center />
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          const { _id, position, company, jobLocation, jobType, createdAt, status } = job;
          const jobInfo = { _id, position, company, jobLocation, jobType, createdAt, status };
          return (
            <Job key={job._id}
              {...jobInfo}
            />
          )
        })}
        {numOfPages > 1 && <PageBtnContainer />}
      </div>
    </Wrapper>
  )
}

export default JobContainer