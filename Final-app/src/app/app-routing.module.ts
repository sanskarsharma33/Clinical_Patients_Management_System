import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './auth.guard';
import { AddCaseComponent } from './add-case/add-case.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { SearchPatientsComponent } from './search-patients/search-patients.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { ViewCasesComponent } from './view-cases/view-cases.component';
import { ProfileComponent } from './profile/profile.component';
import { EditCaseComponent } from './edit-case/edit-case.component';

const routes: Routes = [
  { 
    path: '', 
    component: LandingComponent,
    // canActivate: [AuthGuard] 
  },
  { 
    path: 'login', 
    component: HomeComponent 
  },
  {
    path: 'newCase',
    component: AddCaseComponent
  },
  {
    path: 'followup',
    component: FollowUpComponent
  },
  {
    path: 'generateCertificate',
    component: GenerateCertificateComponent
  },
  {
    path: 'addpatient',
    component: AddPatientComponent
  },
  {
    path: 'search',
    component: SearchPatientsComponent
  },
  {
    path: 'updatePatient',
    component: UpdatePatientComponent
  },
  {
    path: 'viewcases',
    component: ViewCasesComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'editcase',
    component: EditCaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
