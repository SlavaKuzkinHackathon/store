import ProductsList from '@/components/elements/ ProductsList'
import { ProductsWidget } from '@/components/elements/ProductsWidget'
import { UpdateProductVid }from '@/components/elements/UpdateProductVid/index'
import { Container } from '@/components/ui/Container'
import { NextPage } from 'next'

const AdminProductsPage = () => {
  return (
    <Container className="py-8">
      <div className="my-8">
            <UpdateProductVid/>
      </div>
    </Container>
  )
}
export default AdminProductsPage
