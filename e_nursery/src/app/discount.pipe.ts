import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {
  transform(mrp: number, discountPercentage: number): number {
    const discountAmount = (discountPercentage / 100) * mrp;
    const discountedPrice = mrp - discountAmount;
    return discountedPrice;
  }
}
