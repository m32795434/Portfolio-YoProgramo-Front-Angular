import { Observable } from 'rxjs';
import { ABM, AuthObj, SectionAndCards, SectionInfo, StringSection, User } from './sections-interfaces';
import { SectionCard } from './sections-interfaces';

export interface Conexion {
    // getCards(val: string): Observable<any>;
    getSectionAndCards(section: StringSection): Observable<SectionAndCards> | undefined;
    updateSectionInfo(sec: StringSection, obj: SectionInfo): Observable<any> | undefined;
    aBMCard(sec: StringSection, obj: SectionCard, abm: ABM, i: number): Observable<any> | undefined;
    checkAuth(user: User): Observable<AuthObj> | undefined;
    saveUser(user: User): Observable<string> | undefined;
    // updateElContent(obj: ElInterface, val: string): Observable<ElInterface>;
}