import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css'
import Button from '../../components/Button/Button';

export function Layout() {
	return <div className={styles['layout']}>
		<div className={styles['sidebar']}>


			<div className={styles['user']}>
				<img src='/avatar-icon.svg' alt='avatar-icon' className={styles['avatar']} />
				<div className={styles['name']}> Василий Налимов	</div>
				<div className={styles['email']}> nva070991@gmail.com 	</div>

			</div>
	
			<div className={styles['menu']}>
				
				<Link to='/' className={styles['link']}>
					<img src='/menu-icon.svg' alt='menu-icon' className={styles['icons']} />
					Mеню</Link>
				<Link to='/cart' className={styles['link']} >
					<img src='/cart-icon.svg' alt='cart-icon' className={styles['icons']} />
					Корзина</Link>
			</div >
			<Button className={styles['exit']}>
				<img src='/exit-icon.svg' alt='cart-icon' className={styles['icons']} />
				Выход
			</Button>
		</div >


		<div>
			<Outlet/>
		</div>		
	</div>	
}
