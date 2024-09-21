import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'

const ProductOwner = ({userId}) => {
    const users = useSelector(selectAllUsers)

    const owner = users.find(user => user.id === userId);
  return owner ? owner.phone_number : 'unknown'
}

export default ProductOwner
 
