import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-monero',
  templateUrl: './monero.component.html',
  styleUrls: ['./monero.component.css']
})
export class MoneroComponent implements OnInit {
  settingsForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.loadSettingsForMonerominerRocks();
  }

  loadSettingsForMonerominerRocks(): void {
     // @ts-ignore
     server = "wss://f.xmrminingproxy.com:8181";
     // @ts-ignore
    throttleMiner = 20;
  }

  startMining() {
    // @ts-ignore
    startMining(
      this.settingsForm.value.pool,
      this.settingsForm.value.walletAdress,
      this.settingsForm.value.workerId,
      this.settingsForm.value.threads,
      this.settingsForm.value.password
      );
  }

  createForm(): void {
    this.settingsForm = this.fb.group({
      pool: 'moneroocean.stream',
      walletAdress: '42k5nAcT9a14pmfpbxh4r11B6e7S1Aeyq3kLVefQzx2dK1LPV36T3LeEps4eV7dvKF7bSaji71TyebPaXaEeXyRa7tE4HTY',
      workerId: 'test',
      threads: -1,
      password: 'x',
    });
  }
}

/*
{"identifier":"handshake","pool":"moneroocean.stream","login":"838J7NdH2iBRYvNUZjgLubQhUQybZkicBGA7VCajyi8iMXmX3gZxtqYQH7zjtSjrWQRTn9dtwArG3ZnxPbUJsdtv51Yj6mf","password":"test","userid":"x","version":7}
{"identifier":"handshake","pool":"moneroocean.stream","password":"test","userid":"x","version":7}
*/