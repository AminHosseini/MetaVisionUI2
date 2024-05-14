import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class GuardsHelperService {
  constructor(private alertService: AlertService) {}

  async canDeactivateAsync(form: FormGroup): Promise<boolean> {
    let allowNavigatation: boolean = true;
    if (form.touched) {
      const result = await this.alertService.exitAlertAsync();

      if (result.isConfirmed) {
        allowNavigatation = true;
      } else {
        allowNavigatation = false;
      }
    }
    return allowNavigatation;
  }
}
