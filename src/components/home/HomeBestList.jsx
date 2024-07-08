import styled from 'styled-components'
import {useEffect, useState} from 'react'
import {useErrorBoundary} from 'react-error-boundary'

import {getBestListAPI} from 'api/product'
import HomeListContainer from './HomeListContainer'
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

const HomeBestList = () => {
  const [bestList, setBestList] = useState([])
  const [loading, setLoading] = useState(false)
  const {showBoundary} = useErrorBoundary()

  useEffect(() => {
    const getBestList = async () => {
      try {
        setLoading(true)
        const result = await getBestListAPI(7)
        setBestList(result.data)
      } catch (error) {
        showBoundary(error)
      } finally {
        setLoading(false)
      }
    }
    getBestList()
  }, [showBoundary])

  return (
    <HomeListContainer
      title="베스트"
      link="/best">
      {loading || bestList.length === 0
        ? Array.from({length: 7}).map((_, i) => (
            <ListItem key={i}>
              <SkeletonProductCard ranking={true} />
            </ListItem>
          ))
        : bestList.map((product, i) => {
            return (
              <ListItem key={product._id}>
                <ProductCard
                  product={product}
                  type="ranking"
                  ranking={i + 1}
                />
              </ListItem>
            )
          })}
    </HomeListContainer>
  )
}

export default HomeBestList
