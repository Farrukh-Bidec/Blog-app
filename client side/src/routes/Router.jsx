import Blogs from '../pages/Blogs'
import Layout from '../layout/Layout'
import Services from '../pages/Services'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../pages/Index'
import Form from '../pages/Form'

const Router = () => {
  return (
    <Routes>
      <Route path='/services' element={<Services />}  />
        <Route path='/' element={<Layout />}>
            <Route index element={<Index />}  />
            <Route path='/blogs' element={<Blogs />}  />
        </Route>
            <Route path='/form' element={<Form />}  />
    </Routes>
  )
}

export default Router
