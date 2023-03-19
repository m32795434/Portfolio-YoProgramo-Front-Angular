import { Observable } from 'rxjs';
import { Sections } from './sectionsInterface';
import { ElInterface } from './slidesInterface';

export interface RequestServicesInterface {
    getAllSections(val: string): Observable<Sections>;
    // getSlides(val: string): Observable<any>;
    updateElContent(obj: ElInterface, val: string): Observable<ElInterface>;
    updateSlideElContent(el: ElInterface): Observable<ElInterface>;
}