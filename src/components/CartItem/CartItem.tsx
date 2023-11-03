import styles from './CartItem.module.css'
import  {CartItemProps} from './CartItem.props'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { cartAction } from '../../store/cart.slice'

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>()

	const increase = () => {
		dispatch(cartAction.add(props.id))
	}

	const decrease = () => {
		dispatch(cartAction.remove(props.id))

	}

	const remove = () => {
		dispatch(cartAction.delete(props.id))

	}


	return (	
		
		<div className={styles['item']}>
			<div className={styles['image']} style={{backgroundImage: `url('${props.image}')`}}/>

		
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['button']} onClick={decrease}>
					- 
				</button>
				<div className={styles['number']}> {props.count} </div>
				<button className={styles['button']} onClick={increase}>
					+
				</button>
				<button className={styles['remove']} onClick={remove}>
					X
				</button>



			</div>

			

		</div>

	)

	
}

export default CartItem