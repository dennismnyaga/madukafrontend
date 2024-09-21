import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchShops, getShopsStatus, selectAllShops } from '../shops/shopsSlice'

const ProductShop = ({shopId}) => {
    const shops = useSelector(selectAllShops)
    const shopStatus = useSelector(getShopsStatus)

    
    const dispatch = useDispatch();

    useEffect(() => {
        if(shopStatus === 'idle'){
            dispatch(fetchShops())   
        }
    }, [shopStatus, dispatch])

    
    const productshop = shops.find(shop => shop.id === shopId)
    return <span>{productshop ? productshop.name : 'No Shop'}</span>
}

export default ProductShop
