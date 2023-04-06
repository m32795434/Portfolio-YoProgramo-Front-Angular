import { Observable } from 'rxjs';
import { Experience, Home, Projects, QPD, Section, StringSection } from './sections-interfaces';

export interface Conexion {
    // getCards(val: string): Observable<any>;
    getSectionAndCards(section: StringSection): Observable<Section>;
    updateSectionAndCards(section: StringSection, obj: Section): Observable<Section>;
    // updateElContent(obj: ElInterface, val: string): Observable<ElInterface>;
}