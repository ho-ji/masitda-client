import {useEffect, useState} from 'react'
import {useErrorBoundary} from 'react-error-boundary'

import {getMDPickListAPI} from 'api/product'
import ProductList from 'components/common/product/ProductList'

const MDPickList = () => {
  const [list, setList] = useState([])
  const {showBoundary} = useErrorBoundary()

  useEffect(() => {
    const getMDPickList = async () => {
      try {
        const result = await getMDPickListAPI()
        setList(result.data)
      } catch (error) {
        showBoundary(error)
      }
    }
    getMDPickList()
  }, [showBoundary])

  return (
    <ProductList
      list={list}
      type="mdpick"
      title="MD PICK"
    />
  )
}

export default MDPickList
