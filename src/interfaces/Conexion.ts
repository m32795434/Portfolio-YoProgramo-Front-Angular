import { Observable } from 'rxjs';
import { SectionAndCards, StringSection } from './sections-interfaces';

export interface Conexion {
    // getCards(val: string): Observable<any>;
    getSectionAndCards(section: StringSection): Observable<SectionAndCards> | null;
    updateSectionAndCards(section: StringSection, obj: SectionAndCards): Observable<SectionAndCards> | null;
    // updateElContent(obj: ElInterface, val: string): Observable<ElInterface>;
}