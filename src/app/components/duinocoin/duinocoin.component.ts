import { Component, OnInit, NgZone, ChangeDetectorRef} from '@angular/core';
import { DuinocoinService } from 'src/app/services/duinocoin.service';

@Component({
  selector: 'app-duinocoin',
  templateUrl: './duinocoin.component.html',
  styleUrls: ['./duinocoin.component.css']
})

export class DuinocoinComponent implements OnInit {
  socket = new WebSocket("wss://magi.duinocoin.com:14808");
  isConnectedToServer: string = "disconnected";

  constructor(    
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private duinocoinService: DuinocoinService) { }

  ngOnInit(): void {
    this.duinocoinService.connectToServer();
  }

  startMining(): void {
    this.duinocoinService.startMining();
  }
}

