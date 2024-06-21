import React from 'react'

const TrendingCoin = ({data}) => {
  return (
    <div>
      <div>{data.item.name}</div>
    </div>
  )
}

export default TrendingCoin
