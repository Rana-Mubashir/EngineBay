import React from 'react'
import {SetCategory,Hero,CategorySelect}  from './index'
function AllProduct() {
  return (
    <div>
      <Hero />
      <CategorySelect />
      <SetCategory category={['Body Part', 'Decoration', 'Cleaning item']} />
    </div>
  )
}

export default AllProduct
