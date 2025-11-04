
import { Routes, Route } from 'react-router-dom'
import { UserLayout } from '../layouts/UserLayout'
import UserPage from '../user/page'




function UserRouter() {
  return (
    <>
        <Routes>
            <Route path='/' element={<UserLayout/>}>
                <Route index element={<UserPage/>}></Route>
            </Route>
        </Routes>

    </>
  )
}

export default UserRouter