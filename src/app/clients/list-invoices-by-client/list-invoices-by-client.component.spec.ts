import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvoicesByClientComponent } from './list-invoices-by-client.component';

describe('ListInvoicesByClientComponent', () => {
  let component: ListInvoicesByClientComponent;
  let fixture: ComponentFixture<ListInvoicesByClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInvoicesByClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInvoicesByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
