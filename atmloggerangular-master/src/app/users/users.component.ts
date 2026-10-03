import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Role } from '../model/role';
import { UserService } from '../shared/user.service';
//import { UserObj } from '../model/userObj';
import { User } from '../model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  protected isClicked: boolean = false;

  // Full role list pulled from the atm_faultes table via the backend
  protected roles: Role[] = [];
  protected rolesLoading: boolean = true;
  protected roleError: string | null = null;
  protected faultsLoading: boolean = true;
  // Every role currently toggled on (multi-select, not just one)
  protected selectedRoles: Role[] = [];

  userForm!: FormGroup;
  user!: User;

  // Getter methods for form controls to simplify template syntax

/*  // Nested FormGroup for the User object within UserObj
  get userGroup(): FormGroup {
    return this.userForm.get('user') as FormGroup;
  } delete later */

  // Getter methods for the nested User object's fields
  get emailControl(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  // Getter methods for the nested User object's fields
  get fullNameControl(): FormControl {
    return this.userForm.get('fullName') as FormControl;
  }

  // Getter methods for the nested User object's fields
  get activeControl(): FormControl {
    return this.userForm.get('active') as FormControl;
  }

  // Getter methods for the nested User object's fields
  get ldapCnControl(): FormControl {
    return this.userForm.get('ldapCn') as FormControl;
  }

  constructor(
    private userService: UserService,
    private router: Router,
    protected authService: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loadRoles();
    this.initializeForm();
  }

  loadRoles() {
    this.rolesLoading = true;
    this.userService.getAllRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
        this.rolesLoading = false;
      },
      error: (err) => {
        this.roleError = 'Unable to load the list of roles. Please try again.';
        this.rolesLoading = false;
        console.error(err);
      },
    });
  }

  initializeForm() {
    this.userForm = this.fb.group({
        email: ['segun@shonowo.com', [Validators.required, Validators.email]],
        fullName: ['Oluwasegun Shonowo', Validators.required],
        active: [true, Validators.required],
        ldapCn: ['segun', Validators.required],
      });
  }

  isRoleSelected(role: Role): boolean {
    return this.selectedRoles.some((r) => r.id === role.id);
  }

  toggleRole(role: Role) {
    if (this.isRoleSelected(role)) {
      this.selectedRoles = this.selectedRoles.filter((r) => r.id !== role.id);
    } else {
      this.selectedRoles = [...this.selectedRoles, role];
    }
  }

  get canSubmit(): boolean {
    if (this.selectedRoles.length === 0) {
      return false;
    }
    return true;
  }

  async submitLoggedUser() {
    if (this.userForm.invalid || !this.canSubmit) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isClicked = true;

    const createdUser: User = {
        email: this.userForm.value.email,
        fullName: this.userForm.value.fullName,
        active: this.userForm.value.active,
        ldapCn: this.userForm.value.ldapCn,
        createdAt: new Date(),
      roles: this.selectedRoles,
    };

    console.log(createdUser);
    this.userService.postCreateUser(createdUser).subscribe({ 
      next: (response) => {
          console.log('New User info inserted successfully', response);
          // Reset form after successful submission
          this.userForm.reset();
        },
        error: (error) => {
          alert('Error inserting user '+ error);
          console.error('Error inserting user', error);
          // Handle error (show error message to user)
        },
        complete: async() => {
          console.log('Done with user insert.');
          this.loadRoles();
          this.initializeForm();
          await this.router.navigate(['/users']);
        },
    });
  }
}
