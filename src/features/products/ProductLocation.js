import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocations, getLocationsStatus, selectAllLocations } from '../location/locationsSlice'

const ProductLocation = ({ locationId }) => {
  const locations = useSelector(selectAllLocations)
  const locationStatus = useSelector(getLocationsStatus)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(fetchLocations())

  }, [dispatch])


  const productlocation = locations.find(location => location.id === locationId)
  return <span className=' text-sm tracking-tighter font-semibold inline ms-2.5'>{productlocation ? productlocation.name : 'No location'}</span>
}

export default ProductLocation
