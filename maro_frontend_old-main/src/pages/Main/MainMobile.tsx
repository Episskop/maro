import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../components/Language.tsx'
import commercialData from '../Portfolio/Commercial/Commercial.tsx'
import Supplier from '../Suppliers.tsx'
import PopupQuizMobile from './popUpQuizMobile.tsx'
import HousingDetailsMobile from '../HousingDetailsMobile.tsx'
import DropDownMenuMobile from '../DropDownMenu/DropDownMenuMobile.tsx'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './MainMobile.css'
import { sendMessage } from '../../telegram.ts'
import { usePropertyData } from '../../API/Context.tsx'


function MainMobile() {
  const [showHero, setShowHero] = useState(true)
  const { language, toggleLanguage } = useLanguage()
  const [menuStates, setMenuStates] = useState<boolean[]>([])
  const [activeStudio, setActiveStudio] = useState<'budva' | 'moscow'>('budva')
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSticky, setSticky] = useState(false)
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const {apartmentData,villaData} = usePropertyData()
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 700)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const handleSubmitForm = async(event) => {
    event.preventDefault();
    try{
       const mes = `Телефон:(${phone})Почта:(${email})Сообщение:(${message})`
      await sendMessage(mes)
    } catch (e){
      console.log(e)
    }
    setEmail("")
    setPhone("")
    setMessage("")
    setShowThankYouMessage(true);
  };
  const handleChange = (e) => {
    const inputValue = e.target.value
    if (inputValue.length <= 500) {
      setMessage(inputValue)
    }
  }

  const handleButtonClick = () => {
    setPopupVisible(true)
  }

  const handlePopupClose = () => {
    setPopupVisible(false)
    setShowThankYouMessage(false)
  }

  const handleStudioToggle = (studio: 'budva' | 'moscow') => {
    setActiveStudio(studio)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHero(false)
    }, 250)

    return () => clearTimeout(timeout)
  }, [])

  const settingsSupplier = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
  }
  const sliderRef = useRef<Slider>(null)

  useEffect(() => {
    const updateTextColor = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        } else {
          entry.target.classList.remove('visible')
        }
      })
    }

    const observer = new IntersectionObserver(updateTextColor, {
      root: null,
      rootMargin: '0px',
      threshold: 0.9, // Порог вхождения (90% видимости элемента)
    })

    const elements = document.querySelectorAll('.para')
    elements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [])
  useEffect(() => {
  
    const updateImagePosition = () => {
      const elements = document.querySelectorAll(
        '.image-animation, .image-animation-2'
      )
      elements.forEach((element: Element) => {
        const htmlElement = element as HTMLElement
        const rect = htmlElement.getBoundingClientRect()
        const isElementVisible = rect.bottom <= window.innerHeight
        if (isElementVisible) {
          htmlElement.style.clipPath = 'none'
        } else {
          const windowHeight = window.innerHeight
          const elementBottomOffset = rect.bottom - windowHeight
          const scrollPercentage = (elementBottomOffset / windowHeight) * 100
          let clipPathValue
          if (htmlElement.classList.contains('image-animation')) {
            clipPathValue = `inset(0 0 0 ${scrollPercentage}%)`
          } else if (htmlElement.classList.contains('image-animation-2')) {
            clipPathValue = `inset(0 ${scrollPercentage}% 0 0)`
          }
          htmlElement.style.clipPath = clipPathValue
        }
      })
    }
    window.addEventListener('scroll', updateImagePosition)
    return () => {
      window.removeEventListener('scroll', updateImagePosition)
    }
  }, [])

  const [isPopupVisibleQuiz, setPopupVisibleQuiz] = useState(false)
  const currentDate = new Date();
  const experienceYears = currentDate.getFullYear() - 2008;
  const handleButtonClickQuiz = () => {
    setPopupVisibleQuiz(!isPopupVisibleQuiz)
  }

  const handlePopupCloseQuiz = () => {
    setPopupVisibleQuiz(false)
  }
  useEffect(() => {
    const wasHomePageVisited = sessionStorage.getItem('wasHomePageVisited')
    if (!wasHomePageVisited) {
      setShowHero(true)
      setTimeout(() => {
        sessionStorage.setItem('wasHomePageVisited', 'true')
      }, 1000)
    } else {
      setShowHero(false)
    }
  }, [])
  return (
    <div className='container'>
      <img
        src='./img/contact-us.png'
        alt='button_circle_up'
        onClick={handleButtonClick}
        className={isSticky ? 'contact-us-mobile' : 'contact-us-hide-mobile'}
      />
      {showHero && (
        <div className={`hero ${showHero ? '' : 'fade-out'}`}>
          <div className='hero-content'>
            <img src='./img/logo.svg' alt='Main-Logo' />
          </div>
        </div>
      )}
      <div className={`content ${showHero ? 'content-faded' : ''}`}>
        <div className='main-section-mobile'>
          <img
            src='./img/main-img-2.jpg'
            alt='right-side-img'
            className='main-mobile-img-back'
          />
          <div className='text-content-mobile'>
            <p className='interior-text-mobile'>
            {language === 'ru'
                ? 'Создаем уникальные интерьеры в Черногории'
                : 'We create unique interiors in Montenegro'}
            </p>
            <p className='interior-description-mobile'>
            {language === 'ru'
                ? 'Стиль, комфорт и функциональность в каждом проекте.'
                : 'Style, comfort and functionality in every project.'}
            </p>
            <button
              className='calculate-btn-mobile'
              onClick={handleButtonClickQuiz}
            >
               {language === 'ru' ? 'Получить консультацию' : 'Get consultation'}
            </button>
          </div>
          {isPopupVisibleQuiz && (
            <PopupQuizMobile
              isPopupVisibleQuiz={isPopupVisibleQuiz}
              handlePopupCloseQuiz={handlePopupCloseQuiz}
            />
          )}
        </div>
      </div>
      <div className='about-us-mobile' id='about'>
        <p className='about-us-text-mobile para'>
          {language === 'ru' ? 'Наша философия' : 'Our philosophy'}
        </p>
        <p className='we-started-text-mobile para'>
        {language === 'ru'
            ? 'Конфиденциальность и бережное отношение к вашему времени – наш приоритет. Мы делаем все, чтобы процесс вашего обустройства стал максимально легким и комфортным'
            : 'Confidentiality and respect for your time are our priority. We do everything to make the process of your arrangement as easy and comfortable as possible'}
        </p>
      </div>
      <div className='grid-container-mobile'>
        <div className='about-us-heading-mobile para'>
          {language === 'ru' ? 'О НАС' : 'ABOUT US'}
        </div>
        <div className='about-us-description-mobile para'>
        {language === 'ru' ? 'За 16 лет работы в Черногории реализовано множество уникальных решений для  жилой недвижимости. Наша студия предоставляет полный спектр услуг – от дизайна интерьера до комплексного обустройства вашего жилья, включая поставку мебели от лучших фабрик Европы.' : 'Over 16 years of work in Montenegro, many unique solutions for residential real estate have been implemented. Our studio provides a full range of services - from interior design to the comprehensive arrangement of your home, including the supply of furniture from the best factories in Europe.'}
        </div>
        <div className='about-us-text-container-mobile'>
          <div>
            <span className='large-digit-in-about-section-mobile para'>{experienceYears}</span>
            <p className='para'>
              {language === 'ru' ? 'лет опыта' : 'years of experience'}
            </p>
          </div>
          <div>
            <span className='large-digit-in-about-section-mobile para'>2</span>
            <p className='para'>
              {language === 'ru'
                ? 'студии в Черногории и Москве'
                : 'studios in Montenegro and Moscow'}
            </p>
          </div>
        </div>
        <div className='about-us-text-container-scnd-mobile'>
          <div>
            <span className='large-digit-in-about-section-mobile para'>
              300+
            </span>
            <p className='para'>
              {language === 'ru' ? 'дизайн-проектов' : 'design projects'}
            </p>
          </div>
          <div>
            <span className='large-digit-in-about-section-mobile para'>
              200
            </span>
            <p className='para'>
              {language === 'ru'
                ? 'фабрик, с которыми мы сотрудничаем'
                : 'factories we cooperate with'}
            </p>
          </div>
        </div>
        <div className='about-image-section-mobile'>
          <img
            src='./img/about-us-img.jpg'
            alt='about-us-img'
            className='image-animation'
          />
        </div>
        <p className='cover-all-questions-mobile '>
          {language === 'ru'
            ? 'СОЗДАЕМ ЭКСКЛЮЗИВНЫЕ ИНТЕРЬЕРЫ ДЛЯ КОМФОРТНОЙ ЖИЗНИ'
            : 'WE CREATE EXCLUSIVE INTERIORS FOR A COMFORTABLE LIFE'}
        </p>
      </div>
      <div className='portfolio-section-mobile' id='portfolio'>
        <div className='rolling-gallery-mobile'>
          <p className='portfolio-heading-mobile para'>
            {language === 'ru' ? 'НАШИ ПРОЕКТЫ' : 'OUR PROJECTS'}
          </p>
          <HousingDetailsMobile type='apartment' data={apartmentData} />
          <a href='/portfolio' className='button-container-mobile'>
            <p className='watch-all-text-mobile para'>
              {language === 'ru' ? 'СМОТРЕТЬ ВСЕ' : 'WATCH ALL'}
            </p>
            <img
              src='./img/Button_circle.png'
              alt='button_circle'
              className='button-image-portfolio-mobile'
            />
          </a>
          {/* <p className='portfolio-heading-mobile para'>{language === 'ru' ? 'ВИЛЛЫ' : 'VILLAS'}</p>
          <HousingDetailsMobile type="villa" data={villaData} />
          <a href="/portfolio" className="button-container-mobile">
            <p className="watch-all-text-mobile para">{language === 'ru' ? 'СМОТРЕТЬ ВСЕ' : 'WATCH ALL'}</p>
            <img src="./img/Button_circle.png" alt="button_circle" className="button-image-portfolio-mobile" />
          </a> */}
          {/* <p className='portfolio-heading-mobile'>{language === 'ru' ? 'КОММЕРЧЕСКАЯ НЕДВИЖИМОСТЬ' : 'COMMERCIAL REAL ESTATE'}</p>
          <HousingDetailsMobile type="commercial" data={commercialData} />
          <a href="/portfolio" className="button-container-mobile">
            <p className="watch-all-text-mobile">{language === 'ru' ? 'СМОТРЕТЬ ВСЕ' : 'WATCH ALL'}</p>
            <img src="./img/Button_circle.png" alt="button_circle" className="button-image-portfolio-mobile" />
          </a> */}
        </div>
      </div>
      <div className='services-section-mobile' id='services'>
        <div className='services-header-mobile'>
          <p className='para'>{language === 'ru' ? 'УСЛУГИ' : 'SERVICES'}</p>
        </div>
        <>
          <DropDownMenuMobile
            digit='01'
            img='./img/services-1.jpg'
            title={
              language === 'ru'
                ? 'ДИЗАЙН-ПРОЕКТИРОВАНИЕ'
                : 'DESIGN AND PLANNING'
            }
            content={[
              language === 'ru'
                ? 'Обсуждение проекта с клиентом (оффлайн или онлайн) и составление технического задания'
                : 'Discussion with the client regarding the project (offline or online) and drafting of the technical task',
              language === 'ru'
                ? 'Выбор оптимального пакета по проектированию'
                : 'Selection of the optimal design package',
              language === 'ru'
                ? 'Заключение договора на проектирование'
                : 'Signing a contract for design services',
              language === 'ru'
                ? 'Выезд на замер и съемку объекта'
                : 'Site visit for measurements and surveying of the object',
              language === 'ru'
                ? 'Разработка планировочного решения'
                : 'Development of layout solutions',
              language === 'ru'
                ? 'Создание стилистической концепции проекта (3D визуализация или коллаж, в зависимости от выбранного пакета)'
                : 'Creation of a stylistic concept for the project (3D visualization or collage, depending on the selected package)',
              language === 'ru'
                ? 'Разработка рабочих чертежей по выбранному пакету'
                : 'Development of working drawings according to the selected package',
              language === 'ru'
                ? 'Подбор и спецификация отделочных материалов, мебели, освещения и предметов интерьера (в соответствии с выбранным пакетом)'
                : 'Selection and specification of finishing materials, furniture, lighting, and interior items (in accordance with the selected package)',
              language === 'ru'
                ? 'Сдача клиенту готового проекта'
                : 'Delivery of the finished project to the client',
              language === 'ru'
                ? 'Закрытие этапа Проектирование и переход к реализации проекта и заказу товаров по спецификации'
                : 'Closing of the Design stage and transitioning to project implementation and ordering of goods according to the specification',
            ]}
            menuStates={menuStates}
            setMenuStates={setMenuStates}
            price={language === 'ru' ? `От 30 €/М²` : `From 30 €/M²`}
          />
          <DropDownMenuMobile
            digit='02'
            img='./img/services-2.jpg'
            title={
              language === 'ru'
                ? `СТИЛИСТИЧЕСКИЙ ПОДБОР\nИ ПОСТАВКА МЕБЕЛИ`
                : `STYLISTIK SELECTION AND DELIVERY OF FURNITURE`
            }
            content={[
              language === 'ru'
                ? 'Обсуждение объема работ с клиентом (оффлайн или онлайн) и составление технического задания'
                : 'Discussion of the scope of work with the client (offline or online) and drafting of the technical task',
              language === 'ru'
                ? 'Заключение договора на проектирование'
                : 'Signing a contract for design services',
              language === 'ru'
                ? 'Выезд на замер и съемку объекта'
                : 'Site visit for measurements and surveying of the object',
              language === 'ru'
                ? 'Эскизный проект интерьера с определением функциональных зон и вариантами расстановки мебели (2 планировочных решений)'
                : 'Conceptual interior design with identification of functional zones and furniture layout options (2 layout solutions)',
              language === 'ru'
                ? 'Создание стилистической концепции проекта (коллажи интерьера по зонам)'
                : 'Creation of a stylistic concept for the project (interior collages by zones)',
              language === 'ru'
                ? 'Подбор мебели, освещения, текстиля и предметов интерьера из ассортимента студии (с учетом проектов кухни и корпусной мебели)'
                : 'Selection of furniture, lighting, textiles, and interior items from the studio assortment (taking into account kitchen and built-in furniture projec',
              language === 'ru'
                ? 'Закрытие этапа по проектированию и переход в этап заказов'
                : 'Closing of the design stage and transition to the ordering stage',
              language === 'ru'
                ? 'Заказ согласованных позиций мебели, освещения, текстиля и предметов интерьера'
                : 'Ordering of agreed furniture, lighting, textiles, and interior items',
            ]}
            menuStates={menuStates}
            setMenuStates={setMenuStates}
            price={language === 'ru' ? `От 15 €/М²` : `From 15 €/M²`}
          />
          <DropDownMenuMobile
            digit='03'
            img='./img/services-3.jpg'
            title={
              language === 'ru'
                ? `СОПРОВОЖДЕНИЕ РЕМОНТНЫХ\nРАБОТ`
                : `SUPERVISION OF REPAIR WORCKS`
            }
            content={[
              language === 'ru'
                ? 'Встреча с бригадой (от студии или от заказчика) и обсуждение работ по проекту, разработанному нашей студией'
                : 'Meeting with the team (from the studio or the client) to discuss the project works developed by our studio',
              language === 'ru'
                ? 'Согласованные выезды дизайнера на объект для контроля за ходом этапов ремонта в соответствии с проектом (не более 2-х раз в неделю)'
                : 'Agreed visits of the designer to the site to monitor the progress of the renovation stages in accordance with the project (no more than 2 times per week)',
              language === 'ru'
                ? 'Информирование заказчика о ходе работ на объекте (фото- и видео-фиксация)'
                : 'Informing the client about the progress of the works on the site (photo and video documentation)',
              language === 'ru'
                ? 'Консультация бригады по вопросам проекта (онлайн или оффлайн: в студии или на объекте во время выезда)'
                : 'Consultation of the team on project-related questions (online or offline: at the studio or on the site during visits)',
              language === 'ru'
                ? 'Ведение графика закупок материалов для заказчика'
                : 'Maintaining a schedule of material purchases for the client',
              language === 'ru'
                ? 'Своевременная закупка или контроль за сроками закупки необходимых чистовых материалов для проведения ремонтных работ по проекту'
                : 'Timely procurement or monitoring of the deadlines for the procurement of necessary finishing materials for carrying out repair works according to the project',
              language === 'ru'
                ? 'Закрытие этапа Сопровождение и переход в этап комплектации объекта мебелью, освещением, текстилем и предметами интерьера'
                : 'Closing of the Support stage and transition to the Furnishing stage of the project with furniture, lighting, textiles, and interior items',
            ]}
            menuStates={menuStates}
            setMenuStates={setMenuStates}
            price={language === 'ru' ? `От 30 € выезд` : `From 30 € visit`}
          />
        </>
      </div>
      <div className='selection-section-mobile' id='selection'>
        <p className='selection-head-mobile para'>
          {language === 'ru' ? `ПОДБОР МЕБЕЛИ` : `FURNITURE SELECTION`}
        </p>
        <div className='selection-container-mobile'>
          <div className='selection-image-mobile'>
            <img
              src='./img/furnuture-selection.jpg'
              alt='furnuture-selection'
              className='furnuture-selection-image-mobile image-animation-2'
            />
            <p className='selection-text-mobile para'>
            {language === 'ru'
                ? `МЫ НАЙДЕМ МЕБЕЛЬ И ПРЕДМЕТЫ ИНТЕРЬЕРА ПОД ЛЮБОЙ ВАШ ЗАПРОС`
                : `WE WILL FIND FURNITURE AND INTERIOR ITEMS FOR ANY OF YOUR NEEDS`}
            </p>
          </div>
          <p className='selection-text-after-image-mobile para'>
          {language === 'ru'
              ? `Подбор мебели ведут опытные дизайнеры и проектировщики, поэтому выбранная мебель идеально впишется в интерьер как по стилю, так и по функционалу`
              : `The selection of furniture is carried out by experienced designers and planners, so the selected furniture will fit perfectly into the interior both in style and functionality`}
          </p>
          <div className='selection-right-mobile'>
            <img
              src='./img/real-estate.png'
              alt='furnuture-selection-scnd'
              className='furnuture-selection-scnd-mobile image-animation'
            />
            <p className='para'>
            {language === 'ru'
                ? `Мы работаем с большим количеством фабрик и подбираем мебель в соответствии с вашим бюджетом и индивидуальными предпочтениями`
                : `We collaborate with a lot of factories and select furniture according to your budget and individual preferences`}
            </p>
          </div>
        </div>
        <div className='selection-suppliers-mobile'>
          <p className='selection-head-mobile para'>
            {language === 'ru' ? 'НАШИ ПОСТАВЩИКИ' : 'OUR SUPPLIERS'}
          </p>
          <Slider {...settingsSupplier} ref={sliderRef}>
            <Supplier id={1} photoUrl='/img/supplier.jpg' />
            <Supplier id={2} photoUrl='/img/supplier1.jpg' />
            <Supplier id={3} photoUrl='/img/supplier2.jpg' />
            <Supplier id={4} photoUrl='/img/supplier3.jpg' />
            <Supplier id={5} photoUrl='/img/supplier4.jpg' />
            <Supplier id={6} photoUrl='/img/supplier5.jpg' />
            <Supplier id={7} photoUrl='/img/supplier6.jpg' />
          </Slider>
        </div>
      </div>
      <div className='contacts-section-mobile' id='contacts'>
        <p className='contacts-head-mobile para'>
          {language === 'ru' ? 'КОНТАКТЫ' : 'CONTACTS'}
        </p>
        <div className='studio-toggle-container-mobile'>
          <div className='studio-toggle-mobile'>
            <button
              className={activeStudio === 'budva' ? 'active' : ''}
              onClick={() => handleStudioToggle('budva')}
            >
              {language === 'ru' ? 'Студия в Будве' : 'Studio in Budva'}
            </button>
            {/* <button
              className={activeStudio === 'moscow' ? 'active' : ''}
              onClick={() => handleStudioToggle('moscow')}
            >
              {language === 'ru' ? 'Студия в Москве' : 'Studio in Moscow'}
            </button> */}
          </div>
        </div>
        {activeStudio === 'budva' && (
          <div className='contacts-budva-mobile'>
            <div className='first-string-mobile'>
              <div>
                <img
                  src='./img/skype-contacts.png'
                  alt='skype-contacts'
                  className='img-contacts-svg-mobile '
                />
                <p>maro-budva</p>
              </div>
              <div>
                <img
                  src='./img/phone-contacts.png'
                  alt='phone-contacts'
                  className='img-contacts-svg-mobile '
                />
                <p>382 69 772-002</p>
              </div>
              <div>
                <img
                  src='./img/house-contacts.png'
                  alt='house-contacts'
                  className='img-contacts-svg-mobile '
                />
                <p>
                  {language === 'ru'
                    ? '85310, Черногория, Будва, район «Яз»'
                    : '85310, Montenegro, Budva, district "Yaz"'}
                </p>
              </div>
              <div>
                <img
                  src='./img/clock-contacts.png'
                  alt='clock-contacts'
                  className='img-contacts-svg-mobile '
                />
                <p>
                  {language === 'ru'
                    ? 'ПН-СБ: 10.00-19.00'
                    : 'MN-ST: 10.00-19.00'}
                </p>
              </div>
              <div>
                <img
                  src='./img/mail-contacts.png'
                  alt='mail-contacts'
                  className='img-contacts-svg-mobile'
                />
                <p className='para'>info@maro-mebel.ru</p>
              </div>
            </div>
            <div className='map-container-mobile'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d94439.72982386431!2d18.654983!3d42.2947109!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134dd4acdc9b0567%3A0x4c64c84e8314bac9!2sSalon%20Maro!5e0!3m2!1sru!2s!4v1718190803557!5m2!1sru!2s" width="100%" height="450"  loading="lazy" ></iframe>
            </div>
          </div>
        )}
        {activeStudio === 'moscow' && (
          <div className='contacts-moscow-mobile'>
            <div className='first-string-mobile'>
              <div>
                <img
                  src='./img/skype-contacts.png'
                  alt='skype-contacts'
                  className='img-contacts-svg-mobile '
                />
                <p>maro-budva</p>
              </div>
              <div>
                <img
                  src='./img/phone-contacts.png'
                  alt='phone-contacts'
                  className='img-contacts-svg-mobile '
                />
                <p>382 69 772-002</p>
              </div>
              <div>
                <img
                  src='./img/house-contacts.png'
                  alt='house-contacts'
                  className='img-contacts-svg-mobile'
                />
                <p>85310, Россия, Москва, район «Яз»</p>
              </div>
              <div>
                <img
                  src='./img/clock-contacts.png'
                  alt='clock-contacts'
                  className='img-contacts-svg-mobile '
                />
                <p>ПН-СБ: 10.00-19.00</p>
              </div>
              <div>
                <img
                  src='./img/mail-contacts.png'
                  alt='mail-contacts'
                  className='img-contacts-svg-mobile '
                />
                <p>info@maro-mebel.ru</p>
              </div>
            </div>
            <div className='map-container-mobile'>
              <iframe
                title='Yandex Map'
                src='https://yandex.ru/maps/org/salon_maro/136805901235/?ll=37.568071%2C55.789197&mode=search&sctx=ZAAAAAgBEAAaKAoSCd9vtOOGs05AEUDdQIF3lEtAEhIJ4nMn2H8d5z8ReIAnLVxWzT8iBgABAgMEBSgKOABAmJIHSABqAnJ1nQHNzEw9oAEAqAEAvQH1CI%2B0wgEGs8eR0v0D6gEA8gEA%2BAEAggIKc2Fsb24gbWFyb4oCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=37.568071%2C55.789197&sspn=0.006133%2C0.001915&text=salonmaro&z=17.88'
                width='100%'
                frameBorder='0'
                height='100%'
                allowFullScreen
              />
            </div>
          </div>
        )}
        <div className='contacts-container-button-and-links-mobile'>
          <div className='contacts-container-links-mobile'>
            <div className='contacts-a-links-mobile'>
              <a href="https://www.instagram.com/salonmaro_home/" className="contacts-in-mobile">
              <img src='./img/ri_instagram-fill.png' alt='in-im' />
              </a>
              <a href="viber://chat?number=%2B38269772002" className="contacts-vi-mobile">
              <img src='./img/basil_viber-solid.png' alt='vi-im' />
              </a>
              <a href="https://t.me/maro_montenegro" className="contacts-tg-mobile">
              <img src='./img/ic_baseline-telegram.png' alt='tg-im' />
              </a>
              <a href='https://wa.me/38269772002' className="contacts-wa-mobile">
              <img src='./img/ri_whatsapp-fill.png' alt='wa-im' />
              </a>
            </div>
          </div>
          <div className='button-container-contacts-mobile'>
            <p
              className='button-container-contacts-text-mobile'
              onClick={scrollToTop}
            >
              {language === 'ru' ? 'Наверх' : 'Up'}
            </p>
            <img
              src='./img/arrow-small-up.png'
              alt='button_circle'
              className='button-up-contacts-mobile'
              onClick={scrollToTop}
            />
          </div>
          {isPopupVisible && (
            <div className='popup-overlay-mobile' onClick={handlePopupClose}>
              <div
                className='popup-content-mobile'
                onClick={(e) => e.stopPropagation()}
              >
                {showThankYouMessage ? (
            <div className='thank-you-message' >
               <img
                loading='lazy'
                src='./img/close-button.png'
                alt='close-button-overlay'
                className='close-button'
                onClick={handlePopupClose}
              />
            <p style={{fontSize:"5.5vw"}}>
              {language === 'ru'
                ? 'Спасибо! '
                : 'Thank you!'}
            </p>
            <p style={{maxWidth:'50vw'}}>
              {language === 'ru'
                ? 'Мы свяжемся с Вами в ближайшее время!'
                : 'We will contact you soon!'}
            </p>
          </div>
          ) : (
                <><p className='popup-overlay-text-mobile'>
                      {language === 'ru' ? 'СВЯЖИТЕСЬ С НАМИ' : 'CONTACT US'}
                    </p><img
                        src='./img/close-button.png'
                        alt='close-button-overlay'
                        className='close-button-mobile'
                        onClick={handlePopupClose} />
                        <form onSubmit={handleSubmitForm}>
                        <div className='popup-content-form-mobile'>
                          <div className='popup-mail-phone-mobile'>
                            <div>
                              <p>{language === 'ru' ? 'Ваша почта' : 'Your email'}</p>
                              <label>
                                <input
                                  type='email'
                                  name='email'
                                  value={email}
                                  onChange={handleEmailChange}
                                  placeholder={language === 'ru'
                                    ? 'На эту почту придет ответ'
                                    : 'The answer will be sent to this email'}
                                  className='input-mail-mobile' />
                              </label>
                              <p>
                                {language === 'ru'
                                  ? 'Ваш телефон'
                                  : 'Your phone number'}
                              </p>
                              <label>
                                <input
                                  type='tel'
                                  name='phone'
                                  value={phone}
                                  onChange={handlePhoneChange}
                                  className='input-phone-mobile' />
                              </label>
                            </div>
                          </div>

                          <p className='message'>
                            {language === 'ru' ? 'Ваше сообщение' : 'Your message'}
                          </p>

                          <label className='label-container-mobile'>
                            <textarea
                              name='message'
                              value={message}
                              onChange={handleChange}
                              maxLength={225}
                              placeholder={language === 'ru'
                                ? 'Опишите в нескольких предложениях ваш вопрос..'
                                : 'Describe your question in a few sentences..'}
                              className='input-message-mobile' />
                            <span className='char-count-mobile'>
                              {message.length}/225
                            </span>
                          </label>
                          <button
                            type='submit'
                            className='popup-content-button-mobile'
                          >
                            {language === 'ru' ? 'Отправить' : 'Send'}
                          </button>
                        </div>
                      </form></>
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainMobile
