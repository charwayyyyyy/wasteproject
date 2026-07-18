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

  claimMaterial: (id: string, recyclerId: string) => { success: boolean; message: string };
  completeMaterialClaim: (materialId: string, recyclerId: string, details: { quantity?: string; date?: string; note?: string }) => { success: boolean; message: string };

  addEcoPoints: (userId: string, points: number, description: string) => void;

  // New Admin Actions
  assignCollectorToPickup: (pickupId: string, collectorId: string) => { success: boolean; message: string };
  reassignCollector: (pickupId: string, newCollectorId: string, reason: string) => { success: boolean; message: string };
  updateCollectorAvailability: (collectorId: string, status: 'Available' | 'On Route' | 'At Capacity' | 'Offline') => { success: boolean; message: string };

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

  claimMaterial: (id, recyclerId) => {
    let result = { success: false, message: 'Material not found or unavailable' };
    set((state) => {
      const material = state.materials.find(m => m.id === id);
      if (!material || material.status !== 'Available') {
        return state;
      }
      
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
      result = { success: true, message: 'Material successfully claimed' };
      return { materials: updatedMaterials };
    });
    return result;
  },

  completeMaterialClaim: (materialId, recyclerId, details) => {
    let result = { success: false, message: 'Material claim not found or you do not have permission' };
    set((state) => {
      const material = state.materials.find(m => m.id === materialId);
      if (!material || material.status !== 'Claimed' || material.recycling_partner_id !== recyclerId) {
        return state;
      }
      
      const updatedMaterials = state.materials.map(m => {
        if (m.id === materialId) {
          return {
            ...m,
            status: 'Collected' as MaterialStatus,
            collected_at: details.date || new Date().toISOString(),
            approximate_quantity: details.quantity || m.approximate_quantity
          };
        }
        return m;
      });
      result = { success: true, message: 'Material successfully marked as collected' };
      return { materials: updatedMaterials };
    });
    return result;
  },

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

  assignCollectorToPickup: (pickupId, collectorId) => {
    let result = { success: false, message: 'Pickup or collector not found' };
    set((state) => {
      const pickup = state.pickups.find(p => p.id === pickupId);
      const collector = state.profiles.find(p => p.id === collectorId && p.role === 'collector');
      
      if (!pickup || !collector) return state;
      if (pickup.status !== 'Submitted' && pickup.status !== 'Awaiting Assignment') {
        result = { success: false, message: 'Pickup is not in an assignable state' };
        return state;
      }
      
      const updatedPickups = state.pickups.map(p => {
        if (p.id === pickupId) {
          return {
            ...p,
            status: 'Collector Assigned' as PickupStatus,
            collector_id: collectorId,
            updated_at: new Date().toISOString()
          };
        }
        return p;
      });
      result = { success: true, message: 'Collector successfully assigned' };
      return { pickups: updatedPickups };
    });
    return result;
  },

  reassignCollector: (pickupId, newCollectorId, _reason) => {
    let result = { success: false, message: 'Pickup or new collector not found' };
    set((state) => {
      const pickup = state.pickups.find(p => p.id === pickupId);
      const collector = state.profiles.find(p => p.id === newCollectorId && p.role === 'collector');
      
      if (!pickup || !collector) return state;
      if (!pickup.collector_id) {
        result = { success: false, message: 'Pickup is not currently assigned' };
        return state;
      }
      
      const updatedPickups = state.pickups.map(p => {
        if (p.id === pickupId) {
          return {
            ...p,
            collector_id: newCollectorId,
            updated_at: new Date().toISOString()
          };
        }
        return p;
      });
      result = { success: true, message: 'Collector successfully reassigned' };
      return { pickups: updatedPickups };
    });
    return result;
  },

  updateCollectorAvailability: (collectorId, status) => {
    let result = { success: false, message: 'Collector not found' };
    set((state) => {
      // In the real app, we would update the profile or a separate collector_status table.
      // For demo purposes, we will update the profile's status if they are a collector.
      const collectorIndex = state.profiles.findIndex(p => p.id === collectorId && p.role === 'collector');
      if (collectorIndex === -1) return state;
      
      const updatedProfiles = [...state.profiles];
      updatedProfiles[collectorIndex] = {
        ...updatedProfiles[collectorIndex],
        status: status // Assuming 'status' field exists or we can just append it for demo
      };
      
      result = { success: true, message: 'Availability updated' };
      return { profiles: updatedProfiles };
    });
    return result;
  },

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
