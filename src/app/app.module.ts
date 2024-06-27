import { DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CurrencyFormatPipe } from './pipe/currency-format.pipe';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [DecimalPipe],
  exports: [CurrencyFormatPipe],
  declarations: [CurrencyFormatPipe]
})
export class AppModule { }