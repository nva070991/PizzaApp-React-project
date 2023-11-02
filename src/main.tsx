import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import {Menu} from './pages/Menu/Menu'
import {Layout} from './layout/Menu/Layout'
import { Cart } from './pages/Cart/Cart'
import { Error404 } from './pages/Error/Error404'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'
import { Product } from './pages/Product/Product'
import { PREFIX } from './helpers/API'
import axios from 'axios'
import { AuthLayout } from './layout/Auth/AuthLayout'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { RequireAuth } from './helpers/RequireAuth'
import { Provider } from 'react-redux'
import { store } from './store/store'


// eslint-disable-next-line react-refresh/only-export-components
const Menu = lazy(()=>  import('./pages/Menu/Menu'))


const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout/></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Загрузка</>}><Menu/></Suspense>
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
					return defer({
						data : new Promise((resolve, reject) => {
							setTimeout(()=> {				
								axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e=>reject(e))
							}, 2000)
						})
					})
					// return defer({
					// 	data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
					// })
					

					// await new Promise<void>((resolve) => {
					// 	setTimeout(()=> {				
					// 		resolve();
					// 	}, 2000)
					// })
					// const { data } = await axios.get(`${PREFIX}/products/${params.id}`)
					// return data
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout/>,
		children: [
			{
				path: 'login',
				element: <Login/>
			},
			{
				path: 'register',
				element: <Register/>
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
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</React.StrictMode>
)
