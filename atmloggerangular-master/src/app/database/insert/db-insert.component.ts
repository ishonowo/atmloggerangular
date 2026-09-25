import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { CustomValidators } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-db-insert',
  templateUrl: './db-insert.component.html',
  styleUrls: ['./db-insert.component.css']
})
export class DbInsertComponent {
  constructor(protected authService: AuthService){}
}
