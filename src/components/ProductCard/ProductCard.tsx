import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'
import  {ProductCardProps} from './ProductCard.props'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { cartAction } from '../../store/cart.slice'

function ProductCard(props: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>()

	const add = (e: React.MouseEvent) => {
		e.preventDefault()
		dispatch(cartAction.increase(props.id))
	}

	return (	
		<Link className={styles['link']} to={`/product/${props.id}`}>
			<div className={styles['card']}>
				<div className={styles['head']} style={{backgroundImage: `url('${props.image}')`}}>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']} onClick={add}>
						<img className={styles['icons']} src="/cart-add-icon.svg" alt="Добавить в корзину" />
					</button>
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img className={styles['icons']} src="/star-icon.svg" alt="Иконка звезды" />
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.name}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div>
		</Link>
	)

	
}

export default ProductCard