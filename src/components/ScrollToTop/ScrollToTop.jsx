import React, { useEffect } from 'react'
import './ScrollToTop.scss'

export const ScrollToTop = () => {
  const trackScrolling = (e) => {
    const { innerHeight, scrollY } = e.path[1]
    if (scrollY >= innerHeight) {
      document.querySelector('.scroll-to-top').style.opacity = 1
    } else {
      document.querySelector('.scroll-to-top').style.opacity = 0
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);
    return (() => document.removeEventListener('scroll', trackScrolling))
  }, [])

  const handleScroll = () => {
    document.documentElement.scrollTop = 0;
  }

  return (
    <button
      className="scroll-to-top"
      onClick={handleScroll}>
      <i className="fas fa-angle-up"></i>
    </button>
  )
}