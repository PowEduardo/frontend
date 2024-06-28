import { DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './page/home/home.component';
import { CurrencyFormatPipe } from './pipe/currency-format.pipe';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    HttpClientModule,
    AppRoutingModule,
    HomeComponent,
    CurrencyFormatPipe
  ],
  providers: [DecimalPipe],
  exports: [CurrencyFormatPipe]
})
export class AppModule { }