import React from 'react'
import { useLanguage } from '../Language.tsx'

export const ErrorFallback: React.FC = () => {
  const handleRefreshClick = () => {
    window.location.href = '/'
  }
  const { language } = useLanguage()
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        gap: '2vw',
        paddingTop: '15vw',
      }}
    >
      <h1
        style={{
          fontSize: '5vw',
          fontFamily: 'Ubuntu , sans-serif',
          fontWeight: 400,
        }}
      >
        {language === 'ru' ? 'Что-то пошло не так!' : 'Something went wrong!'}
      </h1>
      <button
        onClick={handleRefreshClick}
        style={{
          width: '20%',
          fontFamily: 'Ubuntu, sans-serif',
          fontSize: '1.5vw',
          fontWeight: '300',
          lineHeight: '1.5vw',
          letterSpacing: '0em',
          padding: '1vw 2vw',
          backgroundColor: '#0b0a09',
          color: 'white',
          border: 'none',
          borderRadius: '100px',
          cursor: 'pointer',
        }}
      >
        {language === 'ru' ? 'Вернуться на главную' : 'To main page'}
      </button>
    </div>
  )
}
