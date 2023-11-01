import { useLoaderData} from 'react-router-dom'
import { Product } from '../../interfaces/interface'


export function Product() {

	// const { id } = useParams()
	const  data = useLoaderData() as Product

	return (
		<>		Product - {data.name}	</>
	)
}