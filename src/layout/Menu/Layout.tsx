import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css'
import Button from '../../components/Button/Button';
import cn from 'classNames'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userAction } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const profile = useSelector((s:RootState)=>s.user.profile)
	const items = useSelector((s:RootState) => s.cart.items)

	useEffect(()=> {
		dispatch(getProfile())
	},[dispatch])


	const logOut = () => {
		dispatch(userAction.logOut())

		navigate('/auth/login')
	}

	
	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>


			<div className={styles['user']}>
				<img src='/avatar-icon.svg' alt='avatar-icon' className={styles['avatar']} />
				<div className={styles['name']}> {profile?.name}	</div>
				<div className={styles['email']}> {profile?.email} 	</div>

			</div>
	
			<div className={styles['menu']}>
				
				<NavLink to='/' className={({isActive})=>cn(styles['link'], {
					[styles.active] : isActive
				})}>
					<img src='/menu-icon.svg' alt='menu-icon' className={styles['icons']} />
					Mеню</NavLink>
				<NavLink to='/cart' className={({isActive})=>cn(styles['link'], 					{
					[styles.active] : isActive
				})} >
					<img src='/cart-icon.svg' alt='cart-icon' className={styles['icons']} />
					Корзина <span className={styles['cart-count']}> {items.reduce((acc, item)=> acc+= item.count, 0)}</span>
				</NavLink>
			</div >
			<Button appearence='small' onClick={logOut} className={styles['exit']}>
				<img src='/exit-icon.svg' alt='cart-icon' className={styles['icons']} />
				Выход
			</Button>
		</div >


		<div className={styles['content']}>
			<Outlet />
		</div>		
	</div>	
}
