import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux"; 
import { deleteProductAction, getEditProductAction } from "../actions/productActions";
import Swal from 'sweetalert2'

const Product = ({product}) => {

    const { name, price, id } = product;
    const dispatch = useDispatch();

    
    const confirmDelete = (id) =>{
        
        Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                  dispatch(deleteProductAction(id));
                }
              })
    }

    const navigate = useNavigate();
    
    const redirectEdition = product => {
        dispatch(getEditProductAction(product));
        navigate(`/products/edit/${product.id}`)
    }

    return (
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold">$ {price}</span></td>
            <td className="actions">
                <button type="button" onClick={()=> redirectEdition(product)} className="btn btn-primary mr-2">Update</button>
                <button type="button" onClick={()=> confirmDelete(id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>    
  )
}

export default Product
