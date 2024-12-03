import React from 'react'
import { useLanguage } from '../components/Language.tsx'
import { Link } from 'react-router-dom'

const HousingDetailsMobile = ({ type, data }) => {
  const { language } = useLanguage()
 
  return (
    <div className={`${type}-details-mobile`}>
      {data.map((item) => (
        <Link style={{textDecoration:'none'}}
          key={item.id}
          to={`/portfolio/${item.type}/${item.url}`}
          
        >
          <div className='portfolio-section-image-container-mobile'  
          style={{
                    backgroundImage: `url(${item.photoUrl})`,
                    width: "90vw",
                    height: "92vw",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: '4vw',
                    display:'flex',
                    alignItems:'flex-end',
                   padding: "2vw 0vw"
                }}
                >
            <div className='text-overlay-mobile' style={{marginLeft:'4vw', textDecoration:'none'}}>
              <p>
                {language === 'ru' ? item.residentialComplex : item.residentialComplex_eng}
              </p>
              <p>{item.sizeSquareMeters}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default HousingDetailsMobile
