import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl:'./container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  constructor() {}
  menu: any = [];
  ngOnInit() {
    //this.menu = this.menus.genMenu();
  }
}

