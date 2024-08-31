import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgClass],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent {
  isMenuHidden = true;

  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }
}
