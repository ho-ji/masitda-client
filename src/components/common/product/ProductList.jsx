import styled from 'styled-components'

import ProductCard from './ProductCard'
import SkeletonProductCard from './SkeletonProductCard'
import {mainContainerStyle} from 'styles/variables'

const Container = styled.main`
  ${mainContainerStyle}
`
const Title = styled.h2`
  font-weight: bold;
  font-size: var(--font-size-emphasis);
  margin-bottom: 5rem;
  text-align: center;
`
const List = styled.ol`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }
  @media (max-width: 480px) {
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  }
`
const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`

const ProductList = ({list, title, type}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <List>
        {list.length !== 0
          ? list.map((product, i) => {
              return (
                <ListItem key={product._id}>
                  <ProductCard
                    product={product}
                    type={type}
                    ranking={i + 1}
                  />
                </ListItem>
              )
            })
          : Array.from({length: 10}).map((_, i) => (
              <ListItem key={i}>
                <SkeletonProductCard ranking={type === 'ranking'} />
              </ListItem>
            ))}
      </List>
    </Container>
  )
}

export default ProductList
