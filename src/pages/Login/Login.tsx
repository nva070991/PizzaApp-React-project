import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css'
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { LoginResponse } from '../../interfaces/auth.interface';
import { AppDispatch } from '../../store/store';
import { useDispatch} from 'react-redux'
import { userAction } from '../../store/user.slice';

export type LoginForm = {
	loginEmail: {
		value: string;
	};
	loginPassword:{
		value: string;

	};
}


export function Login() {
	const [error, setError] = useState<string | null>()
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		setError(null)
		const target = e.target as typeof e.target & LoginForm
		const {loginEmail, loginPassword } = target
		await sendLogin(loginEmail.value, loginPassword.value)
	}

	const sendLogin = async (email:string, password:string) => {
		try{const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
			email,
			password
		})
		console.log(data)
		localStorage.setItem('jwt', data.access_token)
		dispatch(userAction.addJwt(data.access_token))
		navigate('/')
		}
		catch(e) {
			if(e instanceof AxiosError) {
				setError(e.response?.data.message)
			}
		}
	}

	return (<> 
		<div className={styles['login']} >
			<Heading>Вход</Heading>
			{error && <div className={styles['error']}>Error: {error}</div>}

			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='loginEmail'>Ваш e-mail</label>
					<Input id='loginEmail' name='loginEmail'  placeholder='Email' />
				</div>
				<div className={styles['field']}>
					<label htmlFor='loginPassword'>Ваш пароль</label>
					<Input id='loginPassword' name='loginPassword' type='password' placeholder='Пароль'/>
				</div>
				<Button onClick={()=>{}} appearence='big'> Вход</Button>
		
			</form>		
		
			<div className={styles['footer']}>
			Нет аккаунта?
				<Link to='/auth/register'>Зарегистрироваться</Link>
			</div>
		</div>
	</>)
}