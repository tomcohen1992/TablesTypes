import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private ROOT_URL = 'https://60254db336244d001797bf80.mockapi.io';

  constructor(private http: HttpClient) { }

  getUsers(page: number, search: string): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/db_scheme?page=${page}&limit=20&search=${search}`);
  }
}
