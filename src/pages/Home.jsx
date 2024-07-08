import Layout from 'components/common/Layout'
import HomeBestList from 'components/home/HomeBestList'
import HomeMDPickList from 'components/home/HomeMDPickList'

const Home = () => {
  return (
    <Layout>
      <HomeBestList />
      <HomeMDPickList />
    </Layout>
  )
}

export default Home
