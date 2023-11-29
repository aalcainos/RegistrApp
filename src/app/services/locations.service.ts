import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/apiResponse';
import { Region } from '../models/region';
import { Comuna } from '../models/comuna';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http:HttpClient) { }

  async getRegion(){
    return await lastValueFrom(this.http.get<ApiResponse<Region>>(`${environment.apiUrl}region`));
  }

  async getComuna(idRegion:number){
    return await lastValueFrom(this.http.get<ApiResponse<Comuna>>(`${environment.apiUrl}comuna/` + idRegion));
  }
}
