import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../components/Language.tsx'
import commercialData from '../Portfolio/Commercial/Commercial.tsx'
import Supplier from '../Suppliers.tsx'
import HousingDetails from '../HousingDetails.tsx'
import DropDownMenu from '../DropDownMenu/DropDownMenu.tsx'
import PopupQuiz from './popUpQuiz.tsx'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Main.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import HorizontalSection from '../../components/Horizontal_section/HorizontalSection.tsx'
import { useInView } from 'react-intersection-observer'
import { sendMessage } from '../../telegram.ts'
import createPropertyData from '../../API/Api.ts'

function Main() {
  const currentDate = new Date();
  const experienceYears = currentDate.getFullYear() - 2008;
  
  const [showHero, setShowHero] = useState(true)
  const { language, toggleLanguage } = useLanguage()
  const [menuStates, setMenuStates] = useState<boolean[]>([])
  const [activeStudio, setActiveStudio] = useState<'budva' | 'moscow'>('budva')
  const [isPopupVisible, setPopupVisible] = useState(false)
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSticky, setSticky] = useState(false)
  const [refAbout, inViewAbout] = useInView({ threshold: 0.7 })
  const [isPopupVisibleQuiz, setPopupVisibleQuiz] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const handleButtonClickQuiz = () => {
    setPopupVisibleQuiz(!isPopupVisibleQuiz)
  }
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const handlePopupCloseQuiz = () => {
    setPopupVisibleQuiz(false)
  }
  
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 1000)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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

  const handleLanguageToggle = () => {
    toggleLanguage()
  }
 
  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setShowHero(false)
    }, 2000)

    return () => clearTimeout(initialTimeout)
  }, [])

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
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

  const settingsSupplier = {
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
  }
  const sliderRef = useRef<Slider>(null)
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext()
    }
  }
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev()
    }
  }

  useEffect(() => {
    const img = document.querySelector('.top-to-bottom-animation')
    if (img) {
      img.classList.add('active')
    }
  }, [])

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
      threshold: 0.9,
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
    const hash = window.location.hash
    if (hash && sectionRef.current) {
      const targetSectionId = hash.substring(1)
      const targetSection = document.getElementById(targetSectionId)
      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
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

  return (
    <div>
      <div className={`hero ${showHero ? '' : 'fade-out'}`}>
        <div className='hero-content'>
          <img  src='./img/logo.svg' alt='Main-Logo' />
        </div>
      </div>
      <div className={`content ${showHero ? 'content-faded' : ''}`}>
        <div className='left-side'>
          <div className='centered-content'>
            <img 
              src='./img/main-img-1.jpg'
              alt='left-side-img'
              className='top-to-bottom-animation'
            />
          </div>
          <div className='text-content'>
            <p className='interior-text'>
              {language === 'ru'
                ? 'Создаем уникальные интерьеры в Черногории'
                : 'We create unique interiors in Montenegro'}
            </p>
            <p className='interior-description'>
              {language === 'ru'
                ? 'Стиль, комфорт и функциональность в каждом проекте.'
                : 'Style, comfort and functionality in every project.'}
            </p>
            <button className='calculate-btn' onClick={handleButtonClickQuiz}>
              {language === 'ru' ? 'Получить консультацию' : 'Get consultation'}
            </button>
            {isPopupVisibleQuiz && (
              <PopupQuiz
                isPopupVisibleQuiz={isPopupVisibleQuiz}
                handlePopupCloseQuiz={handlePopupCloseQuiz}
              />
            )}
          </div>
        </div>
        <div className='right-side'>
          <img 
            src='./img/main-img-2.jpg'
            alt='right-side-img'
            className='right-to-left-animation'
          />
          <div className='language-switch' onClick={handleLanguageToggle}>
            <div className={language === 'ru' ? 'active' : ''}>RU</div>
            <div className={language === 'en' ? 'active' : ''}>EN</div>
          </div>
        </div>
      </div>
      <div className='about-us' id='about' ref={refAbout}>
        <img loading='lazy'
          src='./img/buttuon_up.png'
          alt='button_circle_up'
          onClick={scrollToTop}
          className={isSticky ? 'button-up' : 'button-up-hide'}
        />
        <p
          className={
            inViewAbout ? 'about-us-text para visible' : 'about-us-text para'
          }
        >
          {language === 'ru' ? 'Наша философия' : 'Our philosophy'}
        </p>
        <p
          className={
            inViewAbout
              ? 'we-started-text para visible'
              : 'we-started-text para'
          }
        >
          {language === 'ru'
            ? 'Конфиденциальность и бережное отношение к вашему времени – наш приоритет. Мы делаем все, чтобы процесс вашего обустройства стал максимально легким и комфортным'
            : 'Confidentiality and respect for your time are our priority. We do everything to make the process of your arrangement as easy and comfortable as possible'}
        </p>
      </div>
      <div ref={sectionRef} className='grid-container'>
        <div className='about-us-heading para'>
          {language === 'ru' ? 'О НАС' : 'ABOUT US'}
        </div>
        <div className='about-us-description'>
              {language === 'ru' ? 'За 16 лет работы в Черногории реализовано множество уникальных решений для  жилой недвижимости. Наша студия предоставляет полный спектр услуг – от дизайна интерьера до комплексного обустройства вашего жилья, включая поставку мебели от лучших фабрик Европы.' : 'Over 16 years of work in Montenegro, many unique solutions for residential real estate have been implemented. Our studio provides a full range of services - from interior design to the comprehensive arrangement of your home, including the supply of furniture from the best factories in Europe.'}
        </div>

        <div className='about-us-text-container'>
          <div>
            <span className='large-digit-in-about-section para'>{experienceYears}</span>
            <p className='para'>
              {language === 'ru' ? 'лет опыта' : 'years of experience'}
            </p>
          </div>
          <div>
            <span className='large-digit-in-about-section para'>2</span>
            <p className='para'>
              {language === 'ru'
                ? 'студии в Черногории и Москве'
                : 'studios in Montenegro and Moscow'}
            </p>
          </div>
        </div>
        <div className='about-us-text-container-scnd'>
          <div>
            <span className='large-digit-in-about-section para'>300+</span>
            <p className='para'>
              {language === 'ru' ? 'дизайн-проектов' : 'design projects'}
            </p>
          </div>
          <div>
            <span className='large-digit-in-about-section para'>200</span>
            <p className='para'>
              {language === 'ru'
                ? 'фабрик, с которыми\nмы сотрудничаем'
                : 'factories we cooperate with'}
            </p>
          </div>
        </div>
        <div className='about-image-section'>
        <LazyLoadImage
                                    src='./img/about-us-img.jpg'
                                    alt='about-us-img'
                                    effect='blur'
                                    className='image-animation'
                                />
          {/* <img loading='lazy'
            src='./img/about-us-img.jpg'
            alt='about-us-img'
            className='image-animation'
          /> */}
          <h5 className='cover-all-questions para'>
          {language === 'ru'
            ? 'СОЗДАЕМ ЭКСКЛЮЗИВНЫЕ ИНТЕРЬЕРЫ ДЛЯ КОМФОРТНОЙ ЖИЗНИ'
            : 'WE CREATE EXCLUSIVE INTERIORS FOR A COMFORTABLE LIFE'}
          </h5>
        </div>
      </div>
      <div className='portfolio-section' id='portfolio' ref={sectionRef}>
        <div>
          <HorizontalSection />
        </div>
        <a href='/portfolio' className='button-container'>
          <p className='watch-all-text para'>
            {language === 'ru' ? 'СМОТРЕТЬ ВСЕ' : 'WATCH ALL'}
          </p>
          <img loading='lazy'
            src='./img/Button_circle.png'
            alt='button_circle'
            className='button-image-portfolio'
          />
        </a>
      </div>
      <div className='services-section' id='services' ref={sectionRef}>
        <div className='services-header'>
          <p>{language === 'ru' ? 'УСЛУГИ' : 'SERVICES'}</p>
        </div>
        <>
          <DropDownMenu
            img='./img/services-1.jpg'
            title={
              language === 'ru'
                ? '01  ДИЗАЙН-ПРОЕКТИРОВАНИЕ'
                : '01  DESIGN AND PLANNING'
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
            buttonIs={false}
          />
          <DropDownMenu
            img='./img/services-2.jpg'
            title={
              language === 'ru'
                ? `02  СТИЛИСТИЧЕСКИЙ ПОДБОР И ПОСТАВКА МЕБЕЛИ`
                : `02  STYLISTIK SELECTION AND DELIVERY OF FURNITURE`
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
            buttonIs={false}
          />
          <DropDownMenu
            img='./img/services-3.jpg'
            title={
              language === 'ru'
                ? `03  СОПРОВОЖДЕНИЕ РЕМОНТНЫХ РАБОТ`
                : `03  SUPERVISION OF REPAIR WORCKS`
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
            buttonIs={true}
          />
        </>
      </div>
      <div className='selection-section' id='selection' ref={sectionRef}>
        <p className='selection-head para'>
          {language === 'ru' ? `ПОДБОР МЕБЕЛИ` : `FURNITURE SELECTION`}
        </p>
        <div className='selection-container'>
          <div className='selection-image'>
            <img loading='lazy'
              src='./img/furnuture-selection.jpg'
              alt='furnuture-selection'
              className='furnuture-selection-image image-animation-2'
            />
            <p className='selection-text para'>
              {language === 'ru'
                ? `МЫ НАЙДЕМ МЕБЕЛЬ И ПРЕДМЕТЫ ИНТЕРЬЕРА ПОД ЛЮБОЙ ВАШ ЗАПРОС`
                : `WE WILL FIND FURNITURE AND INTERIOR ITEMS FOR ANY OF YOUR NEEDS`}
            </p>
          </div>
          <p className='selection-text-after-image para'>
            {language === 'ru'
              ? `Подбор мебели ведут опытные дизайнеры и проектировщики, поэтому выбранная мебель идеально впишется в интерьер как по стилю, так и по функционалу`
              : `The selection of furniture is carried out by experienced designers and planners, so the selected furniture will fit perfectly into the interior both in style and functionality`}
          </p>
          <div className='selection-right'>
            <img loading='lazy'
              src='./img/furnuture-selection-scnd.jpeg'
              alt='furnuture-selection-scnd'
              className='furnuture-selection-scnd image-animation'
            />
            <p className='para'>
              {language === 'ru'
                ? `Мы работаем с большим количеством фабрик и подбираем мебель в соответствии с вашим бюджетом и индивидуальными предпочтениями`
                : `We collaborate with a lot of factories and select furniture according to your budget and individual preferences`}
            </p>
          </div>
        </div>
        <div className='selection-suppliers'>
          <p className='selection-head para'>
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
            <Supplier id={8} photoUrl='/img/supplier.jpg' />
            <Supplier id={9} photoUrl='/img/supplier1.jpg' />
            <Supplier id={10} photoUrl='/img/supplier2.jpg' />
          </Slider>
        </div>
        <img loading='lazy'
          src='/img/button-supp.png'
          alt='button-supp'
          className='button-supp'
          onClick={handleNext}
        />
        <img loading='lazy'
          src='/img/button-supp-prev.png'
          alt='button-supp'
          className='button-supp-prev'
          onClick={handlePrev}
        />
      </div>
      <div className='contacts-section' id='contacts' ref={sectionRef}>
        <p className='contacts-head'>
          {language === 'ru' ? 'КОНТАКТЫ' : 'CONTACTS'}
        </p>
        <div className='studio-toggle-container'>
          <div className='studio-toggle'>
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
          <div className='logo-container'>
            <img loading='lazy'
              src='./img/logo-contacts.png'
              alt='logo-contacts'
              className='logo-contacts'
            />
          </div>
        </div>
        {activeStudio === 'budva' && (
          <div className='contacts-budva'>
            <div className='first-string'>
              <div>
                <img loading='lazy'
                  src='./img/skype-contacts.png'
                  alt='skype-contacts'
                  className='img-contacts-svg'
                />
                <p>maro-budva</p>
              </div>
              <div>
                <img loading='lazy'
                  src='./img/phone-contacts.png'
                  alt='phone-contacts'
                  className='img-contacts-svg'
                />
                <p>382 69 772-002</p>
              </div>
              <div>
                <img loading='lazy'
                  src='./img/house-contacts.png'
                  alt='house-contacts'
                  className='img-contacts-svg'
                />
                <p>
                  {language === 'ru'
                    ? '85310, Черногория, Будва, район «Яз»'
                    : '85310, Montenegro, Budva, district "Yaz"'}
                </p>
              </div>
            </div>
            <div className='second-string'>
              <div>
                <img loading='lazy'
                  src='./img/clock-contacts.png'
                  alt='clock-contacts'
                  className='img-contacts-svg'
                />
                <p>
                  {language === 'ru'
                    ? 'ПН-СБ: 10.00-19.00'
                    : 'MN-ST: 10.00-19.00'}
                </p>
              </div>
              <div>
                <img loading='lazy'
                  src='./img/mail-contacts.png'
                  alt='mail-contacts'
                  className='img-contacts-svg'
                />
                <p>info@maro-mebel.ru</p>
              </div>
            </div>
            <div className='map-container'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d94439.72982386431!2d18.654983!3d42.2947109!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134dd4acdc9b0567%3A0x4c64c84e8314bac9!2sSalon%20Maro!5e0!3m2!1sru!2s!4v1718190803557!5m2!1sru!2s" width="100%" height="450"  loading="lazy" ></iframe>
            </div>
          </div>
        )}
        {activeStudio === 'moscow' && (
          <div className='contacts-moscow'>
            <div className='first-string'>
              <div>
                <img loading='lazy'
                  src='./img/skype-contacts.png'
                  alt='skype-contacts'
                  className='img-contacts-svg'
                />
                <p>maro-budva</p>
              </div>
              <div>
                <img loading='lazy'
                  src='./img/phone-contacts.png'
                  alt='phone-contacts'
                  className='img-contacts-svg'
                />
                <p>382 69 772-002</p>
              </div>
              <div>
                <img loading='lazy'
                  src='./img/house-contacts.png'
                  alt='house-contacts'
                  className='img-contacts-svg '
                />
                <p>85310, Россия, Москва, район «Яз»</p>
              </div>
            </div>
            <div className='second-string'>
              <div>
                <img loading='lazy'
                  src='./img/clock-contacts.png'
                  alt='clock-contacts'
                  className='img-contacts-svg'
                />
                <p>ПН-СБ: 10.00-19.00</p>
              </div>
              <div>
                <img loading='lazy'
                  src='./img/mail-contacts.png'
                  alt='mail-contacts'
                  className='img-contacts-svg'
                />
                <p>info@maro-mebel.ru</p>
              </div>
            </div>
            <div className='map-container'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d94439.72982386431!2d18.654983!3d42.2947109!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134dd4acdc9b0567%3A0x4c64c84e8314bac9!2sSalon%20Maro!5e0!3m2!1sru!2s!4v1718190803557!5m2!1sru!2s" width="600" height="450"  loading="lazy" ></iframe>
            </div>
          </div>
        )}
        <div className='contacts-container-button-and-links'>
          <br />
          <div className='contacts-container-links'>
            <div
              className='button-container-contacts'
              onClick={handleButtonClick}
            >
              <p className='button-container-contacts-text para'>
                {language === 'ru' ? 'СВЯЖИТЕСЬ С НАМИ' : 'CONTACT US'}
              </p>
              <img loading='lazy'
                src='./img/Button_circle.png'
                alt='button_circle'
                className='button-image-contacts'
              />
            </div>
            <div className='contacts-a-links'>
              <svg
                width='4vw'
                height='4vw'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <a href='https://wa.me/38269772002'>
                  <image
                    xlinkHref='./img/whatsapp.svg'
                    width='24'
                    height='24'
                  />
                </a>
              </svg>
              <svg
                width='4vw'
                height='4vw'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <a href='https://t.me/maro_montenegro'>
                  <image
                    xlinkHref='./img/telegram.svg'
                    width='24'
                    height='24'
                  />
                </a>
              </svg>
              <svg
                width='4vw'
                height='4vw'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <a href=' https://www.instagram.com/salonmaro_home/'>
                  <image
                    xlinkHref='./img/instagram.svg'
                    width='24'
                    height='24'
                  />
                </a>
              </svg>
              <svg
                width='4vw'
                height='4vw'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <a href='viber://chat?number=%2B38269772002'>
                  <image xlinkHref='./img/viber.svg' width='24' height='24' />{' '}
                </a>
              </svg>
            </div>
          </div>

          {isPopupVisible && (
        <div className='popup-overlay' onClick={handlePopupClose}>
          <div
            className='popup-content'
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
              <>
             
              <p className='popup-overlay-text'>
                {language === 'ru' ? 'СВЯЖИТЕСЬ С НАМИ' : 'CONTACT US'}
              </p>
              <img
                loading='lazy'
                src='./img/close-button.png'
                alt='close-button-overlay'
                className='close-button'
                onClick={handlePopupClose}
              />
              <form onSubmit={handleSubmitForm}>
                <div className='popup-mail-phone'>
                  <div>
                    <p>{language === 'ru' ? 'Ваша почта' : 'Your email'}</p>
                    <label>
                      <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleEmailChange}
                        placeholder={
                          language === 'ru'
                            ? 'На эту почту придет ответ'
                            : 'The answer will be sent to this email'
                        }
                        className='input-mail'
                      />
                    </label>
                  </div>
                  <div>
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
                        className='input-phone'
                      />
                    </label>
                  </div>
                </div>
                <p>{language === 'ru' ? 'Ваше сообщение' : 'Your message'}</p>
                <label className='label-container'>
                  <textarea
                    name='message'
                    value={message}
                    onChange={handleMessageChange}
                    maxLength={500}
                    placeholder={
                      language === 'ru'
                        ? 'Опишите в нескольких предложениях ваш вопрос..'
                        : 'Describe your question in a few sentences..'
                    }
                    className='input-message'
                  />
                  <span className='char-count'>{message.length}/500</span>
                </label>
                <button type='submit' className='popup-content-button'>
                  {language === 'ru' ? 'Отправить' : 'Send'}
                </button>
              </form>
              </>
          )}
        </div>
        </div>
      )}
        </div>
      </div>
    
      </div>
      )
}

export default Main
