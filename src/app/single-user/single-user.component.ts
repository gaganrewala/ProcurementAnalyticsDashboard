import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthService } from '../shared/auth.service'
@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent {
  userId: any;
  user: any
  userRole: any
  selectedUser: any
  isUpdateModalOpen = false;
  updateForm : FormGroup;
  selectedUserId: number | null = null;
  constructor(private route: ActivatedRoute,private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      title: [''],
      description: ['']
    });
    if (!localStorage.getItem("jwtToken")) {
      router.navigate(['login'])
    }
    this.userId = this.route.snapshot.paramMap.get('id');
    this.fetchUserData();
  }
  private fetchUserData() {
    this.authService.getUser(this.userId).subscribe(
      (user) => {
        this.userRole = localStorage.getItem('role')
        this.user = user;
      },
      (err) => {
        console.log("Failed to Retrieve user data")
      }
    )
  }
  logout() {
    this.authService.logout()
    this.router.navigate(['login'])
  }

  showUpdateModal(item: any) {
    this.selectedUser = item;
    this.isUpdateModalOpen = true;
    this.updateForm.patchValue({
      title: item.title,
      description: item.description
    });
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
  }

  updateUser() {
    const updatedUser = {
      ...this.selectedUser,
      title: this.updateForm.get('title')?.value,
      description: this.updateForm.get('description')?.value
    };
    // console.log(updatedUser)
    this.authService.updateUserData(updatedUser).subscribe(
      (response) => {
        this.user= response;
        this.isUpdateModalOpen = false;
      },
      (error) => {
        console.log('Error updating user data:', error);
        // Close the modal
        this.isUpdateModalOpen = false;
      }
    );
  }
  goBackToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}