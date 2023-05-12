interface AllSectionsAndCards {
    home: HomeAndCards;
    experience: ExperienceAndCards;
    qPD: QPDAndCards;
    projects: ProjectsAndCards;
    skills: SkillsAndCards;
}
interface SectionInfo {
    id: StringSection;
    imgMobile: string;
    imgDesktop: string;
    en: string;
    es: string;
}
interface HomeAndCards {
    section: {
        id: "home";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    };
    cards: HomeCard[];
}
interface newHomeCard {
    ph: { en: string, es: string };
}
interface HomeCard extends newHomeCard {
    id: number;
}
interface QPDAndCards {
    section: {
        id: "qPD";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    };
    cards: QPDCard[];
}
interface QPDCard {
    id: number;
    startDate: { year: number, month: number, day: number };
    endDate: { year: number, month: number, day: number };
    img: {
        src: string, alt: {
            en: string, es: string
        }
    };
    h2: { en: string, es: string };
    ph: { en: string, es: string };
}
interface ExperienceAndCards {
    section: {
        id: "experience";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    };
    cards: ExperienceCard[];
}
interface newExperienceCard {
    img: {
        src: string, alt: {
            en: string, es: string
        }
    };
    startDate: { year: number, month: number, day: number };
    endDate: { year: number, month: number, day: number };
    ph: { en: string, es: string };
}
interface ExperienceCard extends newExperienceCard {
    id: number;
}
interface ProjectsAndCards {
    section: {
        id: "projects";
        imgMobile: null;
        imgDesktop: null;
        en: string;
        es: string;
    };
    cards: ProjectsCard[]
}
interface newProjectsCard {
    vMp4Src: string;
    vWebSrc: string;
    startDate: { year: number, month: number, day: number };
    endDate: { year: number, month: number, day: number };
    h2: { en: string, es: string };
    ph: { en: string, es: string };
    codeUrl: string;
    deployUrl: string;
}
interface ProjectsCard extends newProjectsCard {
    id: number;
}
interface SkillsAndCards {
    section: {
        id: "skills";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    };
    cards: SkillsCard[];
}
interface newSkillsCard {
    img: {
        src: string, alt: {
            en: string, es: string
        };
    }; value: number; bkColor: string; outStrokeColor: string;
}
interface SkillsCard extends newSkillsCard {
    id: number;
}
interface User {
    // id: number;
    // level: UserLevels;
    email: string;
    password: string;
}
interface PassObj {
    password: string;
}
interface AuthObj {
    access_token: string;
    refresh_token: string;
}
interface Ref_Token {
    sub: string;
    iat: number;
    exp: number;
}
interface Accs_Token {
    // id: number;
    // auth: boolean;
    sub: string;
    role: UserLevels;
    iat: number;
    exp: number;
}
type UserLevels = "ADMIN" | "MANAGER" | "";
type ABM = "create" | "delete" | "udpdate";
type SectionAndCards = HomeAndCards | QPDAndCards | ExperienceAndCards | ProjectsAndCards | SkillsAndCards;
type SectionCard = HomeCard | QPDCard | ExperienceCard | ProjectsCard | SkillsCard;
type StringSection = "home" | "projects" | "qPD" | "experience" | "skills";
export { ABM, HomeAndCards, HomeCard, QPDAndCards, QPDCard, ExperienceAndCards, ExperienceCard, ProjectsAndCards, ProjectsCard, AllSectionsAndCards, SectionAndCards, StringSection, SkillsCard, SkillsAndCards, SectionCard, SectionInfo, User, UserLevels, AuthObj, newHomeCard, newExperienceCard, newProjectsCard, newSkillsCard, Accs_Token, Ref_Token, PassObj }