import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getProductsAction } from '../actions/productActions'
import Product from './Product'


const Products = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const loadProducts = ()=> dispatch( getProductsAction() );
        loadProducts();
        // eslint-disable-next-line
    },[])

    const products = useSelector(state => state.products.products)
    const error = useSelector(state=> state.products.error) 
    const loading = useSelector(state=> state.products.loading) 


    return (
        <div className="container">
            <h2 className="text-center my-5">All Products List</h2>
            {error  ? <p className="font-weight-bold alert alert-danger w-50 mx-auto text-center mt-4">There was an error</p> : null}
            {loading  ? <p className="text-center mt-4">Loading...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    {products.length !== 0 &&
                        products.map(product => (
                           <Product
                                key={product.id}
                                product={product}
                           />
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default Products
