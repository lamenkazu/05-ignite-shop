import { useRouter } from 'next/router'
import React from 'react'

const Product = () => {

  const {query} = useRouter()

  return (
    <h1>Product: {JSON.stringify(query)}</h1>
  )
}

export default Product