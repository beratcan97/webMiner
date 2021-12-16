import { Component, OnInit, NgZone, ChangeDetectorRef} from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

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
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.connectToServer();
  }

  connectToServer(): void {
    this.ngZone.runOutsideAngular(() => {
      this.socket.onopen = function(e) {
        // Connected
        DuinocoinComponent.prototype.setServerStatusTo("connected");
        console.log('connected to server');
      };
      
      this.socket.onmessage = function(event) {
        if(event.data === '2.7') {
          // Got server Version
          console.log('Server version: ' + event.data);
        } else if(event.data === 'GOOD\n') {
          // Share accepted
          console.log('GOOD');
          this.send('JOB,anderson123,LOW');
          //DuinocoinComponent.prototype.startMining();
        } else if(event.data === 'BAD,Incorrect result') {
          //FAILED 
          console.error('BAD,Incorrect result');
        } else if(event.data.split(",").length == 3) {
          // Gets the job
          console.log('Hash recived: ' + event.data);
          console.log('Worker started mining');

          let job = event.data.split(",");
          let difficulty: number =  Number(job[2]);
          
            let startingTime = performance.now();
            for (let result = 0; result < 100 * difficulty + 1; result++) {
              // @ts-ignore
              let SHA1 = new Hashes.SHA1();
              let ducos1 = SHA1.hex(job[0] + result);
              if (job[1] === ducos1) {
                  console.log('Miner found a result: ' + result);
                  let endingTime = performance.now();
                  let timeDifference = (endingTime - startingTime) / 1000;
                  let hashrate = (result / timeDifference).toFixed(2);
                  //this.sendResultToServer(result, hashrate);
                  this.send(result + "," + hashrate + ",WebMiner," + "rigid" + ",," + "wallet_id");         
                  console.log(result + "," + hashrate + ",WebMiner," + "rigid" + ",," + "wallet_id");         
                  return;
              }
            }
        } else {
          console.error("NOT HANLED ERROR");
        }
       };

      this.socket.onclose = function(e) {
        console.log('Socket closed');
      };

      this.socket.onerror = function(err) {
        console.error(err);
      };
  });
  }

  startMining(): void {
    console.log('Mining for worker anderson123 started!');
    this.socket.send('JOB,anderson123,LOW');
  }

  sendResultToServer(result: any, hashrate: any): void {
    this.ngZone.runOutsideAngular(() => {
    console.log('Sending this result to server: ', result + "," + hashrate + ",Official Web Miner 2.8," + "rigid" + ",," + "wallet_id");
    this.socket.send(result + "," + hashrate + ",Official Web Miner 2.8," + "rigid" + ",," + "wallet_id");         
    });   
  }

  setServerStatusTo(value: string) {
    console.log("runs");
    this.isConnectedToServer = value;
    console.log(this.isConnectedToServer);
    this.cdr.detectChanges();
  }
}

