import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

export const Animations = {
  listAnimation: trigger('listAnimation', [
    transition('* <=> *', [
      query(':enter', [
          style({ opacity: 0, transform: 'translateY(-50px)'}),
          stagger(
            '50ms',
            animate('500ms ease-in',
              style({ opacity: 1, transform: 'translateY(0px)'}),
            )
          )
        ], { optional: true }
      )
    ])
  ])
};
