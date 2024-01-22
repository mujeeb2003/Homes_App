import { HousingLocationComponent } from './../housing-location/housing-location.component';
import { Component,inject } from '@angular/core';
import { Housinglocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent,CommonModule],
  template: `
  <section>
  <form>
  <!-- #filter is called as a reference variable name. can be used to refer to the value of this input box -->
  <input type="text" placeholder="Filter by City" #filter>
  <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
  </form>
  </section>
  <section class="results">
  <!-- this [housinglocation] is used for property binding -->
  
  <!-- <app-housing-location [housinglocation]="housinglocation"></app-housing-location>  -->
  
  <!-- for directive for sending housing locationlist in the app housing location -->
  
  <app-housing-location *ngFor="let housinglocation of filteredhousinglist"
  [housinglocation]= "housinglocation"></app-housing-location> 
  </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  
  // housinglocation: Housinglocation = 
  // {
  //     id: 0,
  //     name: 'Acme Fresh Start Housing',
  //     city: 'Chicago',
  //     state: 'IL',
  //     photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
  //     availableUnits: 4,
  //     wifi: true,
  //     laundry: true
  // }
  
  // getting data from the service we created. inject the service and then call the function
  housinglocationlist: Housinglocation[] = [];
  filteredhousinglist:Housinglocation[]=[];
  housingservice:HousingService=inject(HousingService);
  
  constructor(){
    // arrow function
    // used normally for static data
    // this.housinglocationlist=this.housingservice.getAllHousingLocationList();
    // this.filteredhousinglist=this.housinglocationlist;
    
    // used to call asynchronous function
    this.housingservice.getAllHousingLocationList().then((housinglocationlist:Housinglocation[])=>{
      this.housinglocationlist=housinglocationlist,
      this.filteredhousinglist=housinglocationlist
    });
    
  }
  
  filterResults(text:string){
    if(!text){
      this.filteredhousinglist=this.housinglocationlist;
      return;
    }
    this.filteredhousinglist=this.housinglocationlist.filter(
      housinglocation=>housinglocation?.city.toLowerCase().includes(text.toLowerCase())
      );
    }
  }
  