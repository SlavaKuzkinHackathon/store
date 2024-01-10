import ProductsList from '@/components/elements/ ProductsList'
import { ProductsWidget } from '@/components/elements/ProductsWidget'
import { Container } from '@/components/ui/Container'
import { NextPage } from 'next'

const AdminProductsPage: NextPage = () => {
  return (
    <Container className="py-8">
      <div className="my-8">
        <ProductsWidget />
      </div>
    </Container>
  )
}
export default AdminProductsPage
