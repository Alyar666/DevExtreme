import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxLightGridModule } from 'devextreme/renovation/ui/light_grid/light_grid';

let s = 123456789;
const random = function() {
  s = (1103515245 * s + 12345) % 2147483647;
  return s % (10 - 1);
};

const generateData = function(count) {
    var i;
    var surnames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Harris', 'Clark', 'Allen', 'Scott', 'Carter'];
    var names = ['James', 'John', 'Robert', 'Christopher', 'George', 'Mary', 'Nancy', 'Sandra', 'Michelle', 'Betty'];
    var gender = ['Male', 'Female'];
    var items = [];
  
    for (i = 0; i < count; i++) {
  
      var nameIndex = random();
      var item = {
        id: i + 1,
        firstName: names[nameIndex],
        lastName: surnames[random()],
        gender: gender[Math.floor(nameIndex / 5)]
      };
      items.push(item);
    }
    return items;
  };

@Component({
    providers: [],
    selector: 'demo-app',
    styleUrls: [],
    templateUrl: './app/app.component.html',
})
export class AppComponent {
    columns: any;
    dataSource: any;

    constructor() {
        this.columns = ['id', 'firstName', 'lastName', 'gender', 'id', 'firstName', 'lastName', 'gender', 'id', 'firstName', 'lastName', 'gender'];
        this.dataSource = generateData(100000);
    }
}
@NgModule({
    imports: [
        BrowserModule,
        DxLightGridModule,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
