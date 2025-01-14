import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchObject } from 'src/app/model/BranchObject';
import { BranchService } from 'src/app/shared/branch.service';

@Component({
  selector: 'app-display-branch-info',
  templateUrl: './display-branch-info.component.html',
  styleUrls: ['./display-branch-info.component.css']
})
export class DisplayBranchInfoComponent implements OnInit{

  public branchDisplayForm!: FormGroup;
  protected isClicked: boolean = false;
  public loading: boolean = true;
  public error: string = '';
  public branches: BranchObject[] = [];
  
  constructor( 
    private fb: FormBuilder,
    protected router: Router,
    private branchService: BranchService
  ){}

  ngOnInit(): void {
    this.loadBranchInfowNames();
  }

  loadBranchInfowNames(): void {
    this.loading = true;
    this.branchService.findAllBrancheswNames().subscribe({
      next: (data) => {
        this.branches = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading branches with region names.';
        this.loading = false;
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Finished with all branches with region names.');
      }
    });
  }

}
