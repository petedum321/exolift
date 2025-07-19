import { Component, OnDestroy, OnInit } from "@angular/core";
import { Esp32Data, WebsocketService } from "../../services/websocket.service";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "app-tracking",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: "./tracking.component.html",
  styleUrl: "./tracking.component.scss",
})
export class TrackingComponent implements OnInit, OnDestroy {
  tempoDecorrido = "00:28";
  progresso = 93;
  passos = 39;
  velocidade = 0.9;

  pernaEsquerda = [
    {
      id: 1,
      angulo: 55.35,
      torque: 6.26,
      corrente: 2.36,
      temperatura: 43.89,
      rpm: 1227,
    },
    {
      id: 2,
      angulo: 34.08,
      torque: 11.59,
      corrente: 1.5,
      temperatura: 34.32,
      rpm: 1158,
    },
  ];

  pernaDireita = [
    {
      id: 3,
      angulo: 48.35,
      torque: 14.09,
      corrente: 2.83,
      temperatura: 47.02,
      rpm: 1513,
    },
    {
      id: 4,
      angulo: 15.28,
      torque: 8.08,
      corrente: 2.89,
      temperatura: 39.66,
      rpm: 1277,
    },
  ];

  data: Esp32Data | undefined;
  private subscription: Subscription | undefined;

  constructor(private sensorService: WebsocketService) {}

  ngOnInit(): void {
    this.subscription = this.sensorService.getData().subscribe({
      next: (d) => {
        console.log("Dados recebidos:", d);
        this.data = d;
      },
      error: (e) => console.error("Erro ao buscar dados:", e),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
