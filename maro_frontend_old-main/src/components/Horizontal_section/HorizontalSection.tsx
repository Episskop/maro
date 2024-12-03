import React, {useEffect, useState} from "react";
import "react-horizontal-scrolling-menu/dist/styles.css";
import "./HorizontalSection.css";
import {useInView} from "react-intersection-observer";
import {useLanguage} from "../Language.tsx";
import {Link} from "react-router-dom";

import { useFetchData } from "../../hooks/useFetchData.ts";

function transform(section: HTMLDivElement) {
    const rect = section.getBoundingClientRect();
    const scrollSection = section.querySelector(
        ".scroll_section"
    ) as HTMLDivElement;

    const offsetTop = rect.top + window.scrollY;

    let percentage =
        ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage =
        percentage < 0 ? 0 : percentage > 500 ? 500 : percentage;
    scrollSection.style.transform = `translate3d(${-percentage}vw, 0, 0)`;
}
function HorizontalSection() {
    useEffect(() => {
        function handleScroll() {
            const section = document.getElementById(
                "yourSectionId"
            ) as HTMLDivElement;
            if (section) {
                transform(section);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const {language} = useLanguage();
    const [ref, inView] = useInView({
        threshold: 0.5
    });
    const [ref1, inView1] = useInView({
        threshold: 0
    });
    const [ref2, inView2] = useInView({
        threshold: 0
    });
    const [ref3, inView3] = useInView({
        threshold: 0
    });
    const [ref4, inView4] = useInView({
        threshold: 0.1
    });
    const [ref5, inView5] = useInView({
        threshold: 0
    });
    const { apartmentData, villaData, loading, error } = useFetchData();
    return (
        <>
            <div id='yourSectionId' className='sticky-parent'>
                <div className='sticky'>
                    <p className='portfolio-heading para'>
                        {language === "ru"
                            ? "ПОРТФОЛИО"
                            : "PORTFOLIO"}
                    </p>

                    <span
                        style={{
                            position: "absolute",
                            bottom: "11.2vw",
                            left: "10.4vw",
                            fontSize: "14vw",
                            zIndex: 1,
                            transition: "opacity 0.5s ease",
                            opacity: inView ? 1 : inView1 ? 0.6 : 0,
                            fontFamily: "Ubuntu , sans-serif",
                            fontWeight: 400
                        }}
                    >
                        {language === "ru"
                            ? "КВАРТИРЫ"
                            : "APARTMENTS"}
                    </span>
                    {inView2 && (
                        <span
                            style={{
                                position: "absolute",
                                bottom: "11.2vw",
                                left: "16.7vw",
                                fontSize: "14vw",
                                zIndex: -1,
                                transition: "opacity 0.5s ease",
                                opacity: inView4 ? 0.6 : 1,
                                // opacity: 1,
                                // color: 'red',
                                fontFamily: "Ubuntu , sans-serif",
                                fontWeight: 400
                            }}
                        >
                            {language === "ru" ? "ВИЛЛЫ" : "VILLAS"}
                        </span>
                    )}
                    {inView3 && (
                        <span
                            style={{
                                position: "absolute",
                                bottom: 100,
                                left: language === "ru" ? 100 : 170,
                                fontSize: "10.5vw",
                                zIndex: -1,
                                transition: "opacity 0.5s ease",
                                opacity: inView4 ? 0.6 : 1,
                                fontFamily: "Ubuntu , sans-serif",
                                fontWeight: 400,
                                whiteSpace: "pre-line"
                            }}
                        >
                            {language === "ru"
                                ? "КОММЕРЧЕСКАЯ\n НЕДВИЖИМОСТЬ"
                                : "REAL\n ESTATE"}
                        </span>
                    )}
                    <div className='scroll_section'>
                        <span
                            ref={ref}
                            style={{
                                position: "absolute",
                                left: 150,
                                top: 0
                            }}
                        ></span>
                        <Link
                            to={"/portfolio/apartments/Air"}
                            // state={{
                            //     type: "apartment",
                            //     ...apartmentData[0]
                            // }}
                        >
                            <div
                                ref={ref1}
                                style={{
                                    minWidth: "38.8vw",
                                    height: "38.8vw",
                                    backgroundImage: `url('/img/Project_1/presentation.jpg')`,
                                    backgroundSize: "cover",
                                    marginRight: "11.1vw",
                                    position: "relative"
                                }}
                            >
                                <div className='text-overlay'>
                                    <p>
                                        {language === "ru"
                                            ? "Воздух"
                                            : "Air"}
                                    </p>
                                    <p>39.5м2</p>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={"/portfolio/apartments/Comfort_space"}
                            // state={{
                            //     type: "apartment",
                            //     ...apartmentData[1]
                            // }}
                        >
                            <div
                                style={{
                                    minWidth: "38.8vw",
                                    height: "38.8vw",
                                    backgroundImage: `url('/img/Project_2/presentation.jpg')`,
                                    backgroundSize: "cover",
                                    marginRight: "75.8vw",
                                    position: "relative"
                                }}
                            >
                                <div
                                    className='text-overlay'
                                    style={{left: "20%"}}
                                >
                                    <p>
                                        {language === "ru"
                                            ? "Пространство комфорта"
                                            : "Comfort space"}
                                    </p>
                                    <p>135м2</p>
                                </div>
                            </div>
                        </Link>
                        {/* <p
              ref={ref4}
              style={{
                marginBottom: '9vw',
                opacity: inView2 ? 0 : 1,
                // opacity: 1,
                fontFamily: 'Ubuntu , sans-serif',
                fontWeight: 400,
                fontSize: '14vw',
                marginRight: '33.3vw',
              }}
            >
              {language === 'ru' ? 'ВИЛЛЫ' : 'VILLAS'}
            </p> */}
                        <Link
                            to={"/portfolio/villas/Tuscany"}
                           
                        >
                            <div
                                ref={ref2}
                                style={{
                                    minWidth: "38.8vw",
                                    height: "38.8vw",
                                    backgroundImage: `url('/img/Project_4/presentation.jpg')`,
                                    backgroundSize: "cover",
                                    marginRight: "11vw",
                                    position: "relative"
                                }}
                            >
                                <div className='text-overlay'>
                                    <p>
                                        {language === "ru"
                                            ? "Тоскана"
                                            : "Tuscany"}
                                    </p>
                                    <p>500м2</p>
                                </div>
                            </div>
                        </Link>
                        <span ref={ref4}></span>
                        <Link
                            to={"/portfolio/villas/Colorfull"}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    minWidth: "38.8vw",
                                    height: "38.8vw",
                                    backgroundImage: `url('img/Project_5/presentation.jpg')`,
                                    backgroundSize: "cover",
                                    marginRight: "38.2vw"
                                    // marginRight: '10.5vw',
                                }}
                            >
                                <div className='text-overlay'>
                                    <p>
                                        {language === "ru"
                                            ? "Colorfull"
                                            : "Colorfull"}
                                    </p>
                                    <p>180м2</p>
                                </div>
                            </div>
                        </Link>
                        <p
                            ref={ref5}
                            style={{
                                marginBottom: "7vw",
                                fontFamily: "Ubuntu , sans-serif",
                                fontWeight: 400,
                                fontSize: "10.5vw",
                                marginRight:
                                    language === "ru"
                                        ? "40px"
                                        : "700px",
                                marginLeft: "38.2vw",
                                // opacity: inView3 ? 0 : 1,
                                opacity: 0
                            }}
                        >
                            {language === "ru"
                                ? "КОММЕРЧЕСКАЯ \n НЕДВИЖИМОСТЬ"
                                : "REAL \n ESTATE"}
                        </p>
                        <div
                            ref={ref3}
                            style={{
                                minWidth: "38.8vw",
                                height: "38.8vw",
                                backgroundImage: `url('/img/room.png')`,
                                backgroundSize: "cover",
                                marginRight: "11vw"
                            }}
                        >
                            5
                        </div>
                        <div
                            style={{
                                minWidth: "38.8vw",
                                height: "38.8vw",
                                backgroundImage: `url('/img/room.png')`,
                                backgroundSize: "cover",
                                marginRight: "4.2vw"
                            }}
                        >
                            6
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HorizontalSection;
