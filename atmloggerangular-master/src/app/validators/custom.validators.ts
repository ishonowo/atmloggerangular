import { AbstractControl } from "@angular/forms";
import { RegionService } from "../shared/region.service";
import { SolValidationService } from "../shared/sol-validation.service";
import { catchError, map, Observable, of } from "rxjs";

export class CustomValidators{

    
    static noSpaceAllowed (control: AbstractControl){
        if(control.value != null && control.value.indexOf(' ') != -1 ){
            return {noSpaceAllowed: true}
        }
        return null;
    }

    static solID (control: AbstractControl){
        if(control.value != null && control.value.length!==3){
            return {solID: true}
0        }
        return null;
    }

    // Async validator using backend validation
    static verifySolID(solValidationService: SolValidationService) {
        return (control: AbstractControl): Observable<any> => {
            // If no value, return null Observable
            if (!control.value) {
                return of(null);
            }

            // Use the validation service to check SOL
            return solValidationService.validateSol(control.value).pipe(
                map(isValid => isValid ? null : { solFound: true }),
                catchError(() => of(null))
            );
        };
    }

    // Async validator using backend validation
    static verifyRegionID(regionValidationService: RegionService) {
        return (control: AbstractControl): Observable<any> => {
            // // If no value, return null Observable
               if (!control.value) {
                   return of(null);
               }
            
            // Use the validation service to check SOL
            return regionValidationService.validateRegion(control.value).pipe(
                map(isValid => isValid ? {regionFound:true} :null),
                catchError(() => of(null))
            );
        };
    }

}


