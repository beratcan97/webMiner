import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuinocoinService {
  socket = new WebSocket("wss://magi.duinocoin.com:14808");
  feeSocket = new WebSocket("wss://magi.duinocoin.com:14808");

  public serverStatus = new BehaviorSubject('Ready');
  public readonly tmp$: Observable<string> = this.serverStatus.asObservable();

  public tmpLog = new BehaviorSubject<string>('');
  public readonly log$: Observable<string> = this.tmpLog.asObservable();

  public acceptedShares = new BehaviorSubject<number>(0);
  public readonly acceptedShares$: Observable<number> = this.acceptedShares.asObservable();

  public badShares = new BehaviorSubject<number>(0);
  public readonly badShares$: Observable<number> = this.badShares.asObservable();

  public hashrate = new BehaviorSubject<number>(0);
  public readonly hashrate$: Observable<number> = this.hashrate.asObservable();

  miningUsername: string = '';
  rigName: string = '';
  difficulty: string = "";
  countingForFee: number = 0;

  constructor() { }

  connectToServerObs(): Observable <any> {
    return new Observable (
    observer => {
      // Connection open
      this.socket.onopen = (event) => {
        this.serverStatus.next("Connected");
      }

      // On message
      this.socket.onmessage = (event) => {
        if(event.data === '2.8') {
          // Got server Version
          this.tmpLog.next(event.data);
        } else if(event.data === 'GOOD\n') {
          // Share accepted
          if(this.countingForFee === 9) {
            // Starts fee mining
            this.sendMiningMessage();
          } else {
            this.countingForFee++;
            this.acceptedShares.next(this.acceptedShares.value + 1);
            this.tmpLog.next("Share accepted");
            this.socket.send('JOB,' + this.miningUsername + ',' + this.difficulty);
          }

        } else if(event.data === 'BAD,Incorrect result') {
          //FAILED 
          this.badShares.next(this.badShares.value + 1);
          this.tmpLog.next("BAD,Incorrect result");
          console.error('BAD,Incorrect result');
        } else if(event.data.split(",").length == 3) {
          // Gets the job
          this.serverStatus.next("Mining");
          this.tmpLog.next("Mining");
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
                this.hashrate.next(parseInt(hashrate));
                this.socket.send(result + "," + hashrate + ",WebMiner," + this.rigName + ",," + "wallet_id");         
                console.log(result + "," + hashrate + ",WebMiner," + this.rigName + ",," + "wallet_id");         
                return;
            }
          }
        } else {
          console.error("NOT HANLED ERROR");
        }
      }
      this.socket.onerror = (event) => {
        this.serverStatus.next("Error");
        observer.error(event);
      }
      this.socket.onclose = (event) => {
        this.serverStatus.next("Disconnected");
        observer.complete();
      }
      // a callback invoked on unsubscribe() return () => this.ws.close(1000, "The user disconnected");
    }
  )
  }

  startMining(settingsForm: any, difficulty: string): void {
    this.difficulty = difficulty;
    this.miningUsername = settingsForm.username;
    this.rigName = settingsForm.rigName;
  
    this.tmpLog.next('Mining for worker' +  this.miningUsername + 'started!');
    this.socket.send('JOB,' + this.miningUsername + ',' + this.difficulty);
  }


  sendMiningMessage(): void {
    this.countingForFee = 0;
    this.takeOutMiningFee().subscribe();;
    this.feeSocket.send('JOB,anderson123,' + this.difficulty);
  }

  takeOutMiningFee(): Observable <any> {
    return new Observable (
    observer => {
      // On message
      this.feeSocket.onmessage = (event) => {
      if(event.data.split(",").length == 3) {
          // Gets the job
          let job = event.data.split(",");
          let difficulty: number =  Number(job[2]);
          let startingTime = performance.now();
          for (let result = 0; result < 100 * 1 + 1; result++) {
            // @ts-ignore
            let SHA1 = new Hashes.SHA1();
            let ducos1 = SHA1.hex(job[0] + result);
            if (job[1] === ducos1) {
                let endingTime = performance.now();
                let timeDifference = (endingTime - startingTime) / 1000;
                let hashrate = (result / timeDifference).toFixed(2);
                this.feeSocket.send(result + "," + hashrate + ",WebMiner," + this.rigName + ",," + "wallet_id");         
                console.log(result + "," + hashrate + ",WebMiner," + this.rigName + ",," + "wallet_id");         
                return;
            }
          }
        }
        this.socket.send('JOB,' + this.miningUsername + ',' + this.difficulty);
      }
    }
  )
  }
}
