import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  Esp32Message,
  WebsocketService,
} from "../../services/websocket.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-tracking",
  standalone: true,
  imports: [],
  templateUrl: "./tracking.component.html",
  styleUrl: "./tracking.component.scss",
})
export class TrackingComponent implements OnInit, OnDestroy {
  latestMsg: Esp32Message | null = null;
  private subscription: Subscription | undefined;

  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    this.subscription = this.wsService.getMessages().subscribe({
      next: (msg) => {
        console.log("Mensagem recebida:", msg);
        this.latestMsg = msg;
      },
      error: (err) => {
        console.error("Erro no WebSocket:", err);
      },
      complete: () => {
        console.log("WebSocket fechado");
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.wsService.close();
  }
}
