import { 
  Profile, 
  PickupRequest, 
  WasteReport, 
  DisposalPoint, 
  EcoPointTransaction, 
  RecyclableMaterial, 
  Notification,
  Role,
  PickupStatus,
  ReportStatus
} from '@/types';
import { addDays, subDays } from 'date-fns';

const now = new Date();

export const demoProfiles: Profile[] = [
  // Admins
  {
    id: 'admin-1',
    full_name: 'Sarah Osei',
    email: 'admin@ecoloop.demo',
    phone: '0550000001',
    role: 'admin',
    community: 'Adom Community',
    area: 'All Areas',
    created_at: subDays(now, 30).toISOString(),
    updated_at: subDays(now, 30).toISOString(),
  },
  // Collectors
  {
    id: 'collector-1',
    full_name: 'Kwame Mensah',
    email: 'collector@ecoloop.demo',
    phone: '0550000002',
    role: 'collector',
    community: 'Adom Community',
    area: 'Zongo Junction, Station Road',
    created_at: subDays(now, 20).toISOString(),
    updated_at: subDays(now, 20).toISOString(),
  },
  {
    id: 'collector-2',
    full_name: 'Yaw Boateng',
    email: 'collector2@ecoloop.demo',
    phone: '0550000003',
    role: 'collector',
    community: 'Adom Community',
    area: 'Market Lane, School Park',
    created_at: subDays(now, 19).toISOString(),
    updated_at: subDays(now, 19).toISOString(),
  },
  // Residents
  {
    id: 'resident-1',
    full_name: 'Ama Serwaa',
    email: 'resident@ecoloop.demo',
    phone: '0550000004',
    role: 'resident',
    community: 'Adom Community',
    area: 'Station Road',
    address: 'Hse No. 42, Station Road',
    created_at: subDays(now, 10).toISOString(),
    updated_at: subDays(now, 10).toISOString(),
  },
  {
    id: 'resident-2',
    full_name: 'Kofi Annan',
    email: 'resident2@ecoloop.demo',
    phone: '0550000005',
    role: 'resident',
    community: 'Adom Community',
    area: 'School Park',
    address: 'Near the basic school',
    created_at: subDays(now, 8).toISOString(),
    updated_at: subDays(now, 8).toISOString(),
  },
  // Businesses
  {
    id: 'business-1',
    full_name: 'Grace Appiah',
    email: 'business@ecoloop.demo',
    phone: '0550000006',
    role: 'business',
    business_name: 'Grace Provision Store',
    community: 'Adom Community',
    area: 'Market Lane',
    address: 'Market Square, Stall 4',
    created_at: subDays(now, 15).toISOString(),
    updated_at: subDays(now, 15).toISOString(),
  },
  // Recyclers
  {
    id: 'recycler-1',
    full_name: 'EcoPlast Recycling Hub',
    email: 'recycler@ecoloop.demo',
    phone: '0550000007',
    role: 'recycler',
    community: 'Adom Community',
    area: 'Industrial Area',
    created_at: subDays(now, 25).toISOString(),
    updated_at: subDays(now, 25).toISOString(),
  }
];

export const demoPickups: PickupRequest[] = [
  {
    id: 'pickup-1',
    user_id: 'resident-1',
    waste_type: 'Plastic',
    quantity_category: 'Two to three bags',
    address: 'Hse No. 42, Station Road',
    community: 'Adom Community',
    area: 'Station Road',
    landmark: 'Opposite the blue kiosk',
    preferred_date: addDays(now, 1).toISOString(),
    status: 'Submitted',
    priority: 1,
    created_at: subDays(now, 1).toISOString(),
    updated_at: subDays(now, 1).toISOString(),
  },
  {
    id: 'pickup-2',
    user_id: 'business-1',
    waste_type: 'Paper or cardboard',
    quantity_category: 'Business quantity',
    address: 'Market Square, Stall 4',
    community: 'Adom Community',
    area: 'Market Lane',
    preferred_date: now.toISOString(),
    status: 'Awaiting Assignment',
    priority: 2,
    created_at: subDays(now, 2).toISOString(),
    updated_at: subDays(now, 2).toISOString(),
  },
  {
    id: 'pickup-3',
    user_id: 'resident-2',
    collector_id: 'collector-1',
    waste_type: 'General household waste',
    quantity_category: 'One small bag',
    address: 'Near the basic school',
    community: 'Adom Community',
    area: 'School Park',
    preferred_date: now.toISOString(),
    status: 'Collector Assigned',
    priority: 1,
    created_at: subDays(now, 1).toISOString(),
    updated_at: now.toISOString(),
  }
];

