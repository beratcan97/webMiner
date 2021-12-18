import { Component, OnInit, NgZone, ChangeDetectorRef} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DuinocoinService } from 'src/app/services/duinocoin.service';

@Component({
  selector: 'app-duinocoin',
  templateUrl: './duinocoin.component.html',
  styleUrls: ['./duinocoin.component.css']
})

export class DuinocoinComponent implements OnInit {
  isConnectedToServer: boolean = false;
  status: string = "Ready";

  constructor(
    private duinocoinService: DuinocoinService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.duinocoinService.connectToServer();
  }

  startMining(): void {
    this.duinocoinService.startMining();
  }

  updateServerStatus(status: string): void {
      if(status === 'Connected to server') {
        this.isConnectedToServer = true;
      } else {
        this.isConnectedToServer = false;
      }

  }
}

