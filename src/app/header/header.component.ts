

// // import { Component, OnInit } from '@angular/core';
// // import { NotificationService } from '../services/notification.service';
// // import { BooleanInput } from '@angular/cdk/coercion';
// // import { trigger, state, style, animate, transition } from '@angular/animations';
// // import { AuthService } from '../services/auth.service';

// // @Component({
// //   selector: 'app-header',
// //   templateUrl: './header.component.html',
// //   styleUrls: ['./header.component.css'],
// //   animations: [
// //     trigger('slideInOut', [
// //       state('in', style({
// //         transform: 'translate3d(0, 0, 0)'
// //       })),
// //       state('out', style({
// //         transform: 'translate3d(100%, 0, 0)'
// //       })),
// //       transition('in => out', animate('400ms ease-in-out')),
// //       transition('out => in', animate('400ms ease-in-out'))
// //     ])
// //   ]

// // })
// // export class HeaderComponent implements OnInit {

// //   isSidebarOpen = false;
// // logout() {
// // throw new Error('Method not implemented.');
// // }
// // toggleDropdown() {
// // throw new Error('Method not implemented.');
// // }
// // toggleSidebar() {
// //   this.isSidebarOpen = !this.isSidebarOpen;
// // }

// // get sidebarState() {
// //   return this.isSidebarOpen ? 'in' : 'out';
// // }
// //   showNotifications = false;
// //   notificationCount = 0;
// //   notifications: any[] = [];
// //   userName = 'User'; // Replace with dynamic user name if available

// //   constructor(private notificationService: NotificationService,
// //     private authService: AuthService) {}

// //   ngOnInit(): void {
// //     this.getNotifications();
// //     this.userName = this.authService.getLoggedInUserName();
// //   }
// //   toggleNotifications(): void {
// //     this.showNotifications = !this.showNotifications;
// //   }
// //   getNotifications(): void {
// //     const userId = this.authService.getLoggedInUserId(); 
// //     this.notificationService.getNotificationsByUserId(userId)
// //       .subscribe(data => {
// //         this.notifications = data;
// //         this.notificationCount = data.length;
// //       }, error => {
// //         console.error('Error fetching notifications', error);
// //       });
// //   }
  

// //   clearNotification(id: number): void {
// //     this.notificationService.deleteNotification(id)
// //       .subscribe(() => {
// //         this.notifications = this.notifications.filter(notification => notification.id !== id);
// //         this.notificationCount = this.notifications.length;
// //       }, error => {
// //         console.error('Error deleting notification', error);
// //       });
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { NotificationService } from '../services/notification.service';
// import { trigger, state, style, animate, transition } from '@angular/animations';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
//   animations: [
//     trigger('slideInOut', [
//       state('in', style({
//         transform: 'translate3d(0, 0, 0)'
//       })),
//       state('out', style({
//         transform: 'translate3d(100%, 0, 0)'
//       })),
//       transition('in => out', animate('400ms ease-in-out')),
//       transition('out => in', animate('400ms ease-in-out'))
//     ])
//   ]
// })
// export class HeaderComponent implements OnInit {


//   isSidebarOpen = false;
//   showNotifications = false;
//   notificationCount = 0;
//   notifications: any[] = [];
//   userName = 'User'; // Default value

//   constructor(
//     private notificationService: NotificationService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.getNotifications();
//     this.userName = this.getUserNameFromLocalStorage();
//   }

//   toggleSidebar() {
//     this.isSidebarOpen = !this.isSidebarOpen;
//   }

//   get sidebarState() {
//     return this.isSidebarOpen ? 'in' : 'out';
//   }

//   toggleNotifications(): void {
//     this.showNotifications = !this.showNotifications;
//   }

//   getNotifications(): void {
//     const userId = this.authService.getLoggedInUserId();
//     this.notificationService.getNotificationsByUserId(userId)
//       .subscribe(data => {
//         this.notifications = data;
//         this.notificationCount = data.length;
//       }, error => {
//         console.error('Error fetching notifications', error);
//       });
//   }

//   clearNotification(id: number): void {
//     this.notificationService.deleteNotification(id)
//       .subscribe(() => {
//         this.notifications = this.notifications.filter(notification => notification.id !== id);
//         this.notificationCount = this.notifications.length;
//       }, error => {
//         console.error('Error deleting notification', error);
//       });
//   }

//   getUserNameFromLocalStorage(): string {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user).name : 'User';
//   }
//   logout(): void {
//     this.authService.logout();
//   }
// }
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        right: '0'
      })),
      state('out', style({
        right: '-250px'
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  isSidebarOpen = false;
  showNotifications = false;
  notificationCount = 0;
  notifications: any[] = [];
  userName = 'User'; // Default value

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getNotifications();
    this.userName = this.getUserNameFromLocalStorage();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  get sidebarState() {
    return this.isSidebarOpen ? 'in' : 'out';
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  getNotifications(): void {
    const userId = this.authService.getLoggedInUserId();
    this.notificationService.getNotificationsByUserId(userId)
      .subscribe(data => {
        this.notifications = data;
        this.notificationCount = data.length;
      }, error => {
        console.error('Error fetching notifications', error);
      });
  }

  clearNotification(id: number): void {
    this.notificationService.deleteNotification(id)
      .subscribe(() => {
        this.notifications = this.notifications.filter(notification => notification.id !== id);
        this.notificationCount = this.notifications.length;
      }, error => {
        console.error('Error deleting notification', error);
      });
  }

  getUserNameFromLocalStorage(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : 'User';
  }

  logout(): void {
    this.authService.logout();
  }
}
