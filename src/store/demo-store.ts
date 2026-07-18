import { create } from 'zustand';
import { 
  Profile, 
  PickupRequest, 
  WasteReport, 
  DisposalPoint, 
  EcoPointTransaction, 
  RecyclableMaterial, 
  Notification,
  PickupStatus,
  ReportStatus,
  MaterialStatus
} from '@/types';
import { 
  demoProfiles, 
  demoPickups, 
  demoReports, 
  demoDisposalPoints, 
  demoMaterials, 
  demoTransactions, 
  demoNotifications 
} from '@/lib/demo-data';

interface DemoState {
  currentUser: Profile | null;
  profiles: Profile[];
  pickups: PickupRequest[];
  reports: WasteReport[];
  disposalPoints: DisposalPoint[];
  materials: RecyclableMaterial[];
  transactions: EcoPointTransaction[];
  notifications: Notification[];

  // Auth actions
  login: (email: string) => void;
  logout: () => void;

  // Data actions
  addPickup: (pickup: Omit<PickupRequest, 'id' | 'created_at' | 'updated_at'>) => void;
  updatePickupStatus: (id: string, status: PickupStatus, collectorId?: string) => void;
  
  addReport: (report: Omit<WasteReport, 'id' | 'created_at' | 'updated_at'>) => void;
  updateReportStatus: (id: string, status: ReportStatus) => void;

  claimMaterial: (id: string, recyclerId: string) => void;

  addEcoPoints: (userId: string, points: number, description: string) => void;

  resetDemo: () => void;
}

export const useDemoStore = create<DemoState>((set) => ({
  currentUser: null,
  profiles: demoProfiles,
  pickups: demoPickups,
  reports: demoReports,
  disposalPoints: demoDisposalPoints,
  materials: demoMaterials,
  transactions: demoTransactions,
  notifications: demoNotifications,

  login: (email) => set((state) => {
    const user = state.profiles.find(p => p.email === email);
    return { currentUser: user || null };
  }),

  logout: () => set({ currentUser: null }),

  addPickup: (pickupData) => set((state) => {
    const newPickup: PickupRequest = {
      ...pickupData,
      id: `pickup-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return { pickups: [newPickup, ...state.pickups] };
  }),

  updatePickupStatus: (id, status, collectorId) => set((state) => {
    const updatedPickups = state.pickups.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          status, 
          collector_id: collectorId || p.collector_id,
          updated_at: new Date().toISOString(),
          collected_at: status === 'Collected' ? new Date().toISOString() : p.collected_at
        };
      }
      return p;
    });
    return { pickups: updatedPickups };
  }),

  addReport: (reportData) => set((state) => {
    const newReport: WasteReport = {
      ...reportData,
      id: `report-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return { reports: [newReport, ...state.reports] };
  }),

  updateReportStatus: (id, status) => set((state) => {
    const updatedReports = state.reports.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status,
          updated_at: new Date().toISOString(),
          resolved_at: status === 'Cleared' ? new Date().toISOString() : r.resolved_at
        };
      }
      return r;
    });
    return { reports: updatedReports };
  }),

  claimMaterial: (id, recyclerId) => set((state) => {
    const updatedMaterials = state.materials.map(m => {
      if (m.id === id) {
        return {
          ...m,
          status: 'Claimed' as MaterialStatus,
          recycling_partner_id: recyclerId,
          claimed_at: new Date().toISOString()
        };
      }
      return m;
    });
    return { materials: updatedMaterials };
  }),

  addEcoPoints: (userId, points, description) => set((state) => {
    const newTx: EcoPointTransaction = {
      id: `tx-${Date.now()}`,
      user_id: userId,
      points,
      transaction_type: 'Earned',
      description,
      created_at: new Date().toISOString()
    };
    return { transactions: [newTx, ...state.transactions] };
  }),

  resetDemo: () => set({
    currentUser: null,
    profiles: demoProfiles,
    pickups: demoPickups,
    reports: demoReports,
    disposalPoints: demoDisposalPoints,
    materials: demoMaterials,
    transactions: demoTransactions,
    notifications: demoNotifications,
  })
}));
