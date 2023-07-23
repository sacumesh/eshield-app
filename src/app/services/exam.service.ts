import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private _apiService: ApiService) {}

  getCourses() {
    return this._apiService.get<any>('/');
  }
}
