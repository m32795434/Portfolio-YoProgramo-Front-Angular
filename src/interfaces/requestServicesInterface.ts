import { Observable } from 'rxjs';
import { SlidesInterface } from './slidesInterface';

export interface RequestServicesInterface {
    getAllSection(val: string): Observable<{}>;
    // getSlides(val: string): Observable<any>;
    updateElContent(val: string): Observable<{}>;
    updateSlideElContent(el: SlidesInterface): Observable<SlidesInterface>;
}