import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'eshield-app';

  constructor(private _storageService: StorageService) {}

  ngOnInit(): void {
    this._storageService.fromCache().subscribe();
  }
}
