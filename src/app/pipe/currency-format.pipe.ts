import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) { }

  transform(value: number): string {
    if (value == null) {
      return '';
    }

    let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt-BR');

    if (formattedValue) {
      formattedValue = `R$ ${formattedValue}`;
    }

    return formattedValue!;
  }

}
