import axiosClient from "../config/axios";

import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS, 
    ADD_PRODUCT_ERROR,
    PRODUCTS_DOWNLOAD,
    PRODUCTS_DOWNLOAD_SUCCESS,
    PRODUCTS_DOWNLOAD_ERROR,
    GET_PRODUCT_DELETE,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_ERROR,
    GET_PRODUCT_EDIT,
    START_EDIT_PRODUCT,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_ERROR,
} from "../types";

import Swal from "sweetalert2";
//Create new Product

export function newProductAction(product) {
    return async (dispatch) => {
        //insert on DB here
        dispatch( addNewProduct() );

        try {
            await axiosClient.post('/products', product);
            dispatch (addProductSuccess(product))
            Swal.fire(
                'Success',
                'Your product has been added successfully',
                'success'
                );
        } catch (error) {
            console.log(error)
            dispatch( addProductError(true) )
            Swal.fire({icon:'error', title:'Something went wrong', text:'error, try again'});
        }
    }
}

const addNewProduct = () => ({
    type:ADD_PRODUCT,
    payload:true
})

//on product inserted on DB
const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
});

const addProductError = state => ({
    type: ADD_PRODUCT_ERROR,
    payload: state
})


//Download products
export function getProductsAction() {
    return async (dispatch) => {
        dispatch( getProducts() );
        try {
            const { data } = await axiosClient.get('/products');
            dispatch(getProductsSuccess(data))
            }
        catch (error) {
            dispatch(getProductsError () );
        }
    }
}

const getProducts = () => ({
    type: PRODUCTS_DOWNLOAD,
    payload: true
});


const getProductsSuccess = products => ({
    type: PRODUCTS_DOWNLOAD_SUCCESS,
    payload: products
});

const getProductsError = () => ({
    type: PRODUCTS_DOWNLOAD_ERROR,
    payload:true
});


//Selecciona y elimina el producto

export function deleteProductAction(id){
    return async (dispatch)=>{
        dispatch( getDeleteProduct(id) );
        
        try {
            await axiosClient.delete(`/products/${id}`);
            dispatch(deleteProductSuccess())
            Swal.fire(
                'Success',
                'Your product has been deleted successfully',
                'success');
        } catch (error) {
            console.log(error)
            dispatch(deleteProductError())
            Swal.fire({icon:'error', title:'Something went wrong', text:'error, try again'});
        }
            
        }
    }

const getDeleteProduct = (id) => ({
    type : GET_PRODUCT_DELETE,
    payload: id
})

const deleteProductSuccess = () => ({
    type: PRODUCT_DELETE_SUCCESS,
});

const deleteProductError = () => ({
    type: PRODUCT_DELETE_ERROR,
    payload:true
});

//Put product on edition


export function getEditProductAction(product){
    return (dispatch)=>{
        dispatch( getEditProduct(product));
    }
}

const getEditProduct = (product) => ({
    type: GET_PRODUCT_EDIT,
    payload: product
});

export function startEditProductAction(product){
    return async (dispatch)=>{
        dispatch( startEditProduct());
        try {
            await axiosClient.put(`/products/${product.id}`, product);
            dispatch( editProductSuccess(product) );
        } catch (error) {
            console.log(error)
            dispatch( editProductError() );
        }
    }
}

const startEditProduct = () => ({
    type: START_EDIT_PRODUCT,
});

const editProductSuccess = (product)=>({
        type: PRODUCT_EDIT_SUCCESS,
        payload: product
});

const editProductError = () => ({
    type: PRODUCT_EDIT_ERROR,
    payload:true
});