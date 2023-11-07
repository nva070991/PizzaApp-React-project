import { Await, useLoaderData, useNavigate} from 'react-router-dom'
import { Product } from '../../interfaces/product.interface'
import { Suspense } from 'react'
import Heading from '../../components/Heading/Heading'
import styles from './Product.module.css'
import { useDispatch } from 'react-redux'
import { cartAction } from '../../store/cart.slice'



export function Product() {

	// const { id } = useParams()
	const  promise = useLoaderData() as {data : Product}
	const dispatch = useDispatch()
	const navigate = useNavigate()



	const add = (id : number | undefined) => {
		if (id) dispatch(cartAction.increase(id))
	}

	const back = () => {
		navigate(-1)
	}


	return (
		<>	
			<Suspense fallback={'Загружаю...'}> 
				<Await resolve={promise.data}>
					{({data}: {data : Product})=>(<>
						<div className={styles['head']}>
							<button className={styles['back']} onClick={back}>
								Назад
							</button>
							<Heading className={styles['heading']}>{data.name}</Heading>
							<button className={styles['add-to-cart']} onClick={()=>add(data.id)}>
								<img className={styles['icons']} src="/cart-add-icon.svg" alt="Добавить в корзину" />
								&nbsp; В корзину
							</button>
						</div>

						<div className={styles['product-item']}>
						
							<div>
								<div className={styles['img']} style={{backgroundImage: `url('${data.image}')`}}></div>
							</div>

							<div className={styles['description']}>
								<div className={styles['line']}>
									<div >Цена </div>
									<div >{data.price}&nbsp;<span className={styles['total-count']}>₽</span></div>
								</div>

								<div className={styles['line']}>
									<div >Рейтинг </div>
									<div >{data.rating}
										<img className={styles['icons']} src="/star-icon.svg" alt="Иконка звезды" />
									</div>
								</div>

								<div className={styles['line']}>
									<div >Состав: &nbsp; </div>
									<div >{data.ingredients.join(', ')}. </div>
								</div>
								

							</div>
						</div>


					</>)}
				</Await>
			</Suspense>
		</>
	)
}