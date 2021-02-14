import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';

@Injectable()
export class NavbarService implements OnDestroy{
  routeSub$: Subscription;
  title: BehaviorSubject<string>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.title = new BehaviorSubject('');

    this.routeSub$ = router.events.subscribe(event => {
      if (event instanceof ActivationStart) {
        if (!event.snapshot.data.title) { return; }

        this.title.next(event.snapshot.data.title);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }
}
