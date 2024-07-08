import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useErrorBoundary} from 'react-error-boundary'

import HomeListContainer from './HomeListContainer'
import {getMDPickListAPI} from 'api/product'
import SkeletonProductCard from 'components/common/product/SkeletonProductCard'
import ProductCard from 'components/common/product/ProductCard'

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 22rem;
  @media (max-width: 768px) {
    min-width: 20rem;
  }
  @media (max-width: 480px) {
    min-width: 18rem;
  }
`

const HomeMDPickList = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const {showBoundary} = useErrorBoundary()

  useEffect(() => {
    const getMDPickList = async () => {
      try {
        setLoading(true)
        const result = await getMDPickListAPI(7)
        setList(result.data)
      } catch (error) {
        showBoundary(error)
      } finally {
        setLoading(false)
      }
    }
    getMDPickList()
  }, [showBoundary])

  return (
    <HomeListContainer
      title="MD Pick"
      link="/mdpick">
      {loading || list.length === 0
        ? Array.from({length: 7}).map((_, i) => (
            <ListItem key={i}>
              <SkeletonProductCard />
            </ListItem>
          ))
        : list.map((item) => {
            return (
              <ListItem key={item._id}>
                <ProductCard
                  product={item}
                  type="mdpick"
                />
              </ListItem>
            )
          })}
    </HomeListContainer>
  )
}

export default HomeMDPickList
