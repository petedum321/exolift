import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap, timer } from "rxjs";

export interface Esp32Data {
  msg: string;
  value: number;
  temperatura: number;
  umidade: number;
  status: string;
}

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  private esp32Url = "http://192.168.0.105/data"; // Coloque o IP do ESP32 aqui

  constructor(private http: HttpClient) {}

  getData(): Observable<Esp32Data> {
    return timer(0, 2000).pipe(
      switchMap(() => this.http.get<Esp32Data>(this.esp32Url))
    );
  }
}
