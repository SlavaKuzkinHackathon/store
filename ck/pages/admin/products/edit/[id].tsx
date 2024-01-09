import { NextPage } from 'next'
import { useRouter } from 'next/router'

const AdminUserEditPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
    {/*   <UpdateProductItem product={undefined}/> */}
    </>
  )
}
export default AdminUserEditPage