export const demoReports: WasteReport[] = [
  {
    id: 'report-1',
    reporter_id: 'resident-1',
    location: 'Open plot behind the station',
    community: 'Adom Community',
    area: 'Station Road',
    waste_type: 'Mixed general waste',
    severity: 'High',
    drain_blocked: true,
    active_burning: false,
    description: 'People have been dumping rubbish here for weeks. It is now spilling into the main drain.',
    status: 'Under Review',
    verified: false,
    created_at: subDays(now, 2).toISOString(),
    updated_at: subDays(now, 2).toISOString(),
  },
  {
    id: 'report-2',
    reporter_id: 'resident-2',
    location: 'Beside the primary school wall',
    community: 'Adom Community',
    area: 'School Park',
    waste_type: 'Plastic and organic',
    severity: 'Urgent',
    drain_blocked: false,
    active_burning: true,
    nearby_landmark_type: 'School',
    description: 'Someone set fire to the rubbish dump near the school wall. The smoke is affecting the classrooms.',
    status: 'Submitted',
    verified: false,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  }
];

export const demoDisposalPoints: DisposalPoint[] = [
  {
    id: 'dp-1',
    name: 'Central Market Sorting Center',
    community: 'Adom Community',
    area: 'Market Lane',
    address: 'Behind the main market building',
    accepted_waste_types: ['Plastic', 'Paper or cardboard', 'Metal'],
    opening_hours: 'Mon-Sat, 6:00 AM - 6:00 PM',
    status: 'Open',
    verified_at: subDays(now, 10).toISOString(),
    created_at: subDays(now, 10).toISOString(),
  },
  {
    id: 'dp-2',
    name: 'Station Road Bin Depot',
    community: 'Adom Community',
    area: 'Station Road',
    address: 'Next to the trotro station',
    accepted_waste_types: ['General household waste'],
    opening_hours: '24/7',
    status: 'Limited Capacity',
    verified_at: subDays(now, 5).toISOString(),
    created_at: subDays(now, 20).toISOString(),
  }
];

export const demoMaterials: RecyclableMaterial[] = [
  {
    id: 'mat-1',
    pickup_id: 'pickup-old-1',
    material_type: 'Plastic',
    approximate_quantity: '5 large bags',
    area: 'Station Road',
    status: 'Available',
    available_at: subDays(now, 1).toISOString(),
  },
  {
    id: 'mat-2',
    pickup_id: 'pickup-old-2',
    material_type: 'Metal',
    approximate_quantity: 'Assorted scrap',
    area: 'Market Lane',
    status: 'Claimed',
    recycling_partner_id: 'recycler-1',
    available_at: subDays(now, 3).toISOString(),
    claimed_at: subDays(now, 1).toISOString(),
  }
];

export const demoTransactions: EcoPointTransaction[] = [
  {
    id: 'tx-1',
    user_id: 'resident-1',
    points: 50,
    transaction_type: 'Earned',
    description: 'Completed plastic waste pickup',
    created_at: subDays(now, 5).toISOString(),
  },
  {
    id: 'tx-2',
    user_id: 'resident-1',
    points: 20,
    transaction_type: 'Earned',
    description: 'Verified waste report submitted',
    created_at: subDays(now, 12).toISOString(),
  }
];

export const demoNotifications: Notification[] = [
  {
    id: 'notif-1',
    user_id: 'resident-1',
    title: 'Pickup Scheduled',
    message: 'Your pickup request has been received.',
    type: 'success',
    created_at: subDays(now, 1).toISOString(),
  },
  {
    id: 'notif-2',
    user_id: 'collector-1',
    title: 'New Assignment',
    message: 'You have been assigned a new pickup at School Park.',
    type: 'info',
    created_at: subDays(now, 1).toISOString(),
  }
];
