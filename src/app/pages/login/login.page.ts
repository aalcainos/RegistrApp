import { Component, OnInit} from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario:string="";
  contrasena:string="";
  recordarUsuario: boolean = false;
  
  constructor(
              private auth:AngularFireAuth,
              private helper:HelperService,
              private storage:StorageService,
              private router:Router) {
                
  }

  ngOnInit() {
    
  }
  
  async cargandoLogin(){
    const loader = await this.helper.showLoading();
    if (this.usuario == "") {
      await loader.dismiss();
      this.helper.showAlert("Debe ingresar un usuario","Error");
      return;
    }
    if (this.contrasena == "") {
      await loader.dismiss();
      this.helper.showAlert("Debe ingresar una contraseña","Error");
      return;
    }
    try {
      const req = await this.auth.signInWithEmailAndPassword(this.usuario,this.contrasena);
      console.log("TOKEN", await req.user?.getIdToken());
      
      this.storage.correoUsuario = this.usuario;
      await loader.dismiss();
      await this.router.navigateByUrl('menu');
      
    } catch (error:any) {
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert("El correo no es el correcto.","Error");
      }
      
      if (error.code == "auth/invalid-login-credentials") {
        await loader.dismiss();
        await this.helper.showAlert("Usuario o contraseña incorrecta.","Error");
      }

      if (error.code == 'auth/user-not-found') {
        await loader.dismiss();
        await this.helper.showAlert("El correo proporcionado no se encuentra registrado.","Error");
      }

      if (error.code == 'auth/too-many-requests') {
        await loader.dismiss();
        await this.helper.showAlert("La cuenta se ha deshabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puedes restaurarla inmediatamente restableciendo tu contraseña o puedes volver a intentarlo más tarde.","Error");
      }
    }

    if (this.recordarUsuario) {
      this.storage.guardarCredenciales(this.usuario, this.contrasena);
    }
  }

}

