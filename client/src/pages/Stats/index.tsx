import React, { useEffect } from 'react'
import ChartContainer from '../../components/ChartsContainer'
import Loading from '../../components/Loading'
import StatsContainer from '../../components/StatsContainer'
import { useAppContext } from '../../context/appContext'

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats()
  }, [])

  if (isLoading) {
    <Loading center />
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  )
}

export default Stats