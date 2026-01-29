import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { ArticuloPlistAdminRouted } from './component/articulo/plist-admin-routed/articulo-plist';
import { PlistEquipo } from './component/shared/equipo/equipo-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'articulo', component: ArticuloPlistAdminRouted},
    { path: 'articulo?:id_tipoarticulo', component: ArticuloPlistAdminRouted}, //pte
    { path: 'equipo', component: PlistEquipo },
];
