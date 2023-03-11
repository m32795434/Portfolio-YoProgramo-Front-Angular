import { Observable } from 'rxjs';

export interface RequestServicesInterface {
    getAllSection(val: string): Observable<{}>;
    updateElContent(val: string): Observable<{}>;
}