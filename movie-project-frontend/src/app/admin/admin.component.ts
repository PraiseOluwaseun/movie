// admin.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  movieForm!: FormGroup;
  submittedData: any = null; // To hold the submitted form data

  private httpClient = inject(HttpClient);
  private photoService = inject(PhotoService);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      movieTitle: ['', Validators.required],
      releaseDate: ['', Validators.required],
      movieDescription: ['', Validators.required],
      moviePoster: ['', Validators.required],
      genre: ['', Validators.required],
      directorName: ['', Validators.required],
      directorEmail: ['', [Validators.required, Validators.email]],
      directorPicture: ['', Validators.required],
      castMembers: this.formBuilder.array([this.createCastMemberFormGroup()]),
      randomPictures: this.formBuilder.array([], Validators.maxLength(5)) // New FormArray for 5 random pictures
    });
  }

  createCastMemberFormGroup(): FormGroup {
    return this.formBuilder.group({
      actorName: ['', Validators.required],
      autobiographyLink: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

  get castMembers(): FormArray {
    return this.movieForm.get('castMembers') as FormArray;
  }

  get randomPictures(): FormArray {
    return this.movieForm.get('randomPictures') as FormArray;
  }

  addCastMember(): void {
    this.castMembers.push(this.createCastMemberFormGroup());
  }

  removeCastMember(index: number): void {
    this.castMembers.removeAt(index);
  }

  // Method to add a random picture to the form array
  addRandomPicture(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      if (this.randomPictures.length < 5) {
        const file = input.files[0];
        this.randomPictures.push(this.formBuilder.control(file, Validators.required));
      } else {
        alert('You can upload a maximum of 5 pictures.');
      }
    }
  }

  removeRandomPicture(index: number): void {
    this.randomPictures.removeAt(index);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  async onSubmit(): Promise<void> {
    if (this.movieForm.valid) {
      const formData = this.movieForm.value;
      const convertedData = await this.convertFormData(formData);
      this.submittedData = convertedData;
      console.log(convertedData);
    } else {
      this.markFormGroupTouched(this.movieForm);
    }
  }

  private async convertFormData(formData: any): Promise<any> {
    const convertedData: any = { ...formData };
    convertedData.moviePoster = await this.photoService.convertToBase64(formData.moviePoster);
    convertedData.directorPicture = await this.photoService.convertToBase64(formData.directorPicture);
    convertedData.castMembers = await Promise.all(formData.castMembers.map(async (castMember: any) => {
      return {
        ...castMember,
        picture: await this.photoService.convertToBase64(castMember.picture)
      };
    }));
    convertedData.randomPictures = await Promise.all(formData.randomPictures.map(async (picture: any) => {
      return await this.photoService.convertToBase64(picture);
    }));
    return convertedData;
  }
}