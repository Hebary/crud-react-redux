import { newProductAction } from '../actions/productActions';
import { useDispatch, useSelector} from 'react-redux'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showAlertAction, hideAlertAction } from '../actions/alertActions'

const NewProduct = () => {

    const dispatch = useDispatch();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')

    const navigate =useNavigate();
    const addNewProduct = product => dispatch( newProductAction(product) );

    //ACCESS TO STATE USING useSelector hooK
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const alert = useSelector(state=> state.alert.alert);

    const submitNewProduct = e => {

        e.preventDefault();
        //validate
        if(name.trim() === '' || price <= 0) {
            const alert = {
                msg: "Please, fill all the fields",
                classes:'alert alert-danger text-center font-weight-bold p3'
            }
            dispatch(showAlertAction(alert));
            return;
        }
        //no errors
        dispatch(hideAlertAction());
        //new product
        addNewProduct({
            name, 
            price
        });
        //reset form
        setName('');
        setPrice('');
        navigate('/');
    }




    return (
        <div className='row justify-content-center mt-5'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Add new product
                        </h2>
                        {alert && <p className={alert.classes}>{alert.msg}</p>}
                        <form
                            onSubmit={ submitNewProduct }
                        >
                            <div className='form-group'>
                                <label htmlFor='name'>Product name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='name'
                                    placeholder='Product name'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <label className='my-2' htmlFor='price'>Product price</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    id='price'
                                    placeholder='Product price'
                                    value={price}
                                    onChange={e => setPrice( Number( e.target.value ) ) }
                                />
                                <button
                                    className='btn btn-primary font-weight-bold d-block w-100 mt-4 text-uppercase'
                                    >Add Product
                                </button>
                            </div>

                        </form>

                        {loading && <p className="text-center p-5">Loading...</p>}
                        {error && <p className="text-center alert alert-danger font-weight-bold text-uppercase">Something went wrong</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct
