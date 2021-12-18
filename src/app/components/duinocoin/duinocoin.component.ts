import { Component, OnInit, NgZone, ChangeDetectorRef} from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DuinocoinService } from 'src/app/services/duinocoin.service';

@Component({
  selector: 'app-duinocoin',
  templateUrl: './duinocoin.component.html',
  styleUrls: ['./duinocoin.component.css']
})

export class DuinocoinComponent implements OnInit {
  ngUnsubscribe = new Subject();
  status$: Observable<string>;
  log$: Observable<any>;
  acceptedShares$: Observable<any>;
  badShares$: Observable<any>;

  constructor(
    private duinocoinService: DuinocoinService,
    private ngZone: NgZone) {
    this.status$ = this.duinocoinService.tmp$.pipe(takeUntil(this.ngUnsubscribe));
    this.log$ = this.duinocoinService.log$.pipe(takeUntil(this.ngUnsubscribe));
    this.acceptedShares$ = this.duinocoinService.acceptedShares$.pipe(takeUntil(this.ngUnsubscribe));
    this.badShares$ = this.duinocoinService.badShares$.pipe(takeUntil(this.ngUnsubscribe));
    }

  ngOnInit(): void {
    this.duinocoinService.connectToServerObs().subscribe();
  }

  startMining(): void {
    this.duinocoinService.startMining();
  }
}

