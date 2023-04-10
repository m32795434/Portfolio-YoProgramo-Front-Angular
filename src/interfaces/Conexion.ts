import { Observable } from 'rxjs';
import { SectionAndCards, StringSection } from './sections-interfaces';

export interface Conexion {
    // getCards(val: string): Observable<any>;
    getSectionAndCards(section: StringSection): Observable<SectionAndCards>;
    updateSectionAndCards(section: StringSection, obj: SectionAndCards): Observable<SectionAndCards>;
    // updateElContent(obj: ElInterface, val: string): Observable<ElInterface>;
}