import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DuinocoinService } from 'src/app/services/duinocoin.service';

@Component({
  selector: 'app-duinocoin',
  templateUrl: './duinocoin.component.html',
  styleUrls: ['./duinocoin.component.css']
})

export class DuinocoinComponent implements OnInit {
  // Mining
  ngUnsubscribe = new Subject();
  status$: Observable<string>;
  log$: Observable<any>;
  acceptedShares$: Observable<any>;
  badShares$: Observable<any>;
  hashrate$: Observable<any>;

  // Settings
  isSettingGui: boolean = true;
  settingsForm: FormGroup = this.fb.group({});

  constructor(
    private duinocoinService: DuinocoinService,
    private fb: FormBuilder) {
    this.status$ = this.duinocoinService.tmp$.pipe(takeUntil(this.ngUnsubscribe));
    this.log$ = this.duinocoinService.log$.pipe(takeUntil(this.ngUnsubscribe));
    this.acceptedShares$ = this.duinocoinService.acceptedShares$.pipe(takeUntil(this.ngUnsubscribe));
    this.badShares$ = this.duinocoinService.badShares$.pipe(takeUntil(this.ngUnsubscribe));
    this.hashrate$ = this.duinocoinService.hashrate$.pipe(takeUntil(this.ngUnsubscribe));
    }

  ngOnInit(): void {
    this.createForm();
    this.duinocoinService.connectToServerObs().subscribe();
  }

  startMining(): void {
    this.isSettingGui = false;
    this.duinocoinService.startMining(this.settingsForm.value);
  }

  createForm(): void {
    this.settingsForm = this.fb.group({
      username: 'anderson123',
      rigName: 'Webminer',
    });
  }
}

