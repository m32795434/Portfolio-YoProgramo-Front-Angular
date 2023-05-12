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
    };
    cards: SpringHomeCard[];
}
interface newSpringHomeCard {
    phEn: string, phEs: string;
}
interface SpringHomeCard extends newSpringHomeCard {
    id: number;
}
interface SpringQPDAndCards {
    section: {
        id: "qPD";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    };
    cards: SpringQPDCard[];
}
interface newSpringQPDCard {
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
interface SpringQPDCard extends newSpringQPDCard {
    id: number;
}
interface SpringExperienceAndCards {
    section: {
        id: "experience";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    };
    cards: SpringExperienceCard[];
}
interface newSpringExperienceCard {
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
interface SpringExperienceCard extends newSpringExperienceCard {
    id: number;
}
interface SpringProjectsAndCards {
    section: {
        id: "projects";
        en: string;
        es: string;
        imgMobile: null;
        imgDesktop: null;
    };
    cards: SpringProjectsCard[]
}
interface newSpringProjectsCard {
    vmp4Src: string;
    vwebSrc: string;
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
    codeUrl: string;
    deployUrl: string;
}
interface SpringProjectsCard extends newSpringProjectsCard {
    id: number;
}
interface SpringSkillsAndCards {
    section: {
        id: "skills";
        imgMobile: string;
        imgDesktop: string;
        en: string;
        es: string;
    };
    cards: SpringSkillsCard[];
}
interface newSpringSkillsCard {
    imgSrc: string;
    imgAltEs: string;
    imgAltEn: string;
    value: number;
    bkColor: string;
    outStrokeColor: string;
}
interface SpringSkillsCard extends newSpringSkillsCard {
    id: number;
}
type SpringCards = SpringHomeCard[] | SpringQPDCard[] | SpringExperienceCard[] | SpringProjectsCard[] | SpringSkillsCard[];
type SpringCompleteSection = SpringHomeAndCards | SpringQPDAndCards | SpringExperienceAndCards | SpringProjectsAndCards | SpringSkillsAndCards;
export { SpringHomeAndCards, SpringHomeCard, SpringQPDAndCards, SpringQPDCard, SpringExperienceAndCards, SpringExperienceCard, SpringProjectsAndCards, SpringProjectsCard, SpringAllCompleteSections, SpringCompleteSection, SpringSkillsCard, SpringSkillsAndCards, SpringCards, newSpringHomeCard, newSpringQPDCard, newSpringExperienceCard, newSpringProjectsCard, newSpringSkillsCard }