import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { ChartComponent } from './comps/chart/chart.component';
import { ListComponent } from './comps/list/list.component';
import { CoffeeComponent } from './comps/coffee/coffee.component';
import { NotFoundComponent } from './comps/not-found/not-found.component';

import { ListDataService } from './services/list-data.service';
import { GeoLocationService } from './services/geo-location.service';
import { GoogleNewsService } from './services/google-news.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule, MatToolbarModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';

import 'hammerjs';
import { FirebaseStorageComponent } from './comps/firebase-storage/firebase-storage.component';

// import { environment } from '../environments/environment.prod';

const appRoutes: Routes = [
  {path: '', component: ListComponent },
  {path: 'chart', component: ChartComponent},
  {path: 'coffee', component: CoffeeComponent},
  {path: 'coffee/:id', component: CoffeeComponent},
  // {path: '', redirectTo: 'list', pathMatch: 'full' },
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ListComponent,
    CoffeeComponent,
    NotFoundComponent,
    FirebaseStorageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes // { enableTracing: true } // <-- debugging purposes only
    ),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule, MatToolbarModule, MatProgressBarModule, MatSnackBarModule
  ],
  providers: [ListDataService, GeoLocationService, GoogleNewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
