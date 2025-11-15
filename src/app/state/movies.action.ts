import { createAction, props } from '@ngrx/store';

export const remoteMovieShown = createAction(
  '[Remote] Movie Shown',
  props<{ id: number }>()
);