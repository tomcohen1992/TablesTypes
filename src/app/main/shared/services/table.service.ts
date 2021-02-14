import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { IUser } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable()
export class TableService {
  public isLoading$: Subject<boolean> = new Subject();

  constructor(
    private apiService: ApiService,
  ) { }

  getUsers(page: number, search: string = ''): Observable<IUser[]> {
    return this.apiService.getUsers(page, search).pipe(
      map((res: any) => {
        return res.map(user => {
          return {id: user.id, firstName: user.firstName, lastName: user.lastName };
        });
      }),
      tap((receivedData: IUser[]) => {
        console.log(receivedData);
      }),
      delay(1500));
  }
}
