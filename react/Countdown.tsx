import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from 'react-apollo'
import useProduct from 'vtex.product-context/useProduct'

import { tick } from './utils/time'
import type { TimeSplit } from './typings/global'
import productReleaseDate from './queries/productReleaseDate.graphql'

const CSS_HANDLES = ['countdown']

const Countdown: StorefrontFunctionComponent = () => {
  const { product } = useProduct()
  const { data, loading, error } = useQuery(productReleaseDate, {
    variables: {
      slug: product?.linkText,
    },
    ssr: false,
  })

  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  if (!product) {
    return (
      <div>
        <span>There is no product context.</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    )
  }

  const handles = useCssHandles(CSS_HANDLES)

  tick(data?.product?.releaseDate, setTime)

  return (
    <div className={`${handles.countdown} c-muted-1 db tc`}>
      {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default Countdown
