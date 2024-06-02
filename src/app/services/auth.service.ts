// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   getLoggedInEmployeeId() {
//     throw new Error('Method not implemented.');
//   }

//   private loggedIn = false;

//   isAuthenticated(): boolean {
//     return this.loggedIn;
//   }

//   login() {
//     this.loggedIn = true;
//   }

//   logout() {
//     this.loggedIn = false;
//   }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getLoggedInEmployeeId() {
    throw new Error('Method not implemented.');
  }
  private loggedIn = false;

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  login() {
    this.loggedIn = true;

    
  }

  logout() {
    this.loggedIn = false;
  }

  getLoggedInUserId(): number {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    return user && user.id ? Number(user.id) : 0; // Assuming 0 indicates "User Not Exist"
  }

  getLoggedInUserName(): string {
    const userJson = localStorage.getItem('USER'); // Update key to 'USER'
    const user = userJson ? JSON.parse(userJson) : null;
    return user && user.name ? user.name : 'Unknown';
  }
  
}


 
  // getLoggedInUserId(): string {
    
  //   const userJson = localStorage.getItem('user');
  
    
  //   const user = userJson ? JSON.parse(userJson) : null;
  
    
  //   if (user && user.id) {
      
  //     return user.id;
  //   } else {
  //     // Return null if user or user ID is not found
  //     return 'User Not Exist';
  //   }
  // }
  




