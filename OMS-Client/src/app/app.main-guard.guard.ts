import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { BusinessService } from './services/business.service';
import { map } from 'rxjs/operators';

@Injectable()
export class MainGuard implements CanActivate {
    constructor(private business: BusinessService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.business.Autorize(route.data.IdRole).pipe(map((response) => {

            if (!response) {

                this.router.navigate(["/login"], { queryParams: { retUrl: '/' + route.parent.url.toString() + '/' + route.url.toString() } });

                return false;

            } else {
                return true;
            }

        }));
    }
}