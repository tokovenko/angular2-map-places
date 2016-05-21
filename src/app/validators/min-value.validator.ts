import {Control} from '@angular/common';

export class MinValueValidator {
  public static validate(minValue) {
    return (c: Control) => {
          return c.value >= minValue ? null : {
              minValue: {
                  value: false
              }
          };
    };
  }
}
