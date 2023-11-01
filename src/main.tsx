import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Menu} from './pages/Menu/Menu'
import {Layout} from './layout/Menu/Layout'
import { Cart } from './pages/Cart/Cart'
import { Error404 } from './pages/Error/Error404'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Product } from './pages/Product/Product'
import { PREFIX } from './helpers/API'
import axios from 'axios'


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
			},
			{
				path: '/product/:id',
				element: <Product/>,
				errorElement: <>Ошибка</>,
				loader: async ({params}) => {
					await new Promise<void>((resolve) => {
						setTimeout(()=> {				
							resolve();
						}, 2000)
					})
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`)
					return data
				}
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
