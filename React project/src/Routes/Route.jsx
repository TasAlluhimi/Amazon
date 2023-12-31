import React from 'react'
import {Routes, Route as R} from 'react-router-dom'
import Home from '../Pages/Home'
import SignIn from '../Pages/SignIn'
import SignUp from '../Pages/SignUp'
import More from '../Pages/More'
import Cart from '../Pages/Cart'

function Route() {
  return (
    <>
        <Routes>
            <R path='/' element={<Home/>}></R>
            <R path='/SignIn' element={<SignIn/>}></R>
            <R path='/SignUp' element={<SignUp/>}></R>
            <R path='/Cart' element={<Cart/>}></R>
            <R path='/More/:id' element={<More/>}></R>
        </Routes>
    </>
  )
}

export default Route