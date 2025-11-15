import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideStore, provideState } from '@ngrx/store';
import { Actions, provideEffects } from '@ngrx/effects';

import { moviesReducer } from './app/state/movies.reducer';
import { MoviesEffects } from './app/state/movie.effects';

bootstrapApplication(AppComponent, {
  providers: [
    // Root store vacío
    provideStore(),

    // Slice "movies"
    provideState('movies', moviesReducer),

    // Inicializa Actions y efectos globales
    provideEffects(),

    // Registra efectos como factories para asegurar DI correcto
    {
      provide: MoviesEffects,
      useFactory: (actions$: Actions) => new MoviesEffects(actions$),
      deps: [Actions],
    },
  ],
}).catch(err => console.error(err));