import React from 'react'
interface ILoading {
    center?: boolean
}

const Loading: React.FC<ILoading> = ({ center }) => {
    return (
        <div className={center ? 'loading loading-center' : 'loading'} ></div>
    )
}

export default Loading