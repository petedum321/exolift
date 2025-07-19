import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

export interface Esp32Message {
  msg: string;
  value: number;
}

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  private socket$: WebSocketSubject<Esp32Message>;

  constructor() {
    this.socket$ = webSocket<Esp32Message>("ws://192.168.1.100:8080/");
  }

  public getMessages(): Observable<Esp32Message> {
    return this.socket$.asObservable();
  }

  public close() {
    this.socket$.complete();
  }
}
