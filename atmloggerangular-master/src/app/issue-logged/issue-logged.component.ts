import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AtmService } from '../shared/atm.service';
import { IssueLogged } from '../model/issuelogged';
import { AtmIssue } from '../model/atmissue';
import { Router, ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-issue-logged',
  templateUrl: './issue-logged.component.html',
  styleUrls: ['./issue-logged.component.css'],
})
export class IssueLoggedComponent implements OnInit {
  atmIssue!: AtmIssue;
  protected isClicked: boolean = false;
  protected sName: string|undefined = this.msalService.instance.getActiveAccount()?.username;
  
  issueForm!: FormGroup;
  
  // Getter methods for form controls to simplify template syntax
  get terminalIdControl() { return this.issueForm.get('terminalId') as FormControl; }
  get issueDescControl() { return this.issueForm.get('issueDesc') as FormControl; }
  get branchLoggerControl() { return this.issueForm.get('branchLogger') as FormControl; }
  get loggerEmailControl() { return this.issueForm.get('loggerEmail') as FormControl; }
  get loggerPhoneNoControl() { return this.issueForm.get('loggerPhoneNo') as FormControl; }

  constructor(
    private atmService: AtmService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private msalService: MsalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }
  
  initializeForm() {
    this.issueForm = this.fb.group({
      terminalId: ['10701264', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(8)
      ]],
      issueDesc: ['The ATM has a cash jam.', [
        Validators.required, 
        Validators.minLength(10)
      ]],
      branchLogger: ['Ahmed Atere', [
        Validators.required
      ]],
      loggerEmail: ['aa@fidelitybank.ng', [
        Validators.required, 
        Validators.email
      ]],
      loggerPhoneNo: ['08012345678', [
        Validators.required, 
        Validators.minLength(11), 
        Validators.maxLength(14)
      ]]
    });
  }

  submitLoggedIssue() {
    if (this.issueForm.invalid) {
      return;
    }
    
    this.isClicked = true;
    
    // Create an IssueLogged object from form values
    const issueLogged: IssueLogged = {
      userEmail: this.sName as string,
      terminalId: this.issueForm.value.terminalId,
      issueDesc: this.issueForm.value.issueDesc,
      branchLogger: this.issueForm.value.branchLogger,
      loggerEmail: this.issueForm.value.loggerEmail,
      loggerPhoneNo: this.issueForm.value.loggerPhoneNo
    };
    
    console.log(issueLogged);
    
    this.atmService.postIssueLogged(issueLogged).subscribe({
      next: async (data) => {
        alert('The issue has been successfully logged.');
        this.atmIssue = data;
        this.atmService.atmIssue = this.atmIssue;
        console.log(this.atmIssue);
        await this.router.navigate(['email']);
      },
      error: (err) => {
        this.isClicked = false;
        alert('An error has occurred while logging the issue.');
        console.error(err);
      }
    });
  }
}