import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Asistencia } from 'src/app/models/asistencia';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-vis-asis',
  templateUrl: './vis-asis.page.html',
  styleUrls: ['./vis-asis.page.scss'],
})
export class VisAsisPage implements OnInit {

  constructor(private storageAsis:AsistenciasService,
              private auth:AngularFireAuth,
              private router: Router,
              private helper:HelperService) { }

  ngOnInit() {
    this.mostrarAsis()
  }

  asistencias: Asistencia[] = [];
  strIdAsis:string="";

  async mostrarAsis(){
    this.asistencias=[];
    var usuario = await this.auth.currentUser;
    if (usuario?.email){
      var usuarioString= usuario.email.split('@')[0];
      this.asistencias = await this.storageAsis.consultarAsis(usuarioString);
      if (this.asistencias.length === 0){
        this.helper.showAlert("No has registrado ni una asistencia por el momento. Escanea un QR para comenzar.", "Aviso");
      }
    }
  }

  async verDetalle(idAsis: number){
    this.router.navigateByUrl(`detalle-asis/${idAsis}`);
  }
}
