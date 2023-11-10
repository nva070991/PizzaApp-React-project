import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { AppDispatch, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css'
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartAction } from '../../store/cart.slice';

const DELIVERY_PRICE = 169


export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([])
	const items = useSelector((s:RootState) => s.cart.items)
	const jwt = useSelector((s:RootState) => s.user.jwt)
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()


	const totalPrice =  items.map(i => {
		const product = cartProducts.find(p => p.id === i.id)
		if (!product) { return 0 }
		return i.count * product.price
	}
	).reduce((aсcum, i)=> aсcum +=i, 0)

	const getItem = async (id : number) => {
		const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`)
		return data
	}

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(i => getItem(i.id)))
		setCartProducts(res)
	}

	const checkOut = async () => {
		await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		})
		dispatch(cartAction.cleanCart())
		navigate('/success')
	}

	useEffect(()=> {
		loadAllItems()
	},[items])

	return <>		
		<Heading className={styles['head']}>Корзина</Heading>
		<div className={styles['box']}>
			{items.map(i => {
				const product = cartProducts.find(p => p.id === i.id)
				if (!product) { return}
				return <CartItem key={product.id} count={i.count} {...product}/>
			}
			)}
		</div>

		<div className={styles['total']}>

			<div className={styles['line']}>
				<div className={styles['text']}>Стоимость: </div>
				<div className={styles['price']}>{totalPrice}&nbsp;<span>₽</span></div>
			</div>

			<hr className={styles['hr']} />
			<div className={styles['line']}>
				<div>Доставка: </div>
				<div className={styles['price']}>{DELIVERY_PRICE}&nbsp;<span>₽</span></div>
			</div>

			<hr className={styles['hr']} />

			<div className={styles['line']}>
				<div> Итог<span className={styles['total-count']}>({items.length})</span>: </div>
				<div className={styles['price']}>{totalPrice+DELIVERY_PRICE}&nbsp;<span>₽</span></div>
			</div>
		</div>
		<div className={styles['checkout']}>
			<Button onClick={checkOut} appearence='big'>Оформить</Button>
		</div>

	</>
}