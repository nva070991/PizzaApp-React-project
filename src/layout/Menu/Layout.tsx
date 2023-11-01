import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css'
import Button from '../../components/Button/Button';
import cn from 'classNames'

export function Layout() {

	
	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>


			<div className={styles['user']}>
				<img src='/avatar-icon.svg' alt='avatar-icon' className={styles['avatar']} />
				<div className={styles['name']}> Василий Налимов	</div>
				<div className={styles['email']}> nva070991@gmail.com 	</div>

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
					Корзина</NavLink>
			</div >
			<Button appearence='small' onClick={()=>{}} className={styles['exit']}>
				<img src='/exit-icon.svg' alt='cart-icon' className={styles['icons']} />
				Выход
			</Button>
		</div >


		<div className={styles['content']}>
			<Outlet />
		</div>		
	</div>	
}
