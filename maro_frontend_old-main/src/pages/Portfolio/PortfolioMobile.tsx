import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import commercialData from '../Portfolio/Commercial/Commercial.tsx';
import { useLanguage } from '../../components/Language.tsx'; 
import './PortfolioMobile.css';
import { usePropertyData } from '../../API/Context.tsx';

interface RealEstateItem {
  residentialComplex: string;
  address: string;
  sizeSquareMeters: string;
  photoUrl?: string; // Optional, as not all items might have a photo
  type:string,
  url: string
}

const PortfolioMobile: React.FC = () => {
  const { language } = useLanguage(); 
  const {apartmentData,villaData} = usePropertyData()
  const [selectedComponent, setSelectedComponent] = useState<'commercial' | 'apartments' | 'villas'>('apartments');
  const [apartmentDataState] = useState<RealEstateItem[]>(apartmentData);
  const [villaDataState] = useState<RealEstateItem[]>(villaData);
 
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 700);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const handleChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  
  const renderComponent = (data: RealEstateItem[]) => {
    // const shuffledData = data.sort(() => 0.5 - Math.random()); 
    const selectedItems = data.slice(0, 4);
 
    return selectedItems.map((item, index) => (
      <div key={index} className="portfolio-page-item-mobile">
        <Link
          to={`/portfolio/${item.type}/${item.url}`}
          
        >
        {item.photoUrl && (
          <>
            <img
              src={item.photoUrl}
              alt={`real-estate-${index}-mobile`}
              className={`portfolio-page-image-renderComponent-mobile portfolio-image-${index}`}
            />
          </>
        )}
        </Link>
         <div className='portfolio-page-text-renderComponent-mobile'>
            <p className='portfolio-page-residentialComplex-mobile' style={{ textDecoration: 'none' }}>{item.residentialComplex}</p>
            <p className='portfolio-page-address-mobile' style={{ textDecoration: 'none' }}>{item.address}</p>
            <p className='portfolio-page-sizeSquareMeters-mobile' style={{ textDecoration: 'none' }}>{item.sizeSquareMeters}</p>
          </div>
      </div>
    ));
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'apartments':
        return renderComponent(apartmentData);
      case 'villas':
        return renderComponent(villaData);
      // case 'commercial':
      //   return renderComponent(commercialDataState);
      default:
        return null;
    }
  };
  return (
    <div className="portfolio-page-section-mobile">
      <img 
        src="./img/buttuon_up.png" 
        alt="button_circle_up" 
        onClick={scrollToTop} 
        className={isSticky ? 'button-up-mobile' : "button-up-hide-mobile"}
      />
      <div className="portfolio-page-container-mobile">
        <img src="/img/portfolio-page-1.png" alt="page-background" className='portfolio-page-background-mobile' />
        <div className="portfolio-page-text-overlay-mobile">
          <p className='portfolio-page-heading-mobile'>{language === 'ru' ? 'ПОРТФОЛИО' : 'Portfolio'}</p>
          <p className='portfolio-page-text-mobile'>
          {language === 'ru'
              ? 'Каждый наш проект уникален, отражая в себе характер и особенный склад жизни своих хозяев. Мы очень тщательно прорабатываем все детали, чтобы интерьер был максимально комфортным для наших клиентов'
              : 'Each of our projects is unique, reflecting the character and distinctive lifestyle of its owners. We meticulously work through every detail to ensure that the interior is as comfortable as possible for our clients.'}
          </p>
        </div>
      </div>
      <div className="portfolio-page-switcher-container-mobile">
        <select value={selectedComponent} onChange={handleChange}>
          <option value="apartments">{language === 'ru' ? 'Квартиры' : 'Apartments'}</option>
          <option value="villas">{language === 'ru' ? 'Виллы' : 'Villas'}</option>
          {/* <option value="commercial">{language === 'ru' ? 'Коммерческая недвижимость' : 'Commercial real estate'}</option> */}
        </select>
      </div>
        <div className='portfolio-page-grid-container-mobile'>{renderSelectedComponent()}</div>
    </div>
  );
};

export default PortfolioMobile;
