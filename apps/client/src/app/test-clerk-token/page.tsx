import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  return (
    <div>{token}</div>
  )
}

export default page
