import { Component, OnInit } from '@angular/core';
import { BranchWithName } from 'src/app/model/branchWithName';
import { BranchService } from 'src/app/shared/branch.service';

@Component({
  selector: 'app-up-display-branch',
  templateUrl: './up-display-branch.component.html',
  styleUrls: ['./up-display-branch.component.css']
})
export class UpDisplayBranchComponent implements OnInit {
  
  branches: BranchWithName[] = [];
  loading: boolean = true;
  error: string = '';
  selectedBranch: BranchWithName | null = null;

  constructor(
    private branchService: BranchService
  ) {}

  ngOnInit(){
    this.loadBranchesWithNames();
  }


  loadBranchesWithNames(): void {
    this.loading = true;
    this.branchService.findAllBranchesWithNames().subscribe({
      next: (data) => {
        this.branches = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading terminals with names';
        this.loading = false;
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Finished with all branches with names.');
      },
    });
  }

  onSelect(branch: BranchWithName): void {
    this.selectedBranch = branch;
  }

  onUpdateComplete(): void {
    this.loadBranchesWithNames();
    this.selectedBranch = null; // Close the form
    console.log('Update complete and terminals refreshed');
  }
} 
