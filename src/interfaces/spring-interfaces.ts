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
    cards: QPDCard[];
}
interface QPDCard {
    id: string;
    startDate: { year: number, month: number, day: number },
    endDate: { year: number, month: number, day: number },
    img: { src: string, alt: string }
    h2: { en: string, es: string };
    ph: { en: string, es: string };
}
interface SpringExperienceAndCards {
    id: "experience";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    cards: ExperienceCard[];
}
interface ExperienceCard {
    id: string;
    img: {
        src: string, alt: {
            en: string, es: string
        }
    }
    startDate: { year: number, month: number, day: number },
    endDate: { year: number, month: number, day: number },
    ph: { en: string, es: string };
}
interface SpringProjectsAndCards {
    id: "projects";
    en: string;
    es: string;
    cards: null;
}
interface SpringSkillsAndCards {
    id: "skills";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    cards: SkillsCard[];
}
interface SkillsCard {
    id: string;
    img: {
        src: string, alt: {
            en: string, es: string
        }
    }; value: number; bkColor: string; outStrokeColor: string;
}
type Section = SpringHomeAndCards | SpringQPDAndCards | SpringExperienceAndCards | SpringProjectsAndCards | SpringSkillsAndCards;
type StringSection = "home" | "projects" | "qPD" | "experience" | "skills";
export { SpringHomeAndCards, HomeCard, SpringQPDAndCards, QPDCard, SpringExperienceAndCards, ExperienceCard, SpringProjectsAndCards, SpringCompleteSections, Section, StringSection, SkillsCard, SpringSkillsAndCards }