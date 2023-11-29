import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ModalController, AngularDelegate, HttpClient, HttpHandler],
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });
});