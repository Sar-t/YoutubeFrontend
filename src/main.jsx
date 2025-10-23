import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import Home from './Pages/Home.jsx'
import VideoPage from './Pages/VideoPage.jsx'
import AuthLayout from "./components/AuthLayout.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store/store.js'
import UploadVideo from './components/UploadVideo/UploadVideo.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: "/",
        element: (
            <Home />
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/signin',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>  
        )
      },
      {
        path: '/video/:videoId',
        element: <VideoPage/>
      },
      {
        path: '/upload-video',
        element: (
          <AuthLayout authentication={true}>
            <UploadVideo />
          </AuthLayout>
        )
      },
      
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </StrictMode>
)
