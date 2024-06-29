import { DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './page/home/home.component';
import { CurrencyFormatPipe } from './pipe/currency-format.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddReturnComponent } from './modal/add-return/add-return.component';

registerLocaleData(localePt, 'pt-BR');

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
  declarations: [AddReturnComponent]
})
export class AppModule { }