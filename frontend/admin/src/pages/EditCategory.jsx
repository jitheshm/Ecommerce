import React, { useEffect, useState } from 'react'
import CategoryForm from '../components/CategoryForm/Category'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import instance from '../axios';

function EditCategory() {
    const [category, setCategory] = useState("")
    const {id} = useParams()  
    useEffect(() => {
        instance.get(`/admin/getcategory/${id}`,{
            headers:{
                Authorization: Cookies.get('token')
        }}).then((res)=>{
            console.log(res.data.data);
            setCategory(res.data.data.category)
        })
    },[])
  return (
    <>
    <CategoryForm category={category} setCategory={setCategory} api={`/admin/updatecategory`} method={'patch'} id={id} title="Edit category details" btnName="update category"/>
</>
  )
}

export default EditCategory