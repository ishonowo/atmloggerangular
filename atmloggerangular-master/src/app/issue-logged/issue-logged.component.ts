import { Component, OnInit } from '@angular/core';
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
  model: IssueLogged = {
    username: '',
    terminalId: '10702343',
    issueDesc: 'The ATM has a cash jam.',
    branchLogger: 'Ahmed Atere',
    loggerEmail: 'aa@fidelitybank.ng',
    loggerPhoneNo: '08012345678',
  };

  atmIssue!: AtmIssue;
  protected isClicked: boolean = false;
  //username!: any;
  /*private userEmail!: string;*/

  constructor(
    private atmService: AtmService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private msalService: MsalService
  ) {}

  ngOnInit() {
    //console.log(this.aRoute.snapshot.params['username']);
    //this.model.userEmail=this.aRoute.snapshot.params['username']+'@fidelitybank.ng';
    /*this.aRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('username')) {
        this.router.navigate(['/login']);
        return;
      }
      this.model.userEmail = paramMap.get('username')+'@fidelitybank.ng';
    });*/
    //this.entryMethod();
  }

  submitLoggedIssue() {
    this.isClicked = true;
    let sName = this.msalService.instance.getActiveAccount()?.username;
    if (sName) {
      this.model.username = sName;
    } else {
      this.model.username = 'ATMSupport';
    }
    this.atmService.postIssueLogged(this.model).subscribe(
      {
        next: async (res) => {
          alert('The issue has been successfully logged.');
          this.atmIssue = res;
          this.atmService.atmIssue = this.atmIssue;
          //console.log(this.atmIssue);
          await this.router.navigate(['email']);
        },
        error: (err) => {
          this.isClicked = false;
          alert('An error has occurred while logging the issue.');
          console.log(err);
        }//,
        //complete: () => this.router.navigate(['email']),
      }
      /*async (res) => {
        alert('The issue has been successfully logged.');
        this.atmIssue = res;
        this.atmService.atmIssue = this.atmIssue;
        console.log(this.atmIssue);
        await this.router.navigate(['email']);
      },
      (err) => {
        this.isClicked = false;
        alert('An error has occurred while logging the issue.');
      }*/
    );
  }
}
