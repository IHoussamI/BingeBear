import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestinCompComponent } from './testin-comp.component';

describe('TestinCompComponent', () => {
  let component: TestinCompComponent;
  let fixture: ComponentFixture<TestinCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestinCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestinCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
