import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AtmService } from '../shared/atm.service';
import { IssueLogged } from '../model/issuelogged';
import { AtmIssue } from '../model/atmissue';
import { AtmFault } from '../model/atmfault';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-issue-logged',
  templateUrl: './issue-logged.component.html',
  styleUrls: ['./issue-logged.component.css'],
})
export class IssueLoggedComponent implements OnInit {
  atmIssue!: AtmIssue;
  protected isClicked: boolean = false;
  protected sName: string | undefined;

  // Full fault list pulled from the atm_faultes table via the backend
  protected atmFaults: AtmFault[] = [];
  protected faultsLoading: boolean = true;
  protected faultsError: string | null = null;

  // Every fault currently toggled on (multi-select, not just one)
  protected selectedFaults: AtmFault[] = [];

  // The free-text entered for "Others" - only meaningful/sent when Others
  // is one of the selected faults (or the only one selected).
  protected otherFaultText: string = '';

  // True whenever "Others" is among the currently selected faults
  protected get isOthersSelected(): boolean {
    return this.selectedFaults.some(f => f.natureOfFault === 'Others');
  }

  issueForm!: FormGroup;

  // Getter methods for form controls to simplify template syntax
  get terminalIdControl() { return this.issueForm.get('terminalId') as FormControl; }
  get branchLoggerControl() { return this.issueForm.get('branchLogger') as FormControl; }
  get loggerEmailControl() { return this.issueForm.get('loggerEmail') as FormControl; }
  get loggerPhoneNoControl() { return this.issueForm.get('loggerPhoneNo') as FormControl; }
  get otherDescControl() { return this.issueForm.get('otherDesc') as FormControl; }

  constructor(
    private atmService: AtmService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadAtmFaults();
    this.initializeForm();
    this.sName = this.authService.getEmail() ?? undefined;
  }

  initializeForm() {
    this.issueForm = this.fb.group({
      terminalId: ['10700166', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8)
      ]],
      branchLogger: ['John Uguru-Okorie', [
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
      ]],
      // Only enabled/required when "Others" is among the selected faults
      otherDesc: [{ value: '', disabled: true }, [
        Validators.minLength(10)
      ]]
    });
  }

  loadAtmFaults() {
    this.faultsLoading = true;
    this.atmService.getAtmFaults().subscribe({
      next: (faults) => {
        this.atmFaults = faults;
        this.faultsLoading = false;
      },
      error: (err) => {
        this.faultsError = 'Unable to load the list of faults. Please try again.';
        this.faultsLoading = false;
        console.error(err);
      }
    });
  }

  isFaultSelected(fault: AtmFault): boolean {
    return this.selectedFaults.some(f => f.id === fault.id);
  }

  // Toggles a fault button on/off - lets the user pick several faults.
  // When "Others" becomes selected/deselected, the free-text box is
  // enabled/required or disabled/cleared accordingly.
  toggleFault(fault: AtmFault) {
    if (this.isFaultSelected(fault)) {
      this.selectedFaults = this.selectedFaults.filter(f => f.id !== fault.id);
    } else {
      this.selectedFaults = [...this.selectedFaults, fault];
    }

    if (this.isOthersSelected) {
      this.otherDescControl.enable();
      this.otherDescControl.setValidators([Validators.required, Validators.minLength(10)]);
    } else {
      this.otherDescControl.disable();
      this.otherDescControl.clearValidators();
      this.otherDescControl.setValue('');
      this.otherFaultText = '';
    }
    this.otherDescControl.updateValueAndValidity();
  }

  get canSubmit(): boolean {
    if (this.selectedFaults.length === 0) return false;
    if (this.isOthersSelected) return this.otherDescControl.valid;
    return true;
  }

  submitLoggedIssue() {
    if (this.issueForm.invalid || !this.canSubmit) {
      this.issueForm.markAllAsTouched();
      return;
    }

    this.isClicked = true;

    // Save the textbox value into its own variable, then only attach it to
    // the payload if "Others" was actually chosen. If Others was not
    // selected, otherFaultDesc is left out of the object entirely.
    this.otherFaultText = this.isOthersSelected ? this.otherDescControl.value : '';

    const issueLogged: IssueLogged = {
      userEmail: this.sName as string,
      terminalId: this.issueForm.value.terminalId,
      branchLogger: this.issueForm.value.branchLogger,
      loggerEmail: this.issueForm.value.loggerEmail,
      loggerPhoneNo: this.issueForm.value.loggerPhoneNo,
      atmFaultIds: this.selectedFaults.map(f => f.id)
    };

    if (this.isOthersSelected) {
      issueLogged.otherFaultDesc = this.otherFaultText;
    }

    console.log(issueLogged);

    this.atmService.postIssueLogged(issueLogged).subscribe({
      next: async (data) => {
        console.log('The issue has been successfully logged.');
        this.atmIssue = data;
        this.atmService.atmIssue = this.atmIssue;
        console.log(this.atmIssue);
        await this.router.navigate(['email']);
      },
      error: (err) => {
        this.isClicked = false;
        alert('An error has occurred while logging the issue. ' + err);
        console.error(err);
      }
    });
  }
}