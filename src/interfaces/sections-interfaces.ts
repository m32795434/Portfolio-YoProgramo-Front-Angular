interface Sections {
    home: Home;
    experience: Experience;
    qPD: QPD;
    projects: Projects;
    skills: Skills;
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
    startDate: { year: number, month: number, day: number },
    endDate: { year: number, month: number, day: number },
    img: { src: string, alt: string }
    h2: { en: string, es: string };
    ph: { en: string, es: string };
}
interface Projects {
    id: "projects";
    en: string;
    es: string;
}
interface Skills {
    id: "skills";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    cards: SkillsCard[];
}
interface SkillsCard {
    id: string;
    img: { src: string, alt: string };
    value: number;
    color: string;
}
type Section = Home | QPD | Experience | Projects | Skills;
type StringSection = "home" | "projects" | "qPD" | "experience" | "skills";
export { Home, HomeCard, QPD, QPDCard, Experience, ExperienceCard, Projects, Sections, Section, StringSection, SkillsCard, Skills }