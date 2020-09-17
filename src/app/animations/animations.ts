import {
  trigger,
  state,
  style,
  transition,
  animate,
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
  transition('close => open', animate('100ms ease-in')),
  transition('open => close', animate('100ms ease-out')),
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
  transition('close => open', animate('100ms ease-in')),
  transition('open => close', animate('100ms ease-in')),
]);

export const animateText = trigger('animateText', [
  state(
    'close',
    style({
      display: 'none',
      opacity: 0,
    })
  ),
  state(
    'open',
    style({
      display: 'block',
      opacity: 1,
    })
  ),
]);
