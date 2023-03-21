import { Observable } from 'rxjs';
import { Experience, Home, Projects, QPD, Section, StringSection } from './sections-interfaces';

export interface RequestServicesInterface {
    // getSlides(val: string): Observable<any>;
    getSection(section: StringSection): Observable<Section>;
    updateSection(section: StringSection, obj: Section): Observable<Section>
    // updateElContent(obj: ElInterface, val: string): Observable<ElInterface>;
}