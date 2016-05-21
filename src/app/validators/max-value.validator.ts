import {Control} from '@angular/common';

export class MaxValueValidator {
  public static validate(maxValue) {
    return (c: Control) => {
          return c.value <= maxValue ? null : {
              maxValue: {
                  value: false
              }
          };
    };
  }
}
