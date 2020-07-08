import {
  trigger,
  state,
  style,
  transition,
  animate,
  animateChild,
  query,
} from '@angular/animations';

export const onDrawerChange = trigger('onDrawerChange', [
  state(
    'close',
    style({
      width: '72px',
    })
  ),
  state(
    'open',
    style({
      width: '240px',
    })
  ),
  transition('close => open', animate('200ms ease-in')),
  transition('open => close', animate('250ms ease-out')),
]);

export const onMainContentChange = trigger('onMainContentChange', [
  state(
    'close',
    style({
      'margin-left': '72px',
    })
  ),
  state(
    'open',
    style({
      'margin-left': '240px',
    })
  ),
  transition('close => open', animate('150ms ease-in')),
  transition('open => close', animate('150ms ease-in')),
]);

export const animateText = trigger('animateText', [
  state(
    'hide',
    style({
      display: 'none',
      opacity: 0,
    })
  ),
  state(
    'show',
    style({
      display: 'block',
      opacity: 1,
    })
  ),
  transition('close => open', animate('100ms ease-in')),
  transition('open => close', animate('100ms ease-out')),
]);
