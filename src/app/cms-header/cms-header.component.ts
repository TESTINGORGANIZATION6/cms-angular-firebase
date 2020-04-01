import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cms-header',
  templateUrl: './cms-header.component.html',
  styleUrls: ['./cms-header.component.scss']
})
export class CmsHeaderComponent implements OnInit {
  @Input() isclub: boolean;
  @Output() activetab = new EventEmitter();
  username = "swapnil";
  activeTab: any;

  constructor(private router: Router) { }


  ngOnInit() {
    var app = this.router.url.split('/')[1];
    if (app == 'dashboard') {
      this.activeTab = (localStorage.getItem('cmsActive-tab')) ? localStorage.getItem('cmsActive-tab') : 'players';
      this.activetab.emit(this.activeTab);
    } else {
      this.activeTab = 'users';
      this.activeTab = (localStorage.getItem('portfolioActive-tab')) ? localStorage.getItem('portfolioActive-tab') : 'users';
      this.activetab.emit(this.activeTab);
    }
    //   this.router.events.subscribe((res) => {
    //    this.ac
    // })
  }
  openMenu() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeMenu() {
    document.getElementById("mySidenav").style.width = "0px";
  }
  changeCms(cmsName) {
    if (cmsName == "Portfolio") {
      // this.portfolioActive=true;
      this.router.navigate(['portfolio']);
      localStorage.removeItem('cmsActive-tab');

    } else {
      //  this.portfolioActive=false;
      this.router.navigate(['dashboard']);
      localStorage.removeItem('portfolioActive-tab');

    }
    this.closeMenu()
  }

  loadTabs(tabname, app) {
    this.activeTab = tabname;
    if (app == 'cms') {
      localStorage.setItem('cmsActive-tab', tabname);
    } else {
      localStorage.setItem('portfolioActive-tab', tabname);
    }
    this.activetab.emit(this.activeTab);
  }
  logOut(){
    localStorage.clear();
    this.router.navigate([''])
  }
  
}
