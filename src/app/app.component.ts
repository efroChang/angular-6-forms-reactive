import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])          // [KEY]: Use FormArray
    });
  }

  onSubmit() {
    console.log(this.signupForm);
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
}
