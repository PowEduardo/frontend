import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './page/home/home.component';
import { CurrencyFormatPipe } from './pipe/currency-format.pipe';

@NgModule({
  imports: [
    HttpClientModule,
    AppRoutingModule,
    HomeComponent,
    CurrencyFormatPipe,
    NgbModule,
    BrowserModule,
    FormsModule
  ],
  providers: [DecimalPipe],
  exports: [CurrencyFormatPipe],
  declarations: []
})
export class AppModule { }