import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap, timer } from "rxjs";

export interface Esp32Status {
  perfil: string;
  passos: number;
}

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  IP = "192.168.4.1"; // IP do Access Point da ESP
  esp32Url = `http://${this.IP}/status`; // Corrigido para o endpoint /status

  constructor(private http: HttpClient) {}

  getStatus(): Observable<Esp32Status> {
    // Atualiza a cada 2 segundos
    return timer(0, 2000).pipe(
      switchMap(() => this.http.get<Esp32Status>(this.esp32Url))
    );
  }
}
