import { Observable } from 'rxjs';
import { Experience, Home, Projects, QPD } from './sections-interfaces';

export interface RequestServicesInterface {
    // getSlides(val: string): Observable<any>;
    getSection(section: string): Observable<Home | Experience | QPD | Projects>;

    // updateElContent(obj: ElInterface, val: string): Observable<ElInterface>;
}