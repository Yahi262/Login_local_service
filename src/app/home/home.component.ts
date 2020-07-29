import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user.model';
import { StorageService } from '../core/services/storage.service';
import { AuthenticationService } from '../login/shared/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user:User;

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService) 
  {}

  ngOnInit() {
    this.user=this.storageService.getCurrentUser();
  }
  public logout():void{
    this.authenticationService.logout().subscribe(
      response=>{if(response){this.storageService.logout()}}
    );
  }

}
