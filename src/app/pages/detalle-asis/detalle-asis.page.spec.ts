import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAsisPage } from './detalle-asis.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HelperService } from 'src/app/services/helper.service';
import { AngularDelegate, ModalController } from '@ionic/angular';

describe('DetalleAsisPage', () => {
  let component: DetalleAsisPage;
  let fixture: ComponentFixture<DetalleAsisPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HelperService, ModalController, AngularDelegate],
      imports:[RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    fixture = TestBed.createComponent(DetalleAsisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
   });
});
