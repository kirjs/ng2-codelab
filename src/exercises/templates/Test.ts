import { TestBed } from '@angular/core/testing';
import { AppComponent } from './__SOLUTION__AppComponent';


beforeEach(()=>{
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ declarations: [AppComponent]});
});

describe('Blabla', ()=>{
  it(`Add a 'name' property to the app component.`, ()=>{
    let fixture = TestBed.createComponent(AppComponent);
    chai.expect(fixture.componentInstance).has.property('name');
  });

  it(`Use the new property in the template.`, ()=>{
    let fixture = TestBed.createComponent(AppComponent);
    (fixture.componentInstance as any).name = 'test';
  });
});

