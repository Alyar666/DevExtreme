import { titleize } from '../../../../core/utils/inflector';
import {
  ElementOffset,
  ScrollableDirection, ScrollOffset,
} from '../types.d';

import { getRelativeOffset } from './get_relative_offset';

import {
  DIRECTION_VERTICAL,
  SCROLLABLE_CONTENT_CLASS,
} from '../common/consts';

/* istanbul ignore next */
export function getElementLocationInternal(
  targetElement: HTMLElement,
  direction: ScrollableDirection,
  containerElement: HTMLDivElement,
  scrollOffset: ScrollOffset,
  offset?: ElementOffset,
): number {
  const additionalOffset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...offset,
  };

  const isVertical = direction === DIRECTION_VERTICAL;

  const prop = isVertical ? 'top' : 'left';
  const inverseProp = isVertical ? 'bottom' : 'right';
  const dimension = isVertical ? 'height' : 'width';

  const containerOffsetSize: number = containerElement[`offset${titleize(dimension)}`];
  const containerClientSize: number = containerElement[`client${titleize(dimension)}`];
  const containerSize = containerElement.getBoundingClientRect()[dimension];
  const elementSize = targetElement.getBoundingClientRect()[dimension];

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  let scale = 1;

  // For support zooming using styles: transform = scale(0.33) or zoom = 0.33
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (Math.abs(containerSize - containerOffsetSize) > 1) {
    scale = containerSize / containerOffsetSize;
  }

  // T162489
  const relativeElementOffset = getRelativeOffset(
    SCROLLABLE_CONTENT_CLASS,
    targetElement,
  )[prop] / scale;

  const containerScrollOffset = scrollOffset[prop];

  const relativeStartOffset = containerScrollOffset - relativeElementOffset
    + additionalOffset[prop];
  const relativeEndOffset = containerScrollOffset - relativeElementOffset
    - elementSize / scale
    + containerClientSize
    - additionalOffset[inverseProp];

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (relativeStartOffset <= 0 && relativeEndOffset >= 0) {
    return containerScrollOffset;
  }

  return containerScrollOffset
    - (Math.abs(relativeStartOffset) > Math.abs(relativeEndOffset)
      ? relativeEndOffset
      : relativeStartOffset);
}
