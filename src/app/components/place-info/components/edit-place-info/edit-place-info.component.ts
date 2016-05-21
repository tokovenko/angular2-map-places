import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from '@angular/common';
import {Place} from  './../../../../models/place.model';
import {MinValueValidator, MaxValueValidator} from  './../../../../validators';

@Component({
    selector: 'edit-place-info',
    styles: [
        require('./edit-place-info.css')
    ],
    template: require('./edit-place-info.html')
})

export class EditPlaceInfo {
    @Input()
    public place: Place;

    @Output()
    public canceled: EventEmitter<any> = new EventEmitter();

    @Output()
    public updated: EventEmitter<any> = new EventEmitter();

    public submitted = false;

    public form;

    constructor(public formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            name: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(150)
            ])],
            description: [''],
            rating: ['', Validators.compose([
                Validators.required,
                MinValueValidator.validate(1),
                MaxValueValidator.validate(5)
            ])],
            types: [''],
            address: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(150)
            ])],
            phone: ['', Validators.required]
        });
    }
    public onSubmit() {
        if(!this.submitted) {
            this.submitted = true;
            console.log(this.form)
            return;
        }
        this.updated.next(this.place);
    }

    public onCheckType(type) {
        let index = this.place.types.indexOf(type);
        if(index > -1) {
            this.place.types.splice(index, 1);
        } else {
            this.place.types.push(type);
        }
    }

    get placeInfo() {
        return JSON.stringify(this.place);
    }

    public onCloseInfo() {
        this.canceled.next({});
    }
}
