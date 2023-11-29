import { TestBed } from '@angular/core/testing';

import { AsistenciasService } from './asistencias.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularDelegate, ModalController } from '@ionic/angular';

describe('AsistenciasService', () => {
  let service: AsistenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ModalController,AngularDelegate],
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    service = TestBed.inject(AsistenciasService);
  });

   it('should be created', () => {
    expect(service).toBeTruthy();
   });
});
