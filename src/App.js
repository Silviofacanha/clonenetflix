import React, { useState, useEffect } from 'react'
import './App.css'
import  Tmdb from './Tmdb'

import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default () => {
  const [blackHeader, setBlackHeader] = useState(false)
  const [movieList, setMovieList] = useState ([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async  () => {
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovierInfo(chosen.id, 'tv')
      console.log(chosenInfo)
      setFeaturedData(chosenInfo)
    }
    loadAll()
  }, [])

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
      Direito de imagen para NetFlix <br />
      Dados pegos do Site Themoviedb.org
    </footer>
    </div>
      )
 }