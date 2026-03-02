import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PayloadSanitizerService {
  sanitize(
    payload: any,
    config?: {
      booleanFields?: string[];
      nestedIdFields?: string[];
      idFieldMap?: { [nestedField: string]: string };
    },
  ): any {
    const copy: any = { ...payload };

    if (config?.booleanFields) {
      config.booleanFields.forEach((field) => {
        if (copy[field] === 1 || copy[field] === 0) {
          copy[field] = copy[field] === 1;
        } else {
          copy[field] = !!copy[field];
        }
      });
    }

    if (config?.nestedIdFields) {
      config.nestedIdFields.forEach((field) => {
        if (copy[field] && typeof copy[field] === 'object') {
          copy[field] = { id: Number(copy[field].id) };
        } else {
          const idKey = `id_${field}`;
          if (copy[idKey] !== undefined) {
            copy[field] = { id: Number(copy[idKey]) };
            delete copy[idKey];
          }
        }
      });
    }

    if (config?.idFieldMap) {
      Object.keys(config.idFieldMap).forEach((nestedField) => {
        const idKey = config.idFieldMap![nestedField];
        if (copy[nestedField] && typeof copy[nestedField] === 'object') {
          copy[nestedField] = { id: Number(copy[nestedField].id) };
        } else if (copy[idKey] !== undefined) {
          copy[nestedField] = { id: Number(copy[idKey]) };
          delete copy[idKey];
        }
      });
    }

    return copy;
  }
}
