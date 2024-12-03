
export interface PropertyBase {
    id: number;
    residentialComplex: string;
    residentialComplex_eng: string;
    address: string;
    address_eng: string;
    sizeSquareMeters: string;
    description: string;
    description_eng: string;
    heading: string;
    heading_eng: string;
    photoUrl: string;
    title: string;
    about: string;
    illustration_1: string;
    illustration_1_text: string;
    illustration_1_text_eng: string;
    illustration_2: string;
    illustration_2_text: string;
    illustration_2_text_eng: string;
    illustration_3: string;
    illustration_3_text: string;
    illustration_3_text_eng: string;
    project_galore: string[];
    url: string
    type: string
  }
  
  export interface Apartment extends PropertyBase {}
