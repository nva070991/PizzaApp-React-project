import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Register.module.css'
import { register, userAction } from '../../store/user.slice';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';



export type RegisterForm = {
	registerEmail: {
		value: string;
	};
	registerPassword:{
		value: string;
	};
	registerName: {
		value: string;
	};
}


export function Register() {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const {jwt , registerErrorMessage} = useSelector((s: RootState) => s.user)


	useEffect(()=>{
		if(jwt) {
			navigate('/')
		}
	},[jwt, navigate])



	const submit = async (e: FormEvent) => {
		e.preventDefault()
		dispatch(userAction.clearRegisterError())
		const target = e.target as typeof e.target & RegisterForm
		const {registerEmail, registerPassword, registerName } = target
		await sendLogin(registerEmail.value, registerPassword.value, registerName.value )
	}

	const sendLogin = async (email:string, password:string, name:string ) => {
		dispatch(register({email, password, name}))
	}


	return (<> 
		<div className={styles['register']} >
			<Heading>Регистрация</Heading>
			{registerErrorMessage && <div className={styles['error']}>Error: {registerErrorMessage}</div>}

			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='registerEmail'>Ваш e-mail</label>
					<Input id='registerEmail' name='registerEmail'  placeholder='Email' />
				</div>
				<div className={styles['field']}>
					<label htmlFor='registerPassword'>Ваш пароль</label>
					<Input autoComplete='on' id='registerPassword' name='registerPassword' type='password' placeholder='Пароль'/>
				</div>
				<div className={styles['field']}>
					<label htmlFor='registerName'>Ваше имя</label>
					<Input id='registerName' name='registerName' placeholder='Имя'/>
				</div>
				<Button onClick={()=>{}} appearence='big'> Вход</Button>
		
			</form>		
		
			<div className={styles['footer']}>
			Есть аккаунт?
				<Link to='/auth/login'>Войти</Link>
			</div>
		</div>
	</>)
}