import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login.jsx'
import SignUp from './components/auth/SignUp.jsx'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router = {appRouter} />
    </>
  )
}

export default App
