export type Role = 'resident' | 'business' | 'collector' | 'recycler' | 'admin';

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: Role;
  community: string;
  area: string;
  address?: string;
  business_name?: string;
  created_at: string;
  updated_at: string;
};

export type PickupStatus = 
  | 'Draft'
  | 'Submitted'
  | 'Awaiting Assignment'
  | 'Collector Assigned'
  | 'Collector En Route'
  | 'Collected'
  | 'Cancelled'
  | 'Could Not Collect';

export type PickupRequest = {
  id: string;
  user_id: string;
  collector_id?: string;
  waste_type: string;
  quantity_category: string;
  quantity_estimate?: string;
  address: string;
  community: string;
  area: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  preferred_date: string;
  recurrence?: string;
  status: PickupStatus;
  priority: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  collected_at?: string;
};

export type PickupStatusHistory = {
  id: string;
  pickup_id: string;
  status: PickupStatus;
  note?: string;
  changed_by: string;
  created_at: string;
};

export type ReportSeverity = 'Low' | 'Moderate' | 'High' | 'Urgent';
export type ReportStatus = 'Submitted' | 'Under Review' | 'Verified' | 'Response Scheduled' | 'Cleared' | 'Rejected';

export type WasteReport = {
  id: string;
  reporter_id: string;
  location: string;
  community: string;
  area: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  waste_type: string;
  severity: ReportSeverity;
  drain_blocked: boolean;
  active_burning: boolean;
  nearby_landmark_type?: string;
  description: string;
  image_url?: string;
  status: ReportStatus;
  verified: boolean;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
};

export type DisposalPointStatus = 'Open' | 'Limited Capacity' | 'Temporarily Closed' | 'Verification Needed';

export type DisposalPoint = {
  id: string;
  name: string;
  community: string;
  area: string;
  address: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  accepted_waste_types: string[];
  opening_hours: string;
  contact_phone?: string;
  status: DisposalPointStatus;
  verified_at?: string;
  created_at: string;
};

export type EcoPointTransaction = {
  id: string;
  user_id: string;
  points: number;
  transaction_type: string;
  reference_id?: string;
  description: string;
  created_at: string;
};

export type MaterialStatus = 'Available' | 'Interest Received' | 'Claimed' | 'Collected' | 'Unavailable';

export type RecyclableMaterial = {
  id: string;
  pickup_id: string;
  material_type: string;
  approximate_quantity: string;
  area: string;
  status: MaterialStatus;
  recycling_partner_id?: string;
  available_at: string;
  claimed_at?: string;
  collected_at?: string;
};

export type Feedback = {
  id: string;
  user_type: string;
  prototype_area: string;
  understood_purpose: string;
  confusing_part: string;
  missing_feature: string;
  suggested_change: string;
  rating: number;
  created_at: string;
};

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read_at?: string;
  created_at: string;
};
