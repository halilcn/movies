import { Image, ImageProps } from 'antd'
import classnames from 'classnames'
import { useState } from 'react'

import './index.scss'

const Poster = ({ className, ...otherProps }: ImageProps) => {
  const [hasError, setHasError] = useState<boolean>(false)

  const handleOnError = () => {
    setHasError(true)
  }

  return (
    <Image
      alt='poster'
      onError={handleOnError}
      width={100}
      preview={false}
      fallback='https://www.inventanalytics.com/Content/images/logo.svg'
      className={classnames(className, { 'poster--error': hasError })}
      {...otherProps}
    />
  )
}

export default Poster
