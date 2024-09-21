import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductsExcerpt from './ProductsExcerpt';
import { fetchProducts, getProductsError, getProductsStatus, selectAllProducts } from './productsSlice'

const ProductList = () => {
    const dispatch = useDispatch()
    const products = useSelector(selectAllProducts);
    const productStatus = useSelector(getProductsStatus)
    const error = useSelector(getProductsError)


    useEffect(() => {
        if(productStatus === 'idle'){
            dispatch(fetchProducts())   
        }
    }, [productStatus, dispatch])

    let content;
    if(productStatus === 'loading'){
        content = <p>Loading...</p>
    } else if(productStatus === 'succeeded'){
        content = products.map(product => <ProductsExcerpt key={product.id} product={product} />)
    }else if(productStatus === 'failed'){
        content = <p>Failed {error}</p>
    }
  return (
    <section>
      {content}
    </section>
  )
}

export default ProductList
