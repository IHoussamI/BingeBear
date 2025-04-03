import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private selectedPlan: any;

  setSelectedPlan(plan: any) {
    this.selectedPlan = plan;
  }

  getSelectedPlan() {
    return this.selectedPlan;
  }
  clearSelectedPlan(): void {
    this.selectedPlan = null;
    localStorage.removeItem('selectedPlan');
  }
}