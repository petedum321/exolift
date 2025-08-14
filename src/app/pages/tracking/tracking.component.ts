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
import { ActivatedRoute, Router } from "@angular/router";
import {
  Caminhada,
  CaminhadaStateService,
} from "../../state/caminhada-state.service";

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
  // --- Propriedades da Meta de Treino ---
  metaModo: string | null = null;
  metaValor: number | null = null;

  metaModoExibido: string | null = null;
  metaValorExibido: number | null = null;
  metaSelecao: string | null = null;

  // --- Propriedades do Cronômetro ---
  tempoDecorrido = "00:00"; // Apenas uma declaração, inicializado em 0
  private totalSegundos = 0;
  private intervalo: any;

  // --- Propriedades dos Dados em Tempo Real ---
  progresso = 93; // Você vai querer atualizar isso dinamicamente depois
  passos = 39;
  velocidade = 0.9;
  data: Esp32Data | undefined;
  private subscription: Subscription | undefined;

  // --- Dados Mockados (Exemplo) ---
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

  constructor(
    private sensorService: WebsocketService,
    private router: Router,
    private route: ActivatedRoute,
    private historicoService: CaminhadaStateService
  ) {}

  ngOnInit(): void {
    // 1. Inicia o cronômetro
    this.iniciarCronometro();

    // 2. Lê a meta da rota
    this.metaModo = this.route.snapshot.queryParams["mode"];
    const valorDaMetaString = this.route.snapshot.queryParams["value"];
    this.metaValor = valorDaMetaString ? Number(valorDaMetaString) : null;
    this.metaSelecao = this.route.snapshot.queryParams["perfil"]; // Resgata o perfil da rota

    if (this.metaModo === "distance") {
      this.metaModoExibido = "metros";
    }

    if (this.metaModo === "time") {
      this.metaModoExibido = "minutos";
    }

    console.log(
      "Meta de treino:",
      this.metaModo,
      this.metaValor,
      "Perfil:",
      this.metaSelecao
    );
    // 3. Conecta ao Websocket para receber dados dos sensores
    this.subscription = this.sensorService.getData().subscribe({
      next: (d) => {
        console.log("Dados recebidos:", d);
        this.data = d;
        // Futuramente, você pode atualizar 'passos', 'velocidade', etc., aqui
      },
      error: (e) => console.error("Erro ao buscar dados:", e),
    });
  }

  ngOnDestroy(): void {
    // Limpa tudo ao sair do componente para evitar vazamento de memória
    this.subscription?.unsubscribe();
    clearInterval(this.intervalo);
  }

  // --- MÉTODOS DE CONTROLE DO TREINO ---

  finalizarTreino(): void {
    console.log("Treino finalizado");
    const caminhadaFixa: Caminhada = {
      data: new Date().toLocaleDateString("pt-BR"), // Usamos a data atual para ficar realista
      distancia: 2000, // Valor fixo de 2000 metros
      tempo: this.tempoDecorrido, // Tempo decorrido do cronômetro
      velocidadeMedia: 1.32, // Valor fixo de 1.32 m/s
    };
    this.historicoService.adicionarCaminhada(caminhadaFixa);

    // É importante parar o cronômetro aqui também
    clearInterval(this.intervalo);
    this.router.navigate([""]);
  }

  // --- MÉTODOS DO CRONÔMETRO ---

  private iniciarCronometro(): void {
    this.intervalo = setInterval(() => {
      this.totalSegundos++;
      this.tempoDecorrido = this.formatarTempo(this.totalSegundos);
    }, 1000);
  }

  private formatarTempo(totalSegundos: number): string {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    const minutosFormatados = String(minutos).padStart(2, "0");
    const segundosFormatados = String(segundos).padStart(2, "0");
    return `${minutosFormatados}:${segundosFormatados}`;
  }
}
