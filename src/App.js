import React, { useEffect, useState} from 'react';
import './App.css';
import  Tmdb from './Tmdb';

import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {
  const [blackHeader, setBlackHeader] = useState(false)
  const [movieList, setMovieList] = useState ([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async  () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals')
      //console.log(originals)
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      //console.log(choseInfo)
      setFeaturedData(chosenInfo)
    }

    loadAll();
  }, []);

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

{featuredData &&
<FeaturedMovie item={featuredData}/>
}

     <section className="Lists">

    </section>
    <footer>
      Feito por Silvio Façanha <br />
      Direitos de imagem para NetFlix <br />
      Dados pegos do Site Themoviedb.org
    </footer>

    </div>
      );
 }