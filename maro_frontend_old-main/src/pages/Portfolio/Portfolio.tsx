import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { usePropertyData } from "../../API/Context.tsx";
import "./Portfolio.css";
import { useLanguage } from "../../components/Language.tsx";

interface RealEstateItem {
    type:string,
    residentialComplex: string;
    address: string;
    sizeSquareMeters: string;
    photoUrl?: string; // Optional, as not all items might have a photo
    url: string
}

const Portfolio: React.FC = () => {
    const { language } = useLanguage();
    const { apartmentData, villaData } = usePropertyData();
    const [selectedComponent, setSelectedComponent] = useState<"apartment" | "villa">("apartment");
    const [apartmentDataState, setApartmentDataState] = useState<RealEstateItem[]>([]);
    const [villaDataState, setVillaDataState] = useState<RealEstateItem[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isSticky, setSticky] = useState(false);
    const [showHero, setShowHero] = useState(true);

    useEffect(() => {
        setApartmentDataState(apartmentData);
    }, [apartmentData]);

    useEffect(() => {
        setVillaDataState(villaData);
    }, [villaData]);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 1000);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    useEffect(() => {
        const wasHomePageVisited = sessionStorage.getItem("wasHomePageVisited");
        if (!wasHomePageVisited) {
            setShowHero(true);
            setTimeout(() => {
                sessionStorage.setItem("wasHomePageVisited", "true");
            }, 1000);
        } else {
            setShowHero(false);
        }
    }, []);

    useEffect(() => {
        const updateTextColor = () => {
            const elements = document.querySelectorAll(".para");
            elements.forEach((element: Element) => {
                const rect = (element as HTMLElement).getBoundingClientRect();
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
        const updateTextColor = () => {
            const elements = document.querySelectorAll(".portfolio-page-item");
            elements.forEach((element: Element) => {
                const rect = (element as HTMLElement).getBoundingClientRect();
                const isElementVisible = rect.bottom <= 1120;

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

    const renderComponent = (data: RealEstateItem[]) => {
        return data.map((item, index) => (
            <div key={index} className='portfolio-page-item'>
                <Link
                    to={`/portfolio/${item.type}/${item.url}`}
                    // state={{
                    //     type: selectedComponent,
                    //     id: index,
                    //     ...item
                    // }}
                >
                    <div
                        className={`portfolio-page-text-renderComponent ${
                            hoveredIndex === index ? "hovered" : ""
                        }`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <p className='portfolio-page-residentialComplex'>
                            {item.residentialComplex}
                        </p>
                        <p className='portfolio-page-address'>
                            {item.address}
                        </p>
                        <p className='portfolio-page-sizeSquareMeters'>
                            {item.sizeSquareMeters}
                        </p>
                    </div>
                    {item.photoUrl && (
                        <>
                            <img
                                src={item.photoUrl}
                                alt={`real-estate-${index}`}
                                className={`portfolio-page-image-renderComponent portfolio-image-${index}`}
                            />

                            <div className='portfolio-page-read-more'>
                                <img
                                    src='/img/white-arrow-up.png'
                                    alt='white-arrow-up'
                                    className='portfolio-page-white-arrow-up'
                                />
                            </div>
                        </>
                    )}
                </Link>
            </div>
        ));
    };

    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case "apartment":
                return renderComponent(apartmentDataState);
            case "villa":
                return renderComponent(villaDataState);
            default:
                return null;
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowHero(false);
        }, 250);

        return () => clearTimeout(timeout);
    }, [showHero]);

    return (
        <div className='portfolio-page-section'>
            {showHero && (
                <div className={`hero ${showHero ? "" : "fade-out"}`}>
                    <div className='hero-content'>
                        <img src='./img/logo.svg' alt='Main-Logo' />
                    </div>
                </div>
            )}
            <img
                src='./img/buttuon_up.png'
                alt='button_circle_up'
                onClick={scrollToTop}
                className={isSticky ? "button-up" : "button-up-hide"}
            />
            <div className={`content ${showHero ? "content-faded" : ""}`}></div>
            <div className='portfolio-page-container'>
                <img
                    src='/img/portfolio-page-1.png'
                    alt='page-background'
                    className='portfolio-page-background'
                />
                <div className='portfolio-page-text-overlay'>
                    <p className='portfolio-page-heading'>
                        {language === "ru" ? "ПОРТФОЛИО" : "Portfolio"}
                    </p>
                    <p className='portfolio-page-text'>
                        {language === "ru"
                            ? "Каждый наш проект уникален, отражая в себе характер и особенный склад жизни своих хозяев. Мы очень тщательно прорабатываем все детали, чтобы интерьер был максимально комфортным для наших клиентов"
                            : "Each of our projects is unique, reflecting the character and distinctive lifestyle of its owners. We meticulously work through every detail to ensure that the interior is as comfortable as possible for our clients."}
                    </p>
                </div>
            </div>
            <div className='portfolio-page-switcher-container'>
                <button
                    onClick={() => setSelectedComponent("apartment")}
                    className={selectedComponent === "apartment" ? "selected" : ""}
                >
                    {language === "ru" ? "Квартиры" : "Apartments"}
                </button>
                <button
                    onClick={() => setSelectedComponent("villa")}
                    className={selectedComponent === "villa" ? "selected" : ""}
                >
                    {language === "ru" ? "Виллы" : "Villas"}
                </button>
            </div>
            <div className='portfolio-page-grid-container'>
                {renderSelectedComponent()}
            </div>
        </div>
    );
};

export default Portfolio;
