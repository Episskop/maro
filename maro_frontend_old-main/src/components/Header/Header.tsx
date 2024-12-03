import React, { useState, useEffect } from 'react'
import { useLocation, Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../Language.tsx'
import './Header.css'
import usePreventBodyScroll from '../../hooks/usePreventBodyScroll.ts'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSticky, setSticky] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const { language } = useLanguage()
  const location = useLocation()
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    setButtonClicked(!buttonClicked)
  }
  const { disableScroll, enableScroll } = usePreventBodyScroll()
  useEffect(() => {
    if (menuOpen) {
      disableScroll()
    } else {
      enableScroll()
    }
  }, [menuOpen])

  const isHomePage = location.pathname === '/'

  return (
    <div>
      {menuOpen && (
        <div className='menu'>
          <ul>
            <li>
              <Link reloadDocument to='/#about' onClick={toggleMenu}>
                {language === 'ru' ? 'О нас' : 'About us'}
              </Link>
            </li>
            <li>
              <Link reloadDocument to='/portfolio' onClick={toggleMenu}>
                {language === 'ru' ? 'Портфолио' : 'Portfolio'}
              </Link>
            </li>
            <li>
              <Link reloadDocument to='/#services' onClick={toggleMenu}>
                {language === 'ru' ? 'Услуги' : 'Services'}
              </Link>
            </li>
            <li>
              <Link reloadDocument to='/#selection' onClick={toggleMenu}>
                {language === 'ru' ? 'Подбор мебели' : 'Furniture selection'}
              </Link>
            </li>
            <li>
              <Link reloadDocument to='/#contacts' onClick={toggleMenu}>
                {language === 'ru' ? 'Контакты' : 'Contacts'}
              </Link>
            </li>
          </ul>
          {/* <div className='additional-content'>
            <Link to='/social-responsibility' onClick={toggleMenu}>
              {language === 'ru'
                ? 'Социальная ответственность'
                : 'Social Responsibility'}
            </Link>
            <Link to='/guarantees' onClick={toggleMenu}>
              {language === 'ru' ? 'Гарантии' : 'Guarantees'}
            </Link>
            <Link to='/FAQ' onClick={toggleMenu}>
              FAQ
            </Link>
            <Link to='/cooperation' onClick={toggleMenu}>
              {language === 'ru' ? 'Сотрудничество' : 'Cooperation'}
            </Link>
          </div> */}
        </div>
      )}

      <div
        className={
          isHomePage ? 'header' : isSticky ? 'sticky-header' : 'header-not-main'
        }
      >
        <a href='/'>
          <div className='main-logo'>
            <img src='/img/logo.svg' alt='logo-on-main-page' />
          </div>
        </a>
        <div className='menu-controls'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <span
              className={isHomePage ? 'phone-number' : 'sticky-phone-number'}
            >
              <img
                src={isHomePage ? '/img/phone.svg' : '/img/black-phone.svg'}
                alt='phone'
                className='phone-icon'
              />
              <p style={{ margin: 0, fontSize: '1.1vw', fontWeight: 200 }}>
                382 69 772-002
              </p>
            </span>
          </Link>
          <button
            className={isHomePage ? 'menu-button' : 'sticky-menu-button'}
            onClick={toggleMenu}
          >
            {buttonClicked ? (
              <img
                src={isHomePage ? '/img/x-mark.png' : '/img/x-mark-black.png'}
                alt='menu-icon'
                className={isSticky ? 'x-mark-black' : 'x-mark'}
              />
            ) : (
              <svg
                className='menu-icon'
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5 9H27M5 16H16M5 23H27'
                  stroke={isHomePage ? '#FFFFFF' : isSticky ? 'black' : 'black'}
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
