import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  signupForm: FormGroup;              // [KEY]: For Reactive Forms

  forbiddenNames = ['Emma', 'Roni'];  // for custom validation

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.hasForbiddenName.bind(this)]), // [KEY] Use bind(this) for Angular
        'email': new FormControl(null, [Validators.required, Validators.email, this.hasForbiddenEmail])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])          // [KEY]: Use FormArray
    });

    // Subscribe to value change
    this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );

    // Subscribe to status change
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    // To set default values
    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'emmac',
    //     'email': 'emma@chang.com'
    //   },
    //   'gender': 'female',
    //   'hobbies': []
    // });

    // To patch default values
    this.signupForm.patchValue({
      'userData': {
        'username': 'emmac',
      },
      'gender': 'female',
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);        // [KEY]: Must cast <FormArray> to be able to push.
  }

  // Custom Validation
  hasForbiddenName( control: FormControl ): { [s: string]: boolean } {

    if( this.forbiddenNames.indexOf(control.value) !== -1 )           // Check of the FormControl has a value in forbiddenName array
    {
      return { 'nameIsForbidden': true };
    }

    return null;                                                      // [KEY]: When valid, must return NULL
  }

  // Async Custom Validation simulation
  hasForbiddenEmail( control: FormControl ): Promise<any> | Observable<any> {

    const promise = new Promise<any>( (resolve, reject) => {
      setTimeout( () => {
        if( control.value === 'test@test.com' ) {
          return resolve( {'emailIsForbidden': true} );
        }
        else {
          return resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
