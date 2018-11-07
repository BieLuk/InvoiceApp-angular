import {Component, OnInit} from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;

  ngOnInit() {
  }

}
