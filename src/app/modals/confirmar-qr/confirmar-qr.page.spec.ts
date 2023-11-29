import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarQrPage } from './confirmar-qr.page';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('ConfirmarQrPage', () => {
  let component: ConfirmarQrPage;
  let fixture: ComponentFixture<ConfirmarQrPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalController, AngularDelegate],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    fixture = TestBed.createComponent(ConfirmarQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
