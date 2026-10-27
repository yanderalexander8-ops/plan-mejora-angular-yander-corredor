import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Valida que el valor sea un número entero mayor a 0
export const positiveInteger: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (value === null || value === undefined || value === '') {
    return null; // "required" se encarga de los vacíos
  }
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? null : { positiveInteger: true };
};

// Valida que un arreglo (select múltiple) tenga al menos "min" elementos
export function minSelected(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return Array.isArray(value) && value.length >= min ? null : { minSelected: { min } };
  };
}
