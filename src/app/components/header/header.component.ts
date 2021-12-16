import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(    
    private ngZone: NgZone) { }

  ngOnInit(): void {
    /*
    this.ngZone.runOutsideAngular(() => {
      // @ts-ignore
      $(function () {
        // @ts-ignore
        $(window).on('scroll', function () {
          // @ts-ignore
          if ( $(window).scrollTop() > 10 ) {
            // @ts-ignore
           $('.navbar').addClass('active');
          } else {
            // @ts-ignore
            $('.navbar').removeClass('active');
          }
        });
      });
    });
    */
  }
}

