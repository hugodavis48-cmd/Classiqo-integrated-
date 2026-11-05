/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const DEFAULT_FALLBACK_IMAGE = '/assets/images/sany_boom_pump_1780289808297.png';
export const DEFAULT_PARTS_FALLBACK = '/assets/images/concrete_pump_pipes_1780284052994.png';
export const DEFAULT_LABOR_FALLBACK = '/assets/aistudio/a988fb32-58ae-4b9b-a798-129545d20f7c_c8faa863.jpeg';
export const DEFAULT_GALLERY_FALLBACK = '/assets/images/gallery_eko_atlantic_1793853656107.jpg';

export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = DEFAULT_FALLBACK_IMAGE
) {
  const target = e.currentTarget;
  if (!target.dataset.hasFallback) {
    target.dataset.hasFallback = 'true';
    if (target.src.includes('/src/assets/')) {
      target.src = target.src.replace('/src/assets/', '/assets/');
    } else {
      target.src = fallbackSrc;
    }
  }
}
