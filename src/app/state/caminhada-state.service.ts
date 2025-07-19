import { Injectable, Signal, signal, WritableSignal } from "@angular/core";

export interface Caminhada {
  data: string;
  distancia: number; // em metros
  tempo: string; // no formato "MM:SS"
  velocidadeMedia: number; // em m/s
}

@Injectable({
  providedIn: "root",
})
export class CaminhadaStateService {
  private historicoSignal: WritableSignal<Caminhada[]> = signal([]);

  public readonly historico: Signal<Caminhada[]> =
    this.historicoSignal.asReadonly();

  private dadosMocados: Caminhada[] = [
    {
      data: "18/07/2025",
      distancia: 1250,
      tempo: "15:30",
      velocidadeMedia: 1.34,
    },
    {
      data: "16/07/2025",
      distancia: 800,
      tempo: "10:15",
      velocidadeMedia: 1.3,
    },
  ];

  constructor() {
    this.historicoSignal.set(this.dadosMocados);
  }

  adicionarCaminhada(novaCaminhada: Caminhada): void {
    this.historicoSignal.update((historicoAtual) => [
      novaCaminhada,
      ...historicoAtual,
    ]);
  }
}
