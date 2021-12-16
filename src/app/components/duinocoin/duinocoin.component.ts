import { Component, OnInit, NgZone, ChangeDetectorRef} from '@angular/core';
import { DuinocoinService } from 'src/app/services/duinocoin.service';

@Component({
  selector: 'app-duinocoin',
  templateUrl: './duinocoin.component.html',
  styleUrls: ['./duinocoin.component.css']
})

export class DuinocoinComponent implements OnInit {
  isConnectedToServer: string = "ready";

  constructor(
    private duinocoinService: DuinocoinService) { }

  ngOnInit(): void {
    this.duinocoinService.connectToServer();
  }

  startMining(): void {
    this.duinocoinService.startMining();
  }
}

