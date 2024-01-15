import React from 'react'
import {Routes, Route } from "react-router-dom";

import TextEditor from "./components/TextEditor";
import Layout from "./pages/Layout"

const App = () => {
  return (
    <>
   
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TextEditor />} />
        
        </Route>
      </Routes>
     
    </>
  )
}

export default App