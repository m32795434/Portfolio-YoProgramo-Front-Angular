import { Observable } from 'rxjs';

export interface RequestServicesInterface {
    getAllSection(): Observable<{}>;
    updateElContent(): Observable<{}>;
}