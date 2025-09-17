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
import { HttpClient } from "@angular/common/http";

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
  exportarExcel() {
    // Importação dinâmica para evitar problemas de build
    import("xlsx").then((xlsx) => {
      const caminhadasArr = this.caminhadas();
      if (!caminhadasArr || caminhadasArr.length === 0) return;

      // Monta os dados para exportação
      const data = caminhadasArr.map((walk) => ({
        Data: walk.data,
        Distância: walk.distancia,
        Tempo: walk.tempo,
        "Velocidade Média": walk.velocidadeMedia,
      }));

      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, "Caminhadas");

      // Gera o arquivo Excel em memória
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Salva o arquivo usando file-saver
      import("file-saver").then((fs) => {
        const blob = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });
        fs.saveAs(blob, "caminhadas.xlsx");
      });
    });
  }
  selectedOption: "time" | "distance" = "time";
  inputValue: number | null = null;
  selectedProfile: "jovem" | "adulto" | "idoso" = "jovem";
  perfilSelecionado: string = "";

  displayedColumns = ["data", "distancia", "tempo", "velocidadeMedia"];

  caminhadas: Signal<Caminhada[]>;

  IP = "192.168.0.21";

  constructor(
    private router: Router,
    private historicoService: CaminhadaStateService,
    private http: HttpClient
  ) {
    this.caminhadas = this.historicoService.historico;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.perfilSelecionado = "jovem";
  }

  startWalk() {
    if (!this.inputValue || this.inputValue <= 0) return;

    // Monta a URL de acordo com o perfil
    const url = `http://${
      this.IP
    }/start-${this.perfilSelecionado.toLowerCase()}`;

    // Faz a requisição GET
    this.http.get(url, { responseType: "text" }).subscribe({
      next: (res) => {
        console.log("Resposta do ESP32:", res);

        // Depois navega para /tracking
        this.router.navigate(["/tracking"], {
          queryParams: {
            mode: this.selectedOption,
            value: this.inputValue,
            perfil: this.perfilSelecionado,
          },
        });
      },
      error: (err) => {
        console.error("Erro ao chamar ESP32:", err);
      },
    });
  }

  salvarPerfil(valor: string) {
    this.perfilSelecionado = valor;
  }
}
