interface SpringAllCompleteSections {
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
    homeCardList: SpringHomeCard[];
}
interface SpringHomeCard {
    id: string;
    phEn: string, phEs: string;
}
interface SpringQPDAndCards {
    section: {
        id: "qPD";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    }
    qpdcardList: SpringQPDCard[];
}
interface SpringQPDCard {
    id: string;
    imgSrc: String;
    imgAltEn: String;
    imgAltEs: String;
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
    section: {
        id: "experience";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    }
    experienceCardList: SpringExperienceCard[];
}
interface SpringExperienceCard {
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
    section: {
        id: "projects";
        en: string;
        es: string;
        imgMobile: null;
        imgDesktop: null;
    }
    projectsCardList: SpringProjectsCard[]
}
interface SpringProjectsCard {
    id: String;
    imgSrc: String;
    imgAltEs: String;
    imgAltEn: String;
    phEs: String;
    phEn: String;
    h2En: String;
    h2Es: String;
}
interface SpringSkillsAndCards {
    section: {
        id: "skills";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    }
    skillsCardList: SpringSkillsCard[];
}
interface SpringSkillsCard {
    id: string;
    imgSrc: string;
    imgAltEs: string;
    imgAltEn: string;
    value: number;
    bkColor: string;
    outStrokeColor: string;
}
type SpringCompleteSection = SpringHomeAndCards | SpringQPDAndCards | SpringExperienceAndCards | SpringProjectsAndCards | SpringSkillsAndCards;
export { SpringHomeAndCards, SpringHomeCard, SpringQPDAndCards, SpringQPDCard, SpringExperienceAndCards, SpringExperienceCard, SpringProjectsAndCards, SpringProjectsCard, SpringAllCompleteSections, SpringCompleteSection, SpringSkillsCard, SpringSkillsAndCards }