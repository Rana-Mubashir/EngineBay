import React from 'react'
import {SetCategory ,Hero ,CategorySelect } from './index'
function AllProducts() {
  return (
    <div>
      <Hero />
      <CategorySelect />
      <SetCategory category={'Decoration'}/>
    </div>
  )
}

export default AllProducts
