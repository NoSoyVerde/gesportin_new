import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { SessionService } from "../service/session";

@Injectable({
    providedIn: 'root'
})
export class ClubAdminGuard implements CanActivate {

    constructor(private oSessionService: SessionService,
        private oRouter: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        if (!this.oSessionService.isSessionActive()) {
            return of(this.oRouter.createUrlTree(['/login']));
        }

        // Only team/club admins allowed
        if (this.oSessionService.isClubAdmin()) {
            return of(true);
        }

        // Full admins → redirect to admin club list
        if (this.oSessionService.isAdmin()) {
            return of(this.oRouter.createUrlTree(['/club']));
        }

        return of(this.oRouter.createUrlTree(['/login']));
    }

}
