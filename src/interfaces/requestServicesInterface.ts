import { Observable } from 'rxjs';
import { Sections } from './sectionsInterface';
import { SlidesInterface } from './slidesInterface';

export interface RequestServicesInterface {
    getAllSections(val: string): Observable<Sections>;
    // getSlides(val: string): Observable<any>;
    updateElContent(val: string): Observable<{}>;
    updateSlideElContent(el: SlidesInterface): Observable<SlidesInterface>;
}