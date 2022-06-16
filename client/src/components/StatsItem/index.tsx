import React from 'react'
import { IDefaultStats } from '../StatsContainer'
import Wrapper from './StatsItem.style'

const StatsItem : React.FC<IDefaultStats> = ({title, count, icon, color, bcg}) => {
  return (
    <Wrapper color={color} bcg={bcg} >
        <header>
            <span className="count">{count}</span>
            <span className='icon'>{icon}</span>
        </header>
        <h5 className='title'>{title}</h5>
    </Wrapper>
  )
}

export default StatsItem    