import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { MainComponent } from './container/main/main.component';
import { ContainerComponent } from './container/container.component';
import { FooterComponent } from './container/footer/footer.component';
import { HeaderComponent } from './container/header/header.component';
import { ErrorInterceptor } from './services/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ContainerComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'CSRF-Token',
    }),
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
