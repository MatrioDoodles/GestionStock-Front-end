import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWarehousesComponent } from './list-warehouses.component';

describe('ListWarehousesComponent', () => {
  let component: ListWarehousesComponent;
  let fixture: ComponentFixture<ListWarehousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWarehousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
