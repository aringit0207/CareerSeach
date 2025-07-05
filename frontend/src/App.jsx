import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import SignUp from './components/auth/SignUp.jsx'
import Home from './components/HomePage/Home.jsx'
import Jobs from './components/JobsPage/Jobs.jsx'
import Browse from './components/BrowsePage/Browse.jsx'

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
  },
  {
    path: '/jobs',
    element: <Jobs/>
  },
  {
    path: '/browse',
    element: <Browse/>
  }
])

function App() {
  return (
    <div>
      <RouterProvider router = {appRouter} />
    </div>
  )
}

export default App
