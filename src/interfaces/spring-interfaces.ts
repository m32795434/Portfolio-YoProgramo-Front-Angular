interface SpringCompleteSections {
    home: SpringHomeAndCards;
    experience: SpringExperienceAndCards;
    qPD: SpringQPDAndCards;
    projects: SpringProjectsAndCards;
    skills: SpringSkillsAndCards;
}
interface SpringHomeAndCards {
    section: {
        id: "home";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    }
    homeCardList: HomeCard[];
}
interface HomeCard {
    id: string;
    en: string;
    es: string;
}
interface SpringQPDAndCards {
    id: "qPD";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    qpdcardList: QPDCard[];
}
interface QPDCard {
    id: string;
    imgSrc: String;
    imgAlt: String;
    startDateYear: number;
    startDateMonth: number;
    startDateDay: number;
    endDateYear: number;
    endDateMonth: number;
    endDateDay: number;
    phEs: String;
    phEn: String;
    h2En: String;
    h2Es: String;
}
interface SpringExperienceAndCards {
    id: "experience";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    experienceCardList: ExperienceCard[];
}
interface ExperienceCard {
    id: string;
    imgSrc: String;
    imgAltEs: String;
    imgAltEn: String;
    startDateYear: number;
    startDateMonth: number;
    startDateDay: number;
    endDateYear: number;
    endDateMonth: number;
    endDateDay: number;
    phEs: String;
    phEn: String;
}
interface SpringProjectsAndCards {
    id: "projects";
    en: string;
    es: string;
    imgMobile: null;
    imgDesktop: null;
}
interface SpringSkillsAndCards {
    id: "skills";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    skillsCardList: SkillsCard[];
}
interface SkillsCard {
    id: string;
    imgSrc: string;
    imgAltEs: string;
    imgAltEn: string;
    value: number;
    bkColor: string;
    outStrokeColor: string;
}
type Section = SpringHomeAndCards | SpringQPDAndCards | SpringExperienceAndCards | SpringProjectsAndCards | SpringSkillsAndCards;
type StringSection = "home" | "projects" | "qPD" | "experience" | "skills";
export { SpringHomeAndCards, HomeCard, SpringQPDAndCards, QPDCard, SpringExperienceAndCards, ExperienceCard, SpringProjectsAndCards, SpringCompleteSections, Section, StringSection, SkillsCard, SpringSkillsAndCards }