import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginObject } from './login-object.model';
import { Observable } from 'rxjs';
import { Session } from '../../core/models/session.model';
/*Este servicio permite comunicarnos con el servidor para hacer login a través de una petición
 HTTP (Post) enviando un nombre de usuario y una contraseña. */

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  private basePath='api/authenticate/';

  login(loginObj:LoginObject): Observable<Session>{
    return this.http.post<Session>(this.basePath+'login',loginObj);
  }

  logout(): Observable<Boolean>{
    return this.http.post<Boolean>(this.basePath+'logout',{});
  }
}
