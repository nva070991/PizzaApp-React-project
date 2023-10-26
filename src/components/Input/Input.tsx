import styles from './Input.module.css'
import cn from 'classNames'
import {forwardRef} from 'react'
import { InputProps } from './Input.props'

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({className, isValid=true, ...props }, ref) {

	return (
		<input {...props} ref={ref} className={
			cn(className, 
				styles['input'],
				{
					[styles.invalid] : !isValid
				})} />

		
	)
})

export default Input;
