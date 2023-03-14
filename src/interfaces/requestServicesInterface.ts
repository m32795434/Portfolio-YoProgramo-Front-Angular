import { Observable } from 'rxjs';

export interface RequestServicesInterface {
    getAllSection(val: string): Observable<{}>;
    // getSlides(val: string): Observable<any>;
    updateElContent(val: string): Observable<{}>;
}