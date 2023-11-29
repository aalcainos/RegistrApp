import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordPage } from './reset-password.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularDelegate, ModalController } from '@ionic/angular';

describe('ResetPasswordPage', () => {
  let component: ResetPasswordPage;
  let fixture: ComponentFixture<ResetPasswordPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ModalController, AngularDelegate],
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    fixture = TestBed.createComponent(ResetPasswordPage);
    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });
});
