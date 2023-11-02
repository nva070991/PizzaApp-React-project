import styles from './Search.module.css'
import cn from 'classNames'
import {forwardRef} from 'react'
import { SearchProps } from './Search.props'

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({className, isValid=true, ...props }, ref) {

	return (<>
		<div className={styles['box-search']}>
			<input id='inputSearchHead' {...props} ref={ref} className={
				cn(className, styles['input'], {
					[styles.invalid] : !isValid
				})} />
			<img src='/search-icon.svg' alt='search-icon' className={styles['icons']} />
		</div>
		
	</>
	)
})

export default Search;
