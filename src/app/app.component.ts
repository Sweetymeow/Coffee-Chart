import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "Coffee Chart App";
  onShowMessageToInstallApp : any = (message, action) => {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  };

  constructor(private router: Router, private snackBar: MatSnackBar){}

  onTitleClick(){
    this.router.navigate(['/']);
  }

  ngOnInit(){
    console.log(navigator);
    if((navigator as any).standalone === false){
      // iOS Devices & in Browser
      this.onShowMessageToInstallApp("You can add this PWA to the Home Screen!", null);
    }else if((navigator as any).standalone === undefined){

      // it's not iOS Devices
      if(window.matchMedia('(display-mode: browser)').matches){
          console.log("WE are in Browser NOW!");
          // We are in the browser
          // this.onShowMessageToInstallApp(); // ERROR: ExpressionChangedAfterItHasBeenCheckedError
          window.addEventListener("beforeinstallprompt", event => {
            event.preventDefault();
            const sb = this.onShowMessageToInstallApp("Do you want to install this App?", "install");
            sb.onAction().subscribe( () => {
              console.log(event); // Prevents prompt display
              (event as any).prompt();
              (event as any).userChoice.then( result => {
                if(result.outcome == "dismissed"){
                  // TODO: Track no installation
                }else{
                  // TODO: It should show
              }
              });
            });
            return false;
          }); // beforeinstallprompt - eventListener
      }

    }
  }

  ngOnChanges(){
    console.log("ngOn Change!")
  }
}
