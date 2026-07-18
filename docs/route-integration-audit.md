# Route Integration Audit

| Navigation Label | Expected Route | Current Result | Role | Existing Data Model | Existing Shared Components | Required Implementation | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Pickups | `/admin/pickups` | 404 | Admin | `PickupRequest`, `PickupStatus` | `AdminLayout`, `Card`, `Badge`, `EmptyState`, `ErrorState`, `Select` | Create page, filter/search, collector assignment sheet/dialog. Add `assignCollectorToPickup`, `reassignCollector`. | Missing |
| Collectors | `/admin/collectors` | 404 | Admin | `Profile` (collector), `PickupRequest` | `AdminLayout`, `Card`, `Badge`, `EmptyState`, `ErrorState` | Create page, collector list, workload summary, detail sheet. Add `updateCollectorAvailability`. | Missing |
| My Claims | `/recycler/claims` | 404 | Recycler | `RecyclableMaterial` | `RecyclerLayout`, `Card`, `Badge`, `EmptyState`, `ErrorState`, `Tabs` | Create page, active/completed claims tabs, Mark Collected flow. Add `completeMaterialClaim`. | Missing |
| History | `/recycler/history` | 404 | Recycler | `RecyclableMaterial` | `RecyclerLayout`, `Card`, `Badge`, `EmptyState`, `ErrorState`, `Select` | Create page, historical summary, material/date filters. | Missing |
| Material Detail | `/recycler/materials/[id]` | Missing | Recycler | `RecyclableMaterial` | `RecyclerLayout`, `Card`, `Badge`, `Button`, `EmptyState` | Create dynamic route, claim action validation, status history. Add `claimMaterial` validation. | Missing |

## Notes
- All roles and basic shell layouts (`AdminLayout`, `RecyclerLayout`) exist and are functional.
- The Zustand store (`demo-store.ts`) contains the necessary data arrays (`pickups`, `profiles`, `materials`), but needs centralized actions with full validation, timestamps, and history updates.
- Basic UI elements (Cards, Badges, Tabs, Empty States) are available in `src/components/ui/`.
- Dynamic routes (`[id]`) and their `loading.tsx` and `not-found.tsx` states must be created.
