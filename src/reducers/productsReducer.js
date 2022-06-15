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
        PRODUCT_EDIT_SUCCESS,
        PRODUCT_EDIT_ERROR, } 
    from "../types";

// Every reducer has own state
const initialState = {
    products: [],
    loading: false,
    error: null,
    productDelete: null,
    productEdit: null
}

export default function ( state=initialState, action ){
    //toma un state, si lo hay, sino inicia con esos valores default
    switch (action.type) {
        case PRODUCTS_DOWNLOAD:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        case ADD_PRODUCT_ERROR:
        case PRODUCTS_DOWNLOAD_ERROR:
        case PRODUCT_DELETE_ERROR:
        case PRODUCT_EDIT_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case PRODUCTS_DOWNLOAD_SUCCESS:
            return{
                ...state,
                loading: false,
                error:null,
                products: action.payload
            }
        case GET_PRODUCT_DELETE:
            return{
                ...state,
                productDelete: action.payload
            }
        case PRODUCT_DELETE_SUCCESS:
            return{
                ...state,
                products: state.products.filter(product => product.id !== state.productDelete),
                productDelete: null,
            }
        case GET_PRODUCT_EDIT:
            return{
                ...state,
                productEdit: action.payload
            }
        case PRODUCT_EDIT_SUCCESS:
            return{
                ...state,
                productEdit: null,
                products: state.products.map(product => product.id !== action.payload.id ? product : action.payload),
            }
           
        default :
            return state;
    }
}