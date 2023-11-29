import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPage } from './menu.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { ConfirmarQrPage } from 'src/app/modals/confirmar-qr/confirmar-qr.page';

describe('MenuPage', () => {
  let component: MenuPage;
  let fixture: ComponentFixture<MenuPage>;
  // Prueba realizada personalizada
  let modal: ConfirmarQrPage;
  let fixure2: ComponentFixture<ConfirmarQrPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ModalController, AngularDelegate],
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    fixture = TestBed.createComponent(MenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Prueba realizada personalizada
    fixure2 = TestBed.createComponent(ConfirmarQrPage);
    modal = fixure2.componentInstance;
    fixure2.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // Prueba realizada personalizada
    expect(modal).toBeTruthy();
  });
});
