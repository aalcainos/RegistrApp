import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redireccionLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redireccionLogin},
    path: 'vis-asis',
    loadChildren: () => import('./pages/vis-asis/vis-asis.module').then( m => m.VisAsisPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redireccionLogin},
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path:'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redireccionLogin},
    path: 'confirmar-qr',
    loadChildren: () => import('./modals/confirmar-qr/confirmar-qr.module').then( m => m.ConfirmarQrPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redireccionLogin},
    path: 'detalle-asis/:idAsis',
    loadChildren: () => import('./pages/detalle-asis/detalle-asis.module').then( m => m.DetalleAsisPageModule)
  },
  {  
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe: redireccionLogin},
    path: 'perfil-usuario',
    loadChildren: () => import('./pages/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
