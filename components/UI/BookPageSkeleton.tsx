import Skeleton from '@/components/UI/Skeleton'
import React from 'react'

export default function BookPageSkeleton() {
  return (
      <div className="container">
        <div className="inner__wrapper">
          <div className="inner__book">
            <Skeleton width={300} height={40} marginBottom={16} />
            <Skeleton width={200} height={20} marginBottom={16} />
            <Skeleton width={`90%`} height={20} marginBottom={16} />
            <Skeleton width={400} height={60} marginBottom={16} />
            <Skeleton width={300} height={50} marginBottom={16} />
            <Skeleton width={200} height={40} marginBottom={32} />
            <Skeleton width={200} height={40} marginBottom={16} />
            <Skeleton width={350} height={40} marginBottom={16} />
            <Skeleton width={400} height={300} marginBottom={16} />
            <Skeleton width={200} height={40} marginBottom={16} />
            <Skeleton width={400} height={300}  />
          </div>
          <div className="inner-book__img--wrapper">
            <Skeleton width={300} height={300} />
          </div>
        </div>
      </div>
  )
}
