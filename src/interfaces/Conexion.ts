import { Observable } from 'rxjs';
import { ABM, SectionAndCards, SectionInfo, StringSection, User } from './sections-interfaces';
import { SectionCard } from './sections-interfaces';
import { UpdateUserAndPassObj } from './spring-interfaces';

export interface Conexion {
    // getCards(val: string): Observable<any>;
    getSectionAndCards(section: StringSection): Observable<SectionAndCards> | undefined;
    updateSectionInfo(sec: StringSection, obj: SectionInfo): Observable<any> | undefined;
    aBMCard(sec: StringSection, obj: SectionCard, abm: ABM, i: number): Observable<any> | undefined;
    checkAuth(user: User): Observable<boolean> | undefined;
    saveUser(user: UpdateUserAndPassObj): Observable<any> | undefined;
    // updateElContent(obj: ElInterface, val: string): Observable<ElInterface>;
}