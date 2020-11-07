import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdersByClientComponent } from './list-orders-by-client.component';

describe('ListOrdersByClientComponent', () => {
  let component: ListOrdersByClientComponent;
  let fixture: ComponentFixture<ListOrdersByClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrdersByClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdersByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
