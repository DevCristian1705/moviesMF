import { Subject, Observable } from 'rxjs';

declare global {
  interface Window { __CINE_EVENT_BUS__?: Subject<any>; }
}

export const EventBusRemote = {
  emit(event: any) { 
    window.__CINE_EVENT_BUS__?.next(event); 
  },
  on(): Observable<any> { 
    return window.__CINE_EVENT_BUS__?.asObservable()!; 
  }
};