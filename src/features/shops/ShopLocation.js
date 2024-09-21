import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocations, getLocationsStatus, selectAllLocations } from '../location/locationsSlice'

const ShopLocation = ({locationId}) => {
    const locations = useSelector(selectAllLocations)
    const locationStatus = useSelector(getLocationsStatus)
    // const error = useSelector(getLocationsError)

    const dispatch = useDispatch()

    useEffect(() => {
        if(locationStatus === 'idle'){
            dispatch(fetchLocations())   
        }
    }, [locationStatus, dispatch])

    
    const shoplocation = locations.find(location => location.id === locationId)
  return <span>{shoplocation ? shoplocation.name : 'No location'}</span>
}

export default ShopLocation
