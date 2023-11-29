import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilUsuarioPage } from './perfil-usuario.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('PerfilUsuarioPage', () => {
  let component: PerfilUsuarioPage;
  let fixture: ComponentFixture<PerfilUsuarioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    fixture = TestBed.createComponent(PerfilUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create', () => {
     expect(component).toBeTruthy();
   });
});
