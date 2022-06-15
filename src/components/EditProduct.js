import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { startEditProductAction } from "../actions/productActions";

const EditProduct = () => {

    const [product, setProduct] = useState({
        name: "",
        price: ""
    });
    const productToEdit = useSelector(state => state.products.productEdit);
    const dispatch = useDispatch();

    useEffect(()=>{
        setProduct(productToEdit)
    }, [productToEdit])

    const navigate = useNavigate();
    
    const onChangeForm = e =>  {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = e => {
        e.preventDefault();
        dispatch (startEditProductAction(product) );

        navigate('/')
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Edit Product
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label htmlFor="name">Product name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Product name"
                                    name="name"
                                    value={product.name}
                                    onChange={onChangeForm}
                                />
                                <label className="my-2" htmlFor="price">Product price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    placeholder="Product price"
                                    name="price"
                                    value={product.price}
                                    onChange={onChangeForm}
                                />
                                <button
                                    className="btn btn-primary font-weight-bold d-block w-100 mt-4 text-uppercase"
                                    >Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct