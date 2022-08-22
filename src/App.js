import React, { useState, useEffect } from 'react'
import './App.css'

import Header from './components/Header'

export default () => {
  const [blackHeader, setBlackHeader] = useState(false)
  
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)
 
 return () => {
   window.removeEventListener('scroll', scrollListener)
   }
  }, [])
  
  return (
    
    <div className="page">

<Header black={blackHeader} />

     <div className="Lists">

    </div>
    <footer>
      Feito por Silvio Façanha <br />
      Direito de iamgen para NetFlix <br />
      Dados pegos do Site Themoviedb.org
    </footer>
    </div>
      )
 }