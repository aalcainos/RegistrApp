import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';
import { HelperService } from 'src/app/services/helper.service';
import { AsistenciasService } from 'src/app/services/asistencias.service';


@Component({
  selector: 'app-confirmar-qr',
  templateUrl: './confirmar-qr.page.html',
  styleUrls: ['./confirmar-qr.page.scss'],
})

export class ConfirmarQrPage implements OnInit {

  @Input() asisData: any[] = [];

  constructor(private modalController: ModalController,
    private helper: HelperService,
    private asisStorage: AsistenciasService) { }
  asistencia: any;

  ngOnInit() {

  }

  copiarTexto() {
    const detalle = document.getElementById("text") as HTMLElement;
    const text = detalle.innerText;
    Clipboard.write({ string: text }).then(() => {
      this.helper.showToast("top", "El texto fue copiado a portapapeles.");
    })
  }

  async close() {
    var close = await this.helper.showConfirm("¿Desea cerrar esta pestaña?", "Sí", "No");
    if (close == true) {
      this.modalController.dismiss();
    }
  }

  async saveAsis() {
    this.asisStorage.guardarAsistencia(this.asisData);
    this.modalController.dismiss();

  }
}