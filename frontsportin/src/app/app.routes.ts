import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { ArticuloPlistAdminRouted } from './component/articulo/plist-admin-routed/articulo-plist';
import { LigaPlistAdminRouted } from './component/liga/plist-admin-routed/liga-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'liga', component: LigaPlistAdminRouted },
    { path: 'liga/:equipo', component: LigaPlistAdminRouted },
    { path: 'articulo', component: ArticuloPlistAdminRouted },
    { path: 'articulo/:tipoarticulo', component: ArticuloPlistAdminRouted }
];
