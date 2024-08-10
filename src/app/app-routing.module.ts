import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadItemComponent } from './upload-item/upload-item.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newItem', component: UploadItemComponent },
  // { path: 'upload', component: UploadComponent },
  // { path: 'eventTheme', component: EventComponent },
  // { path: 'detailedTheme', component: DetailedEventComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
