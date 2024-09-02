import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  // Save data to local storage
  saveData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get data from local storage
  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Remove data from local storage
  removeData(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all local storage
  clearData(): void {
    localStorage.clear();
  }
}
