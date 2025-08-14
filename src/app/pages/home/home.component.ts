import { Component, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import {
  Caminhada,
  CaminhadaStateService,
} from "../../state/caminhada-state.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIcon,
  ],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  selectedOption: "time" | "distance" = "time";
  inputValue: number | null = null;
  selectedProfile: "jovem" | "adulto" | "idoso" = "jovem";
  perfilSelecionado: string = "";

  displayedColumns = ["data", "distancia", "tempo", "velocidadeMedia"];

  caminhadas: Signal<Caminhada[]>;

  constructor(
    private router: Router,
    private historicoService: CaminhadaStateService
  ) {
    this.caminhadas = this.historicoService.historico;
  }

  startWalk() {
    if (!this.inputValue || this.inputValue <= 0) return;
    this.router.navigate(["/tracking"], {
      queryParams: {
        mode: this.selectedOption,
        value: this.inputValue,
        perfil: this.perfilSelecionado,
      },
    });
  }

  salvarPerfil(valor: string) {
    this.perfilSelecionado = valor;
  }
}
