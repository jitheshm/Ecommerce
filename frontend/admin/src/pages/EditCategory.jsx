import React, { useEffect, useState } from 'react'
import CategoryForm from '../components/CategoryForm/CategoryForm'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import instance from '../axios';

function EditCategory() {
  const { id } = useParams()

  return (
    <>   
      <CategoryForm api={`/admin/categories`} method={'patch'} id={id} title="Edit category details" btnName="update category" />
    </>
  ) 
}

export default EditCategory