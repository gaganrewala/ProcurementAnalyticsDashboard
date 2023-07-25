import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userId: any;
  userData: any[] = [];
  userRole: any
  selectedUser: any
  isUpdateModalOpen = false;
  createForm : FormGroup;
  updateForm : FormGroup;
  selectedUserId: number | null = null;
  isCreateModalOpen = false;
  constructor(private route: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      title: [''],
      description: ['']
    });
    this.createForm = this.formBuilder.group({
      title: [''],
      description: ['']
    });
    if (!localStorage.getItem("jwtToken")) {
      route.navigate(['login'])
    }
    // this.userId = this.route.snapshot.paramMap.get('userId');
    this.fetchUserData();
  }
  private fetchUserData() {
    this.authService.getUserData(this.userId).subscribe(
      (userData) => {
        this.userRole = localStorage.getItem('role')
        this.userData = userData;
      },
      (err) => {
        console.log("Failed to Retrieve user data")
      }
    )
  }

  logout() {
    this.authService.logout()
    this.route.navigate(['login'])
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

    this.authService.updateUserData(updatedUser).subscribe(
      (response) => {
        // Update the userData array with the updated user data from the API response
        const index = this.userData.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
          this.userData[index] = response;
        }
        // Close the modal
        this.isUpdateModalOpen = false;
      },
      (error) => {
        console.log('Error updating user data:', error);
        // Close the modal
        this.isUpdateModalOpen = false;
      }
    );
  }

  deleteUser(userId: string) {
    // Perform the delete operation using the userId
    this.authService.deleteUserData(userId).subscribe(
      () => {
        // Remove the deleted user from the userData array
        this.userData = this.userData.filter((user) => user.id !== userId);
      },
      (error) => {
        console.log('Error deleting user data:', error);
      }
    );
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
    this.createForm.reset();
  }

  createUser() {
    if (this.createForm.invalid) {
      return;
    }
    const newUser = this.createForm.value;
    this.authService.createUser(newUser).subscribe(
      (createdUser) => {
        // Add the newly created user to the userData array
        this.userData.push(createdUser);
        // Close the create modal and reset the form
        this.closeCreateModal();
      },
      (error) => {
        console.log('Error creating user:', error);
      }
    );
  }
}

