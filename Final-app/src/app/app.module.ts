import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, ɵHttpInterceptingHandler} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AddCaseComponent } from './add-case/add-case.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientsService } from './patients.service';
import { SearchPatientsComponent } from './search-patients/search-patients.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { DataSharingService } from './data-sharing.service';
import { ViewCasesComponent } from './view-cases/view-cases.component';
import { ProfileComponent } from './profile/profile.component';
import { EditCaseComponent } from './edit-case/edit-case.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LandingComponent,
    AddCaseComponent,
    FollowUpComponent,
    GenerateCertificateComponent,
    AddPatientComponent,
    SearchPatientsComponent,
    UpdatePatientComponent,
    ViewCasesComponent,
    ProfileComponent,
    EditCaseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  providers: [AuthService, MDBSpinningPreloader, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, PatientsService, DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
