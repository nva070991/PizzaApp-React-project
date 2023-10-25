import './Button.module.css'
import { ButtonProps } from './Button.props';
import cn from 'classNames'

function Button({children, className, ...props}:ButtonProps) {

	return (
		<button className={cn('button accent',className)} {...props} >{children}</button>
	)
}

export default Button;
