import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Layout from './Components/Layout/Layout'
import Register from './Pages/Register/Register'
import { useContext, useEffect } from 'react'
import { UserContext } from './Context/UserContextProvider'
function App() {
  const { setToken } = useContext(UserContext);
  useEffect(() => {
    const localToken = localStorage.getItem("UserToken");
    if (localToken !== null) {
      setToken(JSON.parse(localToken));
    }
  }, [])
  const routing = createBrowserRouter([{
    path: "/", element: <Layout />, children:
      [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ]
  }])
  return (
    <>
      <RouterProvider router={routing}></RouterProvider>
    </>
  )
}

export default App
