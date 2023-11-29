import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisAsisPage } from './vis-asis.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HelperService } from 'src/app/services/helper.service';
import { AngularDelegate, ModalController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('VisAsisPage', () => {
  let component: VisAsisPage;
  let fixture: ComponentFixture<VisAsisPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HelperService, ModalController, AngularDelegate],
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig), RouterTestingModule]
    });
    fixture = TestBed.createComponent(VisAsisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });
});
