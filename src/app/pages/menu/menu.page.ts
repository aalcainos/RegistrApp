import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { ConfirmarQrPage } from 'src/app/modals/confirmar-qr/confirmar-qr.page';
import { Asistencia } from '../../models/asistencia';
import { MenuController } from '@ionic/angular';
import { AsistenciasService } from 'src/app/services/asistencias.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private auth:AngularFireAuth,
              private helper:HelperService,
              private router:Router,
              private menuCtrl:MenuController,
              private asisStorage: AsistenciasService) { }
  modeloAsistencia:Asistencia[]=[];

  ngOnInit() {

  }

  async logout(){
    var confirm = await this.helper.showConfirm("¿Desea cerrar sesión?","Confirmar","Cancelar");
    if(confirm == true){
      await this.auth.signOut();
      this.router.navigateByUrl("login");
    }
  }

  async scaneo(){
    var datosqr = (await BarcodeScanner.scan()).code;
    var email = await this.auth.currentUser;
    try {
      if (datosqr){
        console.log("QR", JSON.parse(datosqr));
        this.modeloAsistencia.push(JSON.parse(datosqr));
        if(email?.email){
          var usuarioStr= email.email.split('@')[0];
          this.modeloAsistencia[0].usuario= usuarioStr;
          this.modeloAsistencia[0].id=this.asisStorage.idAsis();
        }
        const modalData = {asisData:this.modeloAsistencia};
        this.helper.showModal(ConfirmarQrPage,modalData,false);
        this.modeloAsistencia=[];
      }
      
    }
    catch (error:any) {
      await this.helper.showAlert("Ha ocurrido un error en la lectura del QR. Intente nuevamente.","Error");
    }
    
  }

  irAPerfil() {
    this.router.navigate(['/perfil-usuario']);
  }
  abrirMenu(){
    this.menuCtrl.toggle();
  }
  closeMenu(){
    this.menuCtrl.close();
  }
}

