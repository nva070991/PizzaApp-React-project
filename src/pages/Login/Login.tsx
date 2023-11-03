import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css'
import { FormEvent, useEffect} from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector} from 'react-redux'
import { login, userAction } from '../../store/user.slice';

export type LoginForm = {
	loginEmail: {
		value: string;
	};
	loginPassword:{
		value: string;

	};
}


export function Login() {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user)


	useEffect(()=>{
		if(jwt) {
			navigate('/')
		}
	},[jwt, navigate])

	const submit = async (e: FormEvent) => {
		e.preventDefault()
		dispatch(userAction.clearLoginError())
		const target = e.target as typeof e.target & LoginForm
		const {loginEmail, loginPassword } = target
		await sendLogin(loginEmail.value, loginPassword.value)
	}

	const sendLogin = async (email:string, password:string) => {
		dispatch(login({email, password}))
		


		// try{
		// 	const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
		// 		email,
		// 		password
		// 	})
		// 	console.log(data)
		// 	dispatch(userAction.addJwt(data.access_token))
		// 	navigate('/')
		// }
		// catch(e) {
		// 	if(e instanceof AxiosError) {
		// 		setError(e.response?.data.message)
		// 	}
		// }
	}

	return (<> 
		<div className={styles['login']} >
			<Heading>Вход</Heading>
			{loginErrorMessage && <div className={styles['error']}>Error: {loginErrorMessage}</div>}

			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='loginEmail'>Ваш e-mail</label>
					<Input autoComplete='current-login' id='loginEmail' name='loginEmail'  placeholder='Email' />
				</div>
				<div className={styles['field']}>
					<label htmlFor='loginPassword'>Ваш пароль</label>
					<Input autoComplete='current-password' id='loginPassword' name='loginPassword' type='password' placeholder='Пароль'/>
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