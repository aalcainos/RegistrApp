import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { LocationsService } from 'src/app/services/locations.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  contrasena: string='';
  usuario:string='';

  nombre: string='';
  carrera: string='';

  regiones:Region[]=[];
  regionSel:number = 0;
  comunas:Comuna[]=[];
  comunaSel:number = 0;

  constructor(private formBuilder: FormBuilder, 
              private auth:AngularFireAuth,
              private helper:HelperService,
              private storage:StorageService,
              private router:Router,
              private LocationService:LocationsService ) {
  }

  ngOnInit() {
    this.cargarRegion();
  }

  
  //location
  async cargarRegion(){
    const req = await this.LocationService.getRegion();
    this.regiones = req.data;

    return req;
  }

  async cargarComuna(){
    try{
      const req = await this.LocationService.getComuna(this.regionSel);
      this.comunas = req.data;
    }catch(error:any){
      await this.helper.showAlert("error en comuna","Error");
    }

  }

  getNombreComuna(id: number): string {
    const comuna = this.comunas.find(comuna => comuna.id === id);
    return comuna ? comuna.nombre : '';
  }

  getNombreRegion(id: number): string{
    const region = this.regiones.find(region => region.id==id);
    return region ? region.nombre : '';
  }

  validarCampoNoVacio(valor: string, nombreCampo: string): boolean{
    if(valor === ''){
      this.helper.showAlert(`Debe ingresar un valor para ${nombreCampo}`, 'Error');
      return false;
    } else if (valor.length < 3) {
      this.helper.showAlert(`${nombreCampo} debe tener al menos 3 caracteres`, 'Error');
      return false;
    }
    return true;
  }

  validarCampoSeleccionado(valor: number, nombreCampo: string): boolean{
    if(valor ===0){
      this.helper.showAlert(`Debe seleccionar una ${nombreCampo}`, 'Error');
      return false;
    }
    return true;
  }

  async cargandoRegistro(){
    const loader = await this.helper.showLoading();

    if (this.usuario == ''){
      await loader.dismiss();
      await this.helper.showAlert("Debe ingresar un correo","Error");
      return;
    }

    if(!this.validarCampoNoVacio(this.nombre, 'Nombre')){
      await loader.dismiss();
      return;
    }

    if(!this.validarCampoNoVacio(this.carrera, 'Carrera')){
      await loader.dismiss();
      return;
    }

    if (!this.validarCampoSeleccionado(this.regionSel, 'Región')) {
      await loader.dismiss();
      return;
    }

    if(!this.validarCampoSeleccionado(this.comunaSel, 'Comuna')){
      await loader.dismiss();
      return;
    }

    var user = 
    [
      {
        correo:this.usuario,
        contrasena:this.contrasena,
        nombre:this.nombre,
        carrera:this.carrera,
        region:this.getNombreRegion(this.regionSel),
        comuna:this.getNombreComuna(this.comunaSel)
      }
    ]
    try {
    const request = await this.auth.createUserWithEmailAndPassword(this.usuario,this.contrasena);
      this.storage.guardarUsuario(user);
    await this.router.navigateByUrl('login');
    await loader.dismiss(); 
    await this.helper.showAlert("Usuario registrado correctamente","Información");  
    } catch (error:any) {
      if (error.code == 'auth/email-already-in-use') {
        await loader.dismiss();
        await this.helper.showAlert("El correo ya se encuentra registrado.","Error");
      }
      if (error.code == 'auth/invalid-email') {
        await loader.dismiss();
        await this.helper.showAlert("El correo no es el correcto.","Error");
      }
      if (error.code == 'auth/weak-password') {
        await loader.dismiss();
        await this.helper.showAlert("El largo de la contraseña es muy corto.","Error");
      }
    }
  }

}

