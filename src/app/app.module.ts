import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { CurrencyFormatPipe } from './pipe/currency-format.pipe';

@NgModule({
  imports: [
    HttpClientModule,
    AppRoutingModule,
    CurrencyFormatPipe,
    NgbModule,
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  exports: [],
  declarations: []
})
export class AppModule { }