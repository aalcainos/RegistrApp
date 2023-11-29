import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Preferences } from '@capacitor/preferences';
import { StorageService } from './storage.service';
import { HelperService } from './helper.service';

const keyStorageAsistencia = "AsistenciaData";

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {

  constructor(private authFire:AngularFireAuth,
              private storageUser: StorageService,
              private helper: HelperService)
  { }

  async getItem(llave:string):Promise<string | null>{
    const obj = await Preferences.get({key:llave});
    return obj.value;
  }

  async setItem(llave:string, valor:string){
    await Preferences.set({key:llave, value:valor});
  }

  async obtenerAsistencia(){
    const asistencias = await this.getItem(keyStorageAsistencia);

    if (asistencias==null){
      return [];
    }
    const JSONAsis = JSON.parse(asistencias);

  if (JSONAsis) {
      return JSONAsis;
    }
    else
    {
      return [];
    }
  }

  async guardarAsistencia(asistencia:any[]){
    if(await this.duplicado(asistencia)==false){
      const asistenciaStorage = await this.obtenerAsistencia();
      for (const i of asistenciaStorage) {
        if (asistenciaStorage) {
          asistencia.push(i);
        }
      }
      this.setItem(keyStorageAsistencia,JSON.stringify(asistencia));
      await this.helper.showToast("top","Asistencia guardada");
    }
    else{
      this.helper.showAlert("Esta asistencia ya fue registrada.","Asistencia duplicada");
    }
  }

  idAsis(): number{
    const date=new Date();
    const idAsis=date.getTime()+Math.floor(Math.random());
    return idAsis;
  }

  async duplicado(asistencia: any[]){
    if (asistencia) {
      const arrayAsis: any[] = await this.consultarAsis(asistencia[0].usuario);
      for (const i of asistencia) {
        for (let asis of arrayAsis) {
          if (i.fecha == asis.fecha) {
            if (i.hora == asis.hora) {
              return true;
            }
          }
        }
      }
    }
    else{
      this.helper.showAlert("Ha ocurrido un error inesperado", "Error")
    }
    return false;
  }

  async consultarAsis(usuario: string){
    const arrayAsis: any[] = [];
    const asistenciaStorage = await this.obtenerAsistencia();
    for (let asis of asistenciaStorage){
      if(asis.usuario==usuario){
        arrayAsis.push(asis);
      }
    }
    return arrayAsis;
  }

  async traerAsis(usuario: string, id:number){
    const arrayAsis: any[] = await this.consultarAsis(usuario);
    let asis: any[] = [];
    for (let i of arrayAsis) {
      if(i.id==id){
        asis.push(i);
        break;
      }
    }
    return asis;
  }
  
}
