import React, { Fragment } from 'react'
import JobContainer from '../../components/JobContainer'
import JobSearchContainer from '../../components/JobSearchContainer'

const AllJobs = () => {
  return (
    <Fragment>
      <JobSearchContainer />
      <JobContainer />
    </Fragment>
  )
}

export default AllJobs