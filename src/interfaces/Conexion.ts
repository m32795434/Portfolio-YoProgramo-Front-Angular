import { Observable } from 'rxjs';
import { SectionAndCards, StringSection } from './sections-interfaces';

export interface Conexion {
    // getCards(val: string): Observable<any>;
    getSectionAndCards(section: StringSection): Observable<SectionAndCards> | undefined;
    updateSectionAndCards(section: StringSection, obj: SectionAndCards): Observable<SectionAndCards> | undefined;
    updateSectionInfo(sec: StringSection, obj: SectionAndCards): Observable<any> | undefined;
    // updateElContent(obj: ElInterface, val: string): Observable<ElInterface>;
}