import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public subcriptionRequest: Subscription;
  constructor(private requets: RequestsService) { }

  CardsReporting = [
    {
      title: 'TPClient',
      desc: 'Send us every request you have.',
      link: 'https://tpreporting.teleperformance.co/tpcl/USER_Login.aspx'
    }
  ]

  ngOnInit(): void {
    //console.log(this.UserData)
  }

  ngOnDestroy() {
    if (this.subcriptionRequest) { this.subcriptionRequest.unsubscribe(); }
  }
}
