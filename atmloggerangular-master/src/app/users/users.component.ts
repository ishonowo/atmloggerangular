import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent{
  constructor(protected authService:AuthService){
}
}