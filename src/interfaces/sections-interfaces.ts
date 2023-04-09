interface Sections {
    home: HomeAndCards;
    experience: ExperienceAndCards;
    qPD: QPDAndCards;
    projects: ProjectsAndCards;
    skills: SkillsAndCards;
}

interface HomeAndCards {
    id: "home";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    cards: HomeCard[];
}
interface HomeCard {
    id: string;
    ph: { en: string, es: string };
}
interface QPDAndCards {
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
    img: {
        src: string, alt: {
            en: string, es: string
        }
    }
    h2: { en: string, es: string };
    ph: { en: string, es: string };
}
interface ExperienceAndCards {
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
interface ProjectsAndCards {
    id: "projects";
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
    cards: ProjectsCard[]
}
interface ProjectsCard {
    id: string;
    img: {
        src: string, alt: {
            en: string, es: string
        }
    }
    h2: { en: string, es: string };
    ph: { en: string, es: string };
}
interface SkillsAndCards {
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
type Section = HomeAndCards | QPDAndCards | ExperienceAndCards | ProjectsAndCards | SkillsAndCards;
type StringSection = "home" | "projects" | "qPD" | "experience" | "skills";
export { HomeAndCards, HomeCard, QPDAndCards, QPDCard, ExperienceAndCards, ExperienceCard, ProjectsAndCards, ProjectsCard, Sections, Section, StringSection, SkillsCard, SkillsAndCards }