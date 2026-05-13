'use client'
import { useParams } from 'next/navigation';
import React from 'react'

function page() {
  const { id } = useParams();
  return (
    <div>page {id}</div>
  )
}

export default page