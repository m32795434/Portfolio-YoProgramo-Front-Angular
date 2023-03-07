import { Observable } from 'rxjs';

export interface RequestServicesInterface {
    getAllSection(): Observable<any>;
    updateElContent(): Observable<any>;
}