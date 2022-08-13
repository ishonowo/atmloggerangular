import { Component, OnInit } from '@angular/core';
import { AtmService } from '../shared/atm.service';
import { IssueLogged } from '../model/issuelogged';
import { AtmIssue } from '../model/atmissue';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-issue-logged',
  templateUrl: './issue-logged.component.html',
  styleUrls: ['./issue-logged.component.css']
})
export class IssueLoggedComponent implements OnInit {
  model:IssueLogged={
    userEmail:'',
    terminalId:'1070',
    issueDesc:'',
	  branchLogger:'',
	  loggerEmail:'@fidelitybank.ng',
	  loggerPhoneNo:'08'
  };

  atmIssue: AtmIssue;
  private isClicked = false;
  username: string;
  //private userEmail: string;
  

  constructor(private atmService:AtmService,
              private router: Router, private aRoute: ActivatedRoute) { }

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
    this.entryMethod();
  }

  entryMethod() {
    this.aRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.get('username')) {
        return this.router.navigate(['login'])
      }
      this.username = paramMap.get('username');
    })
  }

   submitLoggedIssue() {
    this.isClicked=true;
    console.log(this.aRoute.snapshot.params['username']);
    this.model.userEmail=this.aRoute.snapshot.params['username']+'@fidelitybank.ng';
    // //this.model.userEmail=this.userEmail;
    this.atmService.postIssueLogged(this.model).subscribe(
      async res=>{
        //alert("The issue has been successfully logged.");
        this.atmIssue = res;
        this.atmService.atmIssue = this.atmIssue;
        console.log(this.atmIssue);
        await this.router.navigate(['email']);
      },
      err=>{
        this.isClicked=false;
        alert("An error has occurred while logging the issue.")
      }
    );
    
  }

}


