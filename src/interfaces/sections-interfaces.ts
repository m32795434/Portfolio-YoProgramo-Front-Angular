interface Sections {
    home: Home;
    experience: Experience;
    qPD: QPD;
    projects: Projects;
}
interface Home {
    id: "home";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    cards: HomeCard[];
}
interface HomeCard {
    id: string;
    en: string;
    es: string;
}
interface QPD {
    id: "qPD";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    cards: QPDCard[];
}
interface QPDCard {
    id: string;
    startDate: { year: number, month: number, day: number },
    endDate: { year: number, month: number, day: number },
    img: { src: string, alt: string }
    h2: { en: string, es: string };
    h4: { text: string },
    ph: { en: string, es: string };
}
interface Experience {
    id: "experience";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    cards: ExperienceCard[];
}
interface ExperienceCard {
    id: string;
    h2: string;
    es: string;
    en: string;
}
interface Projects {
    id: "projects";
    en: string;
    es: string;
}

type Section = Home | QPD | Experience | Projects;
type StringSection = "home" | "projects" | "qPD" | "experience";
export { Home, HomeCard, QPD, QPDCard, Experience, ExperienceCard, Projects, Sections, Section, StringSection }