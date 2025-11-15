import { Component, inject, OnInit } from '@angular/core'; 
 
import { Store } from '@ngrx/store'; 
import { EventBusRemote } from './shared/event-bus';  

export const environment = {
  production: false,
  assetUrl: 'http://localhost:4201'
};

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent implements OnInit { 
  movies  : any[] = [
    {
      id: 1,
      tittle: 'Avatar',
      imagen:  `${environment.assetUrl}/avatar.jpeg` 
    },
    {
      id: 2,
      tittle: 'Elementos',
      imagen: `${environment.assetUrl}/elementos.jpeg`
    },
    {
      id: 3,
      tittle: 'Disney',
      imagen: `${environment.assetUrl}/disney.jpeg`
    },
    {
      id: 4,
      tittle: 'Barbie',
      imagen: `${environment.assetUrl}/barbie.jpeg`
    }
  ]; 

  private store = inject(Store);

  async ngOnInit() {   
    EventBusRemote.on().subscribe(evt => {
      console.log('[MoviesMF] Evento recibido:', evt);

      if (evt.type === 'SHOW_MOVIE') {
        console.log('[MoviesMF] SHOW_MOVIE recibido con ID:', evt.payload.id); 
        this.onShellEvent(evt);
      }
    });
  }
 
  onShellEvent(evt: any) { 
    if (evt.type === 'SHOW_MOVIE') {
      console.log('[moviesMF] SHOW_MOVIE payload: ENVIA AL SHELL', evt.payload);
      EventBusRemote.emit({
        source: 'moviesMF',
        type: 'MOVIE_SHOWN',
        payload: { ok: true, id: evt.payload?.id }
      });
    }
  }
 
  shellPing() {
    EventBusRemote.emit({
      source: 'moviesMF',
      type: 'PING',
      payload: { when: Date.now() }
    });
  }

  onViewTickets(movie: any){
    window.dispatchEvent(new CustomEvent('showTickets', { detail: { movie } }));
  }

}
