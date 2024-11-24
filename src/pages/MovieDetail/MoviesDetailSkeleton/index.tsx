import { Skeleton } from 'antd'

import './index.scss'

const MoviesDetailSkeleton = () => {
  return (
    <div className='movie-detail-skeleton__skeletons'>
      <Skeleton.Image active={true} style={{ width: 500, height: 600 }} />
      <div className='movie-detail-skeleton__info'>
        <Skeleton
          active={true}
          paragraph={{
            rows: 2,
            width: ['100%', 300],
          }}
          className='movie-detail-skeleton__info-skeleton-wrapper'
        />
        <Skeleton
          active={true}
          paragraph={{
            rows: 9,
            width: ['100%', 300, 400, 500, 200, 100, 300, 150, 500],
          }}
          className='movie-detail-skeleton__info-skeleton-wrapper'
        />
      </div>
    </div>
  )
}

export default MoviesDetailSkeleton
