import React, {useEffect, useRef, useState} from "react";
import {
    NavLink,
    useParams
} from "react-router-dom";
import {useLanguage} from "../../components/Language.tsx";
import commercialData from "../Portfolio/Commercial/Commercial.tsx";
import Slider from "react-slick";
import PopupQuiz from "../Main/popUpQuiz.tsx";
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RealEstateDetails.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {usePropertyData} from "../../API/Context.tsx";
import createPropertyData from "../../API/Api.ts";

const RealEstateDetails = () => {
    const {type, id} = useParams();
    const [selectedComponent, setSelectedComponent] = useState<
        "apartment" | "villa"
    >("apartment");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(
        null
    );
    const [isPopupVisibleQuiz, setPopupVisibleQuiz] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const {apartmentData, villaData} = usePropertyData();
    const {language} = useLanguage();
    const [dataLoaded, setDataLoaded] = useState(false);

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
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const settingsRealEstate = {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false
    };

    const settingsSimilarProjects = {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false
    };

    const sliderRef1 = useRef<Slider>(null);
    const sliderRef = useRef<Slider>(null);

    const handleNext1 = () => {
        if (sliderRef1.current) {
            sliderRef1.current.slickNext();
        }
    };

    const handleNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const openLightbox = index => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

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
    const handleButtonClickQuiz = () => {
        setPopupVisibleQuiz(!isPopupVisibleQuiz);
    };

    const handlePopupCloseQuiz = () => {
        setPopupVisibleQuiz(false);
    };

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
        const updateImagePosition = () => {
            const elements = document.querySelectorAll(
                ".image-animation, .image-animation-2"
            );
            elements.forEach((element: Element) => {
                const htmlElement = element as HTMLElement;
                const rect = htmlElement.getBoundingClientRect();
                const isElementVisible =
                    rect.bottom <= window.innerHeight;
                if (isElementVisible) {
                    htmlElement.style.clipPath = "none";
                } else {
                    const windowHeight = window.innerHeight;
                    const elementBottomOffset =
                        rect.bottom - windowHeight;
                    const scrollPercentage =
                        (elementBottomOffset / windowHeight) * 100;
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
        window.addEventListener("scroll", updateImagePosition);
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
            <div className='real-estate-page-section'>
                <div
                    className='real-estate-page'
                    style={{
                        backgroundImage: `url(${projectData.title})`,
                        height: "23vw",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    <div className='real-estate-page-text-overlay'>
                        <p
                            className='real-estate-page-heading para'
                            style={{
                                fontSize: "6vw"
                            }}
                        >
                            {language === "ru"
                                ? projectData.residentialComplex
                                : projectData.residentialComplex_eng}
                        </p>
                        <p className='real-estate-page-text para'>
                            {language === "ru"
                                ? projectData.address
                                : projectData.address_eng}
                            , {projectData.sizeSquareMeters}
                        </p>
                    </div>
                </div>
                <div className='real-estate-page-about-design'>
                    <div className='real-estate-page-about-design-text-img'>
                        <div className='real-estate-page-about-design-text'>
                            <p className='real-estate-page-about-design-text-1 '>
                                {language === "ru"
                                    ? projectData.heading
                                    : projectData.heading_eng}
                            </p>
                            <p className='real-estate-page-about-design-text-2 '>
                                {language === "ru"
                                    ? projectData.description
                                    : projectData.description_eng}
                            </p>
                        </div>
                        <LazyLoadImage
                            src={projectData.title}
                            alt='real-estate-page-ph'
                            effect='blur'
                            className='real-estate-page-photo image-animation'
                        />
                    </div>
                    <div className='real-estate-page-photo-section'>
                        <div className='real-estate-page-photo-section-1'>
                            <LazyLoadImage
                                src={projectData.illustration_1}
                                alt='real-estate-page-ph-1'
                                effect='blur'
                                className='real-estate-page-photo-1'
                            />
                            <p className='para'>
                                {language === "ru"
                                    ? projectData.illustration_1_text
                                    : projectData.illustration_1_text_eng}
                            </p>
                        </div>
                        <div className='real-estate-page-photo-section-2'>
                            <LazyLoadImage
                                src={projectData.illustration_2}
                                alt='real-estate-page-ph-2'
                                effect='blur'
                                className='real-estate-page-photo-2'
                            />
                            <p className='para'>
                                {language === "ru"
                                    ? projectData.illustration_2_text
                                    : projectData.illustration_2_text_eng}
                            </p>
                        </div>
                        <div className='real-estate-page-photo-section-3'>
                            <LazyLoadImage
                                src={projectData.illustration_3}
                                alt='real-estate-page-ph-3'
                                effect='blur'
                                className='real-estate-page-photo-3'
                            />
                            <p className='para'>
                                {language === "ru"
                                    ? projectData.illustration_3_text
                                    : projectData.illustration_3_text_eng}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='real-estate-page-gallery'>
                    <p className='real-estate-page-gallery-head para'>
                        {language === "ru"
                            ? "ГАЛЕРЕЯ ПРОЕКТА"
                            : "Project Gallery"}
                    </p>
                    <div className='real-estate-page-slider'>
                        <Slider
                            {...settingsRealEstate}
                            ref={sliderRef1}
                        >
                            {projectData.project_galore.map(
                                (src, index) => (
                                    <div
                                        key={index}
                                        className='real-estate-page-slide-wrapper'
                                        onClick={() =>
                                            openLightbox(index)
                                        }
                                    >
                                        <img
                                            src={src.image_preview}
                                            alt={`real-estate-page-gallery-ph-${
                                                index + 1
                                            }`}
                                            className='real-estate-page-gallery-ph'
                                        />
                                    </div>
                                )
                            )}
                        </Slider>
                        {isOpen && (
                            <Lightbox
                                open={isOpen}
                                close={() => setIsOpen(false)}
                                                 
                                slides={projectData.project_galore.map((item) => ({src: item.image_preview }))}
                                index={photoIndex}
                                on={{
                                    view: ({index}) =>
                                        setPhotoIndex(index)
                                }}
                            />
                        )}
                        <img
                            src='/img/button-supp.png'
                            alt='real-estate-page-button-next'
                            className='real-estate-page-button-next-1'
                            onClick={handleNext1}
                        />
                    </div>
                </div>
                <div className='real-estate-page-container'>
                    <div className='real-estate-image'>
                        <LazyLoadImage
                            src='/img/furnuture-selection.jpg'
                            alt='real-estate'
                            effect='blur'
                            className='real-estate-image image-animation-2'
                        />
                        <p className='real-estate-page-text para'>
                            {language === "ru"
                                ? "РЕШЕНИЕ ВСЕХ ВОПРОСОВ ДЛЯ ОБУСТРОЙСТВА НЕДВИЖИМОСТИ В ЧЕРНОГОРИИ"
                                : "SOLVING ALL ISSUES FOR DEVELOPING REAL ESTATE IN MONTENEGRO"}
                        </p>
                    </div>
                    <p className='real-estate-text-after-image para'>
                        {language === "ru" ? (
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
                                Selection and delivery of furniture
                                from Europe
                                <br />
                                Author's supervision
                                <br />
                                Guarantee of quality and deadlines
                            </>
                        )}
                    </p>
                    <div className='real-estate-right'>
                        <LazyLoadImage
                            src='/img/furnuture-selection-scnd.jpeg'
                            alt='furnuture-selection-scnd'
                            effect='blur'
                            className='real-estate-scnd image-animation'
                        />
                        <div
                            className='button-container-real-estate'
                            onClick={handleButtonClickQuiz}
                        >
                            <p className='button-container-real-estate-text para'>
                                {language === "ru"
                                    ? "ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ"
                                    : "GET CONSULTATION"}
                            </p>
                            <img
                                src='/img/Button_circle.png'
                                alt='button_circle'
                                className='button-image-real-estate'
                            />
                        </div>
                        {isPopupVisibleQuiz && (
                            <PopupQuiz
                                isPopupVisibleQuiz={
                                    isPopupVisibleQuiz
                                }
                                handlePopupCloseQuiz={
                                    handlePopupCloseQuiz
                                }
                            />
                        )}
                    </div>
                </div>
                <div className='real-estate-page-similar-projects'>
                    <p className='real-estate-page-similar-projects-head para'>
                        {language === "ru"
                            ? "ПОХОЖИЕ ПРОЕКТЫ"
                            : "Similar Projects"}
                    </p>
                    <Slider
                        {...settingsSimilarProjects}
                        ref={sliderRef}
                    >
                        {data.map((item, index) => (                            <div
                                key={index}
                                className='real-estate-page-item'
                            >
                                <NavLink
                                    to={`/portfolio/${item.type}/${item.url}`}
                                  
                                    onClick={handleClick}
                                >
                                    <div
                                        className={`real-estate-page-text-renderComponent ${
                                            hoveredIndex === index
                                                ? "hovered"
                                                : ""
                                        }`}
                                    >
                                        <p className='real-estate-page-residentialComplex'>
                                            {item.residentialComplex}
                                        </p>
                                        <p className='real-estate-page-address'>
                                            {item.address}
                                        </p>
                                        <p className='real-estate-page-sizeSquareMeters'>
                                            {item.sizeSquareMeters}
                                        </p>
                                    </div>
                                    {item.photoUrl && (
                                        <>
                                            <LazyLoadImage
                                                src={item.photoUrl}
                                                alt={`real-estate-${index}`}
                                                effect='blur'
                                                className={`real-estate-page-image-renderComponent real-estate-image-${index}`}
                                            />
                                            <div className='real-estate-page-read-more'>
                                                <span className='real-estate-page-more-link'>
                                                    {language === "ru"
                                                        ? "Подробнее"
                                                        : "More details"}
                                                </span>
                                                <img
                                                    src='/img/white-arrow-up.png'
                                                    alt='white-arrow-up'
                                                    className='real-estate-page-white-arrow-up'
                                                />
                                            </div>
                                        </>
                                    )}
                                </NavLink>
                            </div>
                        ))}
                    </Slider>
                    <img
                        src='/img/button-supp.png'
                        alt='real-estate-page-button-next'
                        className='real-estate-page-button-next'
                        onClick={handleNext}
                    />
                </div>
            </div>
        )
    );
};

export default RealEstateDetails;
