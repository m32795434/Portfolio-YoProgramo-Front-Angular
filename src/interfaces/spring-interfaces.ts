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
    cards: SpringHomeCard[];
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
    cards: SpringQPDCard[];
}
interface SpringQPDCard {
    id: string;
    imgSrc: string;
    imgAltEn: string;
    imgAltEs: string;
    startDateYear: number;
    startDateMonth: number;
    startDateDay: number;
    endDateYear: number;
    endDateMonth: number;
    endDateDay: number;
    phEs: string;
    phEn: string;
    h2En: string;
    h2Es: string;
}
interface SpringExperienceAndCards {
    section: {
        id: "experience";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    }
    cards: SpringExperienceCard[];
}
interface SpringExperienceCard {
    id: string;
    imgSrc: string;
    imgAltEs: string;
    imgAltEn: string;
    startDateYear: number;
    startDateMonth: number;
    startDateDay: number;
    endDateYear: number;
    endDateMonth: number;
    endDateDay: number;
    phEs: string;
    phEn: string;
}
interface SpringProjectsAndCards {
    section: {
        id: "projects";
        en: string;
        es: string;
        imgMobile: null;
        imgDesktop: null;
    }
    cards: SpringProjectsCard[]
}
interface SpringProjectsCard {
    id: string;
    imgSrc: string;
    imgAltEs: string;
    imgAltEn: string;
    phEs: string;
    phEn: string;
    h2En: string;
    h2Es: string;
}
interface SpringSkillsAndCards {
    section: {
        id: "skills";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    }
    cards: SpringSkillsCard[];
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
type SpringCards = SpringHomeCard[] | SpringQPDCard[] | SpringExperienceCard[] | SpringProjectsCard[] | SpringSkillsCard[];
type SpringCompleteSection = SpringHomeAndCards | SpringQPDAndCards | SpringExperienceAndCards | SpringProjectsAndCards | SpringSkillsAndCards;
export { SpringHomeAndCards, SpringHomeCard, SpringQPDAndCards, SpringQPDCard, SpringExperienceAndCards, SpringExperienceCard, SpringProjectsAndCards, SpringProjectsCard, SpringAllCompleteSections, SpringCompleteSection, SpringSkillsCard, SpringSkillsAndCards, SpringCards }