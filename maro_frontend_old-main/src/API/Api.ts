import axios from "axios";
import { Apartment } from "../pages/Portfolio/Apartment/Apartment";
import { Villa } from "../pages/Portfolio/Villa/Villa";

const API_BASE_URL = "https://maro.itm-studios.com/api/v1/projects";

const fetchProjectDetails = async (slug: string) => {
  const response = await axios.get(`${API_BASE_URL}/${slug}/`);
  return response.data;
};

const fetchData = async () => {
  const response = await axios.get(`${API_BASE_URL}/?limit=100`);
  const projects = response.data.results;
  return projects;
};

const transformToApartment = (data: any): Apartment => {
  return {
    id: data.id,
    residentialComplex: data.hero_title,
    residentialComplex_eng: data.hero_title_en,
    address: data.address,
    address_eng:  data.address_en,
    sizeSquareMeters: data.square,
    description: data.description ,
    description_eng:data.description_en ,
    heading: data.title,
    heading_eng: data.title_en,
    photoUrl: data.image_hero ,
    title: data.image_hero || "" ,
    about: data.title_hero_img,
    illustration_1: data.photo_project?.[0]?.image_preview || '',
    illustration_1_text: data.photo_project?.[0]?.title || '',
    illustration_1_text_eng: data.photo_project?.[0]?.title_en || '',
    illustration_2: data.photo_project?.[1]?.image_preview || '',
    illustration_2_text: data.photo_project?.[1]?.title || '',
    illustration_2_text_eng: data.photo_project?.[1]?.title_en || '',
    illustration_3: data.photo_project?.[2]?.image_preview || '',
    illustration_3_text: data.photo_project?.[2]?.title || '',
    illustration_3_text_eng: data.photo_project?.[2]?.title_en || '',
    project_galore: data.photo_project_gallery || [],
    url: data.slug || '',
    type: data.categories[0].slug || ""
  };
};

const transformToVilla = (data: any): Villa => {
  return {
    id: data.id,
    residentialComplex: data.hero_title,
    residentialComplex_eng: data.hero_title_en,
    address: data.address,
    address_eng:  data.address_en,
    sizeSquareMeters: data.square,
    description: data.description ,
    description_eng:data.description_en ,
    heading: data.title,
    heading_eng: data.title_en,
    photoUrl: data.image_hero ,
    title: data.image_hero || "",
    about: data.title_hero_img,
    illustration_1: data.photo_project?.[0]?.image_preview || '',
    illustration_1_text: data.photo_project?.[0]?.title || '',
    illustration_1_text_eng: data.photo_project?.[0]?.title_en || '',
    illustration_2: data.photo_project?.[1]?.image_preview || '',
    illustration_2_text: data.photo_project?.[1]?.title || '',
    illustration_2_text_eng: data.photo_project?.[1]?.title_en || '',
    illustration_3: data.photo_project?.[2]?.image_preview || '',
    illustration_3_text: data.photo_project?.[2]?.title || '',
    illustration_3_text_eng: data.photo_project?.[2]?.title_en || '',
    project_galore: data.photo_project_gallery || [],
    url: data.slug || '',
    type: data.categories[0].slug || ""
  };
};

export const createPropertyData = async () => {
  const data = await fetchData();
  const apartmentData: Apartment[] = [];
  const villaData: Villa[] = [];

  const detailedProjects = await Promise.all(
    data.map(async (item: any) => {
      const details = await fetchProjectDetails(item.slug);
      return details;
    })
  );

  detailedProjects.forEach((item: any) => {
    if (item.categories && item.categories[0]) {
      if (item.categories[0].slug === "apartments") {
        apartmentData.push(transformToApartment(item));
      } else if (item.categories[0].slug === "villas") {
        villaData.push(transformToVilla(item));
      }
    }
  });

//  console.log("Apartment Data:", apartmentData); 
//  console.log("Villa Data:", villaData); 

  return { apartmentData, villaData };
};

export default createPropertyData;
