import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertboxPage } from './alertbox.page';

describe('AlertboxPage', () => {
  let component: AlertboxPage;
  let fixture: ComponentFixture<AlertboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
