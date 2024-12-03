import React, {useEffect, useRef, useState} from "react";
import { NavLink, useParams} from "react-router-dom";
import {useLanguage} from "../../components/Language.tsx";
import commercialData from "../Portfolio/Commercial/Commercial.tsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RealEstateDetailsMobile.css";
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { usePropertyData } from "../../API/Context.tsx";
import createPropertyData from "../../API/Api.ts";

const RealEstateDetailsMobile = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState<
        "commercial" | "apartment" | "villa"
    >("apartment");
    const [message, setMessage] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(
        null
    );
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const {apartmentData,villaData} = usePropertyData()
    const openLightbox = (index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };
    const {language} = useLanguage();
    const [dataLoaded, setDataLoaded] = useState(false);

    const {type, id} = useParams();
   
    const handleChange = e => {
        const inputValue = e.target.value;
        if (inputValue.length <= 500) {
            setMessage(inputValue);
        }
    };

    const handleButtonClick = () => {
        setPopupVisible(true);
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const settingsRealEstate = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false
    };

    const settingsSimilarProjects = {
        infinite: true,
        slidesToShow: 1.05,
        slidesToScroll: 1,
        arrows: false
    };

    const sliderRef = useRef<Slider>(null);
    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };
    useEffect(() => {
        if (villaData.length === 0 && apartmentData.length === 0) {
            createPropertyData().then(() => {
                setTimeout(() => {
                    setDataLoaded(true);
                }, 400);
            });
        } else {
            setDataLoaded(true);
        }
    }, [villaData, apartmentData]);
    let data;
    switch (type) {
        case "commercial":
            data = commercialData;
            break;
        case "apartments":
            data = apartmentData;
            break;
        case "villas":
            data = villaData;
            break;
        default:
            data = [];
    }

    const handleClick = () => {
        window.scrollTo({
            top: 0
        });
    };

    useEffect(() => {
        const updateTextColor = () => {
            const elements = document.querySelectorAll(".para");
            elements.forEach((element: Element) => {
                const rect = (
                    element as HTMLElement
                ).getBoundingClientRect();
                const isElementVisible = rect.bottom <= 720;

                if (isElementVisible) {
                    element.classList.add("visible");
                } else {
                    element.classList.remove("visible");
                }
            });
        };

        window.addEventListener("scroll", updateTextColor);

        return () => {
            window.removeEventListener("scroll", updateTextColor);
        };
    }, []);

    useEffect(() => {
        // Функция для обновления положения изображения
        const updateImagePosition = () => {
            // Выбираем все элементы с классом 'image-animation' или 'image-animation-2'
            const elements = document.querySelectorAll(
                ".image-animation, .image-animation-2"
            );
            elements.forEach((element: Element) => {
                // Преобразуем Element к HTMLElement
                const htmlElement = element as HTMLElement;

                const rect = htmlElement.getBoundingClientRect();
                // Проверяем, виден ли элемент на экране
                const isElementVisible =
                    rect.bottom <= window.innerHeight;

                // Если элемент виден, применяем стили
                if (isElementVisible) {
                    // Применяем значение clip-path в зависимости от видимости элемента
                    htmlElement.style.clipPath = "none";
                } else {
                    // Если элемент не виден, вычисляем процент времени, который ему остался, пока он не выйдет с нижней границы экрана
                    const windowHeight = window.innerHeight;
                    const elementBottomOffset =
                        rect.bottom - windowHeight;
                    const scrollPercentage =
                        (elementBottomOffset / windowHeight) * 100;

                    // Применяем значение clip-path для скрытия изображения
                    let clipPathValue;
                    if (
                        htmlElement.classList.contains(
                            "image-animation"
                        )
                    ) {
                        clipPathValue = `inset(0 0 0 ${scrollPercentage}%)`;
                    } else if (
                        htmlElement.classList.contains(
                            "image-animation-2"
                        )
                    ) {
                        clipPathValue = `inset(0 ${scrollPercentage}% 0 0)`;
                    }
                    htmlElement.style.clipPath = clipPathValue;
                }
            });
        };

        // Добавляем обработчик события прокрутки
        window.addEventListener("scroll", updateImagePosition);

        // Убираем обработчик события прокрутки при размонтировании компонента
        return () => {
            window.removeEventListener("scroll", updateImagePosition);
        };
    }, []);

    useEffect(() => {
        const updateTextColor = () => {
            const elements = document.querySelectorAll(
                ".real-estate-page-photo-1, .real-estate-page-photo-2, .real-estate-page-photo-3"
            );
            elements.forEach((element: Element) => {
                const rect = (
                    element as HTMLElement
                ).getBoundingClientRect();
                const isElementVisible = rect.bottom <= 1020;

                if (isElementVisible) {
                    element.classList.add("visible");
                } else {
                    element.classList.remove("visible");
                }
            });
        };

        window.addEventListener("scroll", updateTextColor);

        return () => {
            window.removeEventListener("scroll", updateTextColor);
        };
    }, []);
   
    const projectData = data.find(project => project.url === id);
   
    return (
        dataLoaded && ( 
             <div className='real-estate-page-section-mobile'>
            <div className='real-estate-page-mobile'>
                <img
                    src={projectData.about}
                    alt='real-estate-page-background'
                    className='real-estate-page-background-mobile'
                />
                <div className='real-estate-page-text-overlay-mobile'>
                    <p className='real-estate-page-heading-mobile para'>
                        {language === "ru"
                            ? projectData.residentialComplex
                            : projectData.residentialComplex_eng}
                    </p>
                    <p className='real-estate-page-text-mobile para'>
                        {language === "ru"
                            ? projectData.address
                            : projectData.address_eng}
                        , {projectData.sizeSquareMeters}
                    </p>
                </div>
            </div>
            <div className='real-estate-page-about-design-mobile'>
                <div className='real-estate-page-about-design-text-img-mobile'>
                    <div className='real-estate-page-about-design-text-mobile'>
                        <p className='real-estate-page-about-design-text-1-mobile para'>
                            {language === "ru"
                                ? projectData.heading
                                : projectData.heading_eng}
                        </p>
                        <p className='real-estate-page-about-design-text-2-mobile para'>
                            {language === "ru"
                                ? projectData.description
                                : projectData.description_eng}
                        </p>
                    </div>
                    <img
                        src={projectData.title}
                        alt='real-estate-page-ph'
                        className='real-estate-page-photo-mobile image-animation'
                    />
                </div>
                <div className='real-estate-page-photo-section-mobile'>
                    <div className='real-estate-page-photo-section-1-mobile'>
                        <img
                            src={projectData.illustration_1}
                            alt='real-estate-page-ph-1'
                            className='real-estate-page-photo-1-mobile image-animation-2'
                        />
                        <p className='para'>
                            {language === "ru"
                                ? projectData.illustration_1_text
                                : projectData.illustration_1_text_eng}
                        </p>
                    </div>
                    <div className='real-estate-page-photo-section-2-mobile'>
                        <img
                            src={projectData.illustration_2}
                            alt='real-estate-page-ph-2'
                            className='real-estate-page-photo-2-mobile image-animation'
                        />
                        <p className='para'>
                            {language === "ru"
                                ? projectData.illustration_2_text
                                : projectData.illustration_2_text_eng}
                        </p>
                    </div>
                    <div className='real-estate-page-photo-section-3-mobile'>
                        <img
                            src={projectData.illustration_3}
                            alt='real-estate-page-ph-3'
                            className='real-estate-page-photo-3-mobile image-animation-2'
                        />
                        <p className='para'>
                            {language === "ru"
                                ? projectData.illustration_3_text
                                : projectData.illustration_3_text_eng}
                        </p>
                    </div>
                </div>
            </div>
            <div className='real-estate-page-gallery-mobile'>
                <p className='real-estate-page-gallery-head-mobile para'>
                    {language === "ru"
                        ? "ГАЛЕРЕЯ ПРОЕКТА"
                        : "Project Gallery"}
                </p>
                <div className='real-estate-page-slider-mobile'>
                <Slider {...settingsRealEstate} ref={sliderRef}>
                    {projectData.project_galore.map((src, index) => (
                        <div
                            key={index}
                            className='real-estate-page-slide-wrapper-mobile'
                            onClick={() => openLightbox(index)}
                        >
                            <img
                                src={src.image_preview}
                                alt={`real-estate-page-gallery-ph-${index + 1}`}
                                className='real-estate-page-gallery-ph-mobile'
                            />
                        </div>
                    ))}
                </Slider>
                {isOpen && (
                    <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={projectData.project_galore.map((item) => ({src: item.image_preview }))}
                    index={photoIndex}
                    on={{
                      view: ({ index }) => setPhotoIndex(index)
                    }}
                    />
                )}
                </div>
            </div>
            <div className='real-estate-page-container-mobile'>
                <div className='selection-container-mobile'>
                    <div className='selection-image-mobile'>
                        <img
                            src='/img/furnuture-selection.jpg'
                            alt='furnuture-selection'
                            className='furnuture-selection-image-mobile image-animation-2'
                        />
                        <p className='selection-text-mobile para'>
                        {language === 'ru'
                            ? 'РЕШЕНИЕ ВСЕХ ВОПРОСОВ ДЛЯ ОБУСТРОЙСТВА НЕДВИЖИМОСТИ В ЧЕРНОГОРИИ'
                            : 'SOLVING ALL ISSUES FOR DEVELOPING REAL ESTATE IN MONTENEGRO'}
                        </p>
                    </div>
                    <p className='selection-text-after-image-mobile para'>
                    {language === 'ru' ? (
                        <>
                            Дизайн и реализация интерьера
                            <br />
                            Подбор и поставка мебели из Европы
                            <br />
                            Авторский надзор
                            <br />
                            Гарантия качества и сроков
                        </>
                    ) : (
                        <>
                            Design and implementation of interior
                            <br />
                            Selection and delivery of furniture from Europe
                            <br />
                            Author's supervision
                            <br />
                            Guarantee of quality and deadlines
                        </>
                    )}
                    </p>
                </div>
                <div className='real-estate-right-mobile'>
                    <img
                        src='/img/furnuture-selection-scnd.jpeg'
                        alt='furnuture-selection-scnd'
                        className='real-estate-scnd-mobile image-animation'
                    />
                    <div
                        className='button-container-real-estate-mobile'
                        onClick={handleButtonClick}
                    >
                        <p className='button-container-real-estate-text-mobile para'>
                            {language === "ru"
                                ? "ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ"
                                : "GET CONSULTATION"}
                        </p>
                        <img
                            src='/img/Button_circle.png'
                            alt='button_circle'
                            className='button-image-real-estate-mobile'
                        />
                    </div>
                    {isPopupVisible && (
                        <div
                            className='popup-overlay-mobile'
                            onClick={handlePopupClose}
                        >
                            <div
                                className='popup-content-mobile'
                                onClick={e => e.stopPropagation()}
                            >
                                <p className='popup-overlay-text-mobile'>
                                    {language === "ru"
                                        ? "СВЯЖИТЕСЬ С НАМИ"
                                        : "CONTACT US"}
                                </p>
                                <img
                                    src='/img/close-button.png'
                                    alt='close-button-overlay'
                                    className='close-button-mobile'
                                    onClick={handlePopupClose}
                                />
                                <form className='popup-content-form-mobile'>
                                    <div className='popup-mail-phone-mobile'>
                                        <div>
                                            <p>
                                                {language === "ru"
                                                    ? "Ваша почта"
                                                    : "Your email"}
                                            </p>
                                            <label>
                                                <input
                                                    type='email'
                                                    name='email'
                                                    placeholder={
                                                        language ===
                                                        "ru"
                                                            ? "На эту почту придет ответ"
                                                            : "The answer will be sent to this email"
                                                    }
                                                    className='input-mail-mobile'
                                                />
                                            </label>
                                            <p>
                                                {language === "ru"
                                                    ? "Ваш телефон"
                                                    : "Your phone number"}
                                            </p>
                                            <label>
                                                <input
                                                    type='tel'
                                                    name='phone'
                                                    className='input-phone-mobile'
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <p>
                                        {language === "ru"
                                            ? "Ваше сообщение"
                                            : "Your message"}
                                    </p>
                                    <label className='label-container-mobile'>
                                        <textarea
                                            name='message'
                                            value={message}
                                            onChange={handleChange}
                                            maxLength={225}
                                            placeholder={
                                                language === "ru"
                                                    ? "Опишите в нескольких предложениях ваш вопрос.."
                                                    : "Describe your question in a few sentences.."
                                            }
                                            className='input-message-mobile'
                                        />
                                        <span className='char-count-mobile'>
                                            {message.length}/225
                                        </span>
                                    </label>
                                    <button
                                        type='submit'
                                        className='popup-content-button-mobile'
                                    >
                                        {language === "ru"
                                            ? "Отправить"
                                            : "Send"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='real-estate-page-similar-projects-mobile'>
                <p className='real-estate-page-similar-projects-head-mobile para'>
                    {language === "ru"
                        ? "ПОХОЖИЕ ПРОЕКТЫ"
                        : "Similar Projects"}
                </p>
                <Slider {...settingsSimilarProjects}>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className='portfolio-page-item-mobile'
                        >
                            <NavLink
                                style={{textDecoration: "none"}}
                                to={`/portfolio/${item.type}/${item.url}`}
                                onClick={handleClick}
                            >
                                {item.photoUrl && (
                                    <div style={{display:"flex",flexDirection:"column",marginLeft:"5vw"}}>
                                        <img
                                            src={item.photoUrl}
                                            alt={`real-estate-${index}-mobile`}
                                            className={`real-page-image-renderComponent-mobile portfolio-image-${index}`}
                                        />
                                        <div className='real-page-text-renderComponent-mobile'>
                                            <p
                                                className='real-page-residentialComplex-mobile'
                                                style={{
                                                    textDecoration:
                                                        "none"
                                                }}
                                            >
                                                {
                                                    item.residentialComplex
                                                }
                                            </p>
                                            <p
                                                className='real-page-address-mobile'
                                                style={{
                                                    textDecoration:
                                                        "none"
                                                }}
                                            >
                                                {item.address}
                                            </p>
                                            <p
                                                className='real-page-sizeSquareMeters-mobile'
                                                style={{
                                                    textDecoration:
                                                        "none"
                                                }}
                                            >
                                                {
                                                    item.sizeSquareMeters
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </NavLink>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
        )
    );
};

export default RealEstateDetailsMobile;
