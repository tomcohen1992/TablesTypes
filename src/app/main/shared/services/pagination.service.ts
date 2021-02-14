import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PaginationService {
  public page$: Subject<number> = new Subject<number>();

  constructor() { }
}
