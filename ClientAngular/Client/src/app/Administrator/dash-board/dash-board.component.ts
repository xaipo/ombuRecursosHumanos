import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    document.getElementById("mySidenav").style.width = "200px";
  }
  public  openNav() {
    document.getElementById("mySidenav").style.width = "200px";
  }

  public  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
}
