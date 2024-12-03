import React from 'react'
import { useLanguage } from '../Language.tsx'
import './FooterMobile.css'

function FooterMobile() {
  const { language } = useLanguage()

  return (
    <footer className='footer-mobile'>
      <div className='footer-content-mobile'>
        {/* <a href='/social-responsibility'>
          {language === 'ru'
            ? 'Социальная ответственность'
            : 'Social Responsibility'}
        </a>
        <a href='/guarantees'>
          {language === 'ru' ? 'Гарантии' : 'Guarantees'}
        </a>
        <a href='/FAQ'>FAQ</a>
        <a href='/cooperation'>
          {language === 'ru' ? 'Сотрудничество' : 'Cooperation'}
        </a> */}
        <img src='/img/logo.svg' alt='logo-on-footer-page' />
      </div>
    </footer>
  )
}

export default FooterMobile
