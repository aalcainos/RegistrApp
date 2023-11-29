import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-detalle-asis',
  templateUrl: './detalle-asis.page.html',
  styleUrls: ['./detalle-asis.page.scss'],
})
export class DetalleAsisPage implements OnInit {
  public loaded = true;
  constructor(private route: ActivatedRoute,
              private storageAsis: AsistenciasService,
              private auth:AngularFireAuth) { }

  idAsis: number=0;
  asisActual: Asistencia[] = [];

  ngOnInit() {
    this.idAsis = this.route.snapshot.params["idAsis"];
    this.traerAsistencia();
    setTimeout(() =>{this.loaded=false},5000)
  }

  async traerAsistencia(){
    this.asisActual=[];
    var usuario = await this.auth.currentUser;
    if (usuario?.email){
      var usuarioString= usuario.email.split('@')[0];
      this.asisActual = await this.storageAsis.traerAsis(usuarioString, this.idAsis);
    }
  }
}

