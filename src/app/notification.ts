// notification.interface.ts

export interface Notification {
    type: 'single' | 'bulk' | 'cancel' | 'quick';
    date?: Date;      // For single bookings or cancellations
    startDate?: Date; // For bulk bookings
    endDate?: Date;   // For bulk bookings
    // Other properties specific to each type of notification
  }
  