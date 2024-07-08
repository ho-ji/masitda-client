import {useEffect, useState} from 'react'

import {getBestListAPI} from 'api/product'
import ProductList from 'components/common/product/ProductList'
import {useErrorBoundary} from 'react-error-boundary'

const BestList = () => {
  const [list, setList] = useState([])
  const {showBoundary} = useErrorBoundary()

  useEffect(() => {
    const getBestList = async () => {
      try {
        const result = await getBestListAPI()
        setList(result.data)
      } catch (error) {
        showBoundary(error)
      }
    }
    getBestList()
  }, [showBoundary])

  return (
    <ProductList
      list={list}
      type="ranking"
      title="베스트"
    />
  )
}

export default BestList
