import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user.model';
import { USERS } from '../mocks/mock-users';

/*se crea esto debido a que necesitamos un login sin backend que lo respalde, como sabes la función login 
nos devuelve un token y el usuario en el body que coincidirá con los parámetros que reciba. 
Si los parámetros no son correctos devolverá un error y el logout simplemente nos devuelve un true. */

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //LocalStorage del arrreglo de usuarios registrados
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        //simula llamada al servidor
        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith('/api/authenticate/login') && request.method === 'POST') {
                let params = request = request.body;
                let found: User = USERS.find((user: User) => { return (params.email === user.email); });
                if (found) {
                    if (params.password === found.password) {
                        return of(new HttpResponse({ status: 200, body: { token: 'fake token', user: found } }));
                    } else {
                        return throwError({ code: 2, message: 'La contraseña es Incorrecta, favor de rectificar' });
                    }
                } else {
                    return throwError({ code: 1, message: 'Usuario no existe, Favor de revisar el nombre de Usuario' });
                }
            }
            if(request.url.endsWith('/api/authenticate/logout')&&request.method==='POST'){
                return of(new HttpResponse({status: 200, body:true}));
            }
            //vuelve a pasar por cualquier solicitud no manejada arriba
            return next.handle(request);
        }))
        //utiliza los materiales de angular para no tener un retraso pese a que tenga un error
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}
export let fakeBackendProvinder={
    //usa un backend falso en lugar del servicio http para un desarrollo sin backend
    provide:HTTP_INTERCEPTORS,
    useClass:FakeBackendInterceptor,
    multi:true
};