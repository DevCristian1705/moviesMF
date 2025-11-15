import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators'; 
import { remoteMovieShown } from './movies.action';
import { EventBusRemote } from '../shared/event-bus';

@Injectable()
export class MoviesEffects {

  // REMOTE → SHELL
  sendMovieShown$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(remoteMovieShown),
        tap((action) => {
          console.log('[MoviesMF Effect] Enviando MOVIE_SHOWN al Shell:', action);

          EventBusRemote.emit({
            source: 'moviesMF',
            type: 'MOVIE_SHOWN',
            payload: { id: action.id }
          });
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}