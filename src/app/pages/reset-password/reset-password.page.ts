import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  correo: string='';

  constructor(private auth:AngularFireAuth,
              private helper:HelperService,
              private router:Router) { }

  ngOnInit() {
  }

  async resetPassword(){
   const loader = await this.helper.showLoading();
    if (this.correo == '') {
      await loader.dismiss();
      this.helper.showAlert("Debe ingresar un correo." ,"Error");
      return;
    }
    try {
      await this.auth.sendPasswordResetEmail(this.correo);
      await this.helper.showAlert("Debe revisar su correo","Información");
      await loader.dismiss();
      await this.router.navigateByUrl("login");
    } catch (error:any) {
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert("El correo no es el correcto.","Error");
      }
      if (error.code == 'auth/user-not-found') {
        await loader.dismiss();
        await this.helper.showAlert("El correo proporcionado no se encuentra registrado.","Error");
      }
    }
  }


}
