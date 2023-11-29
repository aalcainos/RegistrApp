import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular'
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})



export class HelperService {

  constructor(
    private alertService:AlertController,
    private loadingService:LoadingController,
    private toastService:ToastController,
    private modalController:ModalController
    ) { }

  async showAlert(msg:string,title:string){
      var alert = await this.alertService.create({
        cssClass:"alertClass",
        message:msg,
        header:title,
        buttons:['Aceptar']})
      await alert.present();
      return alert;
  }


  async showConfirm(msg:string,btn_si:string,btn_no:string){
    let promise = new Promise<boolean>(async (resolve) =>{
      var alert = await this.alertService.create({cssClass:"", message:msg,buttons:
      [
        {
          text:btn_si,
          handler:() =>{
            resolve(true);
          }
        },
        {
          text:btn_no,
          handler:() =>{
            resolve(false);
          }
       }
    ]
    });
    await alert.present();
  })
  return promise;
}

async showLoading() {
  const loading = await this.loadingService.create({
    message: 'Cargando espere unos segundos...',
    duration: 3000,
  });

  await loading.present();
  return loading;
}

async showToast(position: 'top', msg: string, duracion:number = 2000) {
  const toast = await this.toastService.create({
    message: msg,
    duration: duracion,
    position: position,
  });

  await toast.present();
  return toast;
}

async showModal(componente:any,props:any= {}, hideable = false){
  var modal = await this.modalController.create(
    {
      component:componente,
      cssClass:"modalClass",
      componentProps:props,
      backdropDismiss:hideable
    });
    await modal.present();
}

}



