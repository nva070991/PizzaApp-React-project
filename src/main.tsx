import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import {Menu} from './pages/Menu/Menu'
import {Layout} from './layout/Menu/Layout'
import { Cart } from './pages/Cart/Cart'
import { Error404 } from './pages/Error/Error404'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


const Router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '/',
				element: <Menu/>
			},
			{
				path: '/cart',
				element: <Cart/>
			}
		]
	},
	{
		path: '*',
		element: <Error404/>
	}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={Router}/>
	</React.StrictMode>
)
