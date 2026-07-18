# EcoLoop — Live Demo Script & Pitch Guide
### Case 13: "The Waste That Has Nowhere to Go"

---

## The Pitch in One Sentence

> **EcoLoop turns Ghana's informal waste disposal crisis into a structured, rewarding ecosystem — connecting residents, collectors, and recyclers through one seamless platform.**

---

## The Problem (Set the Scene First)

Open with this before touching the screen:

> "Every day in communities across Ghana, households generate waste that has nowhere to go. There are no trucks. No reliable schedules. No accountability. So waste ends up on street corners, in drains, and in open fields — becoming a public health crisis that every stakeholder knows about but no one has been able to systematically address.
>
> The problem isn't that people don't care. It's that there's no reliable system that makes doing the right thing easy, trackable, and rewarding.
>
> That's EcoLoop."

---

## Demo Flow (Sequence Order)

### STOP 1 — /presentation — The Pitch Slide

**What to say:**
> "Before we log in, let me show you the problem space and what we've built."

Walk through the narrative slides. Highlight:
- The waste-to-value chain: Resident → Collector → Disposal Point → Recycler
- The data loop: Every collection earns points, every point drives engagement, every recycler claim closes the loop

---

### STOP 2 — /login — The Demo Login

**What to say:**
> "EcoLoop has four stakeholder personas. Each sees a completely different interface tailored to their role. Watch how the same system serves all of them."

Show the role buttons. This alone is a strong moment — *one platform, four personas.*

---

### STOP 3 — Resident Flow

**Log in as → Resident (Abena Mensah)**

#### /dashboard — Resident Dashboard

**What to say:**
> "This is what a resident sees when they log in. Their active pickup is front and center — status, waste type, assigned collector. No confusion, no hunting."

Point out:
- HeroStatusCard showing live pickup status
- Quick action buttons (Request Pickup, Report Issue)
- EcoPoints balance in the top section

---

#### /pickups/new — Request a Pickup

**What to say:**
> "Requesting a collection takes under 60 seconds. We deliberately reduced this to a guided 3-step wizard — waste type, quantity, preferred date — because we know complex forms kill adoption."

Walk through:
1. Select waste type (e.g., Household Waste)
2. Choose quantity category (Small Bag, etc.)
3. Pick preferred date

> "The request is submitted. It immediately enters the collector queue."

---

#### /pickups → /pickups/[id] — Track Your Pickup

**What to say:**
> "The resident doesn't have to guess what's happening. Every status change — Submitted, Assigned, En Route, Collected — is visible in real time. No phone calls. No chasing."

Show the progress tracker on the detail page.

---

#### /reports/new — Report Illegal Dumping

**What to say:**
> "EcoLoop doesn't just handle scheduled pickups. Residents can report illegal dumping sites with photo evidence uploaded directly from their device. This creates a verifiable, community-sourced map of hotspots for the admin team."

Demonstrate:
- Uploading a photo from device
- Selecting severity level (Low / Medium / High / Critical)
- Describing the location and adding notes

---

#### /rewards — EcoPoints

**What to say:**
> "Every successful collection earns the resident EcoPoints — automatically. No manual claiming, no paper vouchers. These points are a behavioral incentive mechanism designed to drive consistent, long-term engagement.
>
> You do the right thing, the system rewards you."

Point out:
- Balance display
- Transaction history
- Points earned from the completed pickup we just did

---

### STOP 4 — Collector Flow

**Log in as → Collector (Kofi Asante)**

#### /collector — Collector Dashboard

**What to say:**
> "A collector's entire job is here. Their current active route, real-time status, and quick access to the next job. Everything is designed for one-handed use — large touch targets, no clutter."

---

#### /collector/requests — Available Jobs

**What to say:**
> "This is the job board. Every pending pickup in the collector's zone appears here with the waste type, quantity, and distance prominently displayed. One tap to accept."

Demonstrate:
- The job card showing waste type, address, distance
- "Details" button to inspect the job
- "Accept Job" button — show status updating live

---

#### /collector/requests/[id] — Job Detail

**What to say:**
> "Once on a job, the collector has all the context they need — resident info, address, waste type — plus clear action buttons that progress the job through its lifecycle."

Demonstrate the full flow:
1. "Start Trip" → status changes to "En Route" (resident sees this update)
2. "Mark Collected" → job closes, EcoPoints auto-awarded to resident, job moves to history

> "The resident's EcoPoints balance just went up. Automatically. No admin intervention."

---

#### /collector/history — Past Pickups

**What to say:**
> "Every completed or closed job stays in history. This is the accountability layer — what was collected, when, and by whom."

---

### STOP 5 — Admin Flow

**Log in as → Admin**

#### /admin — Admin Dashboard

**What to say:**
> "The admin sees the full system at a glance — total pickups, active reports, collector network size, EcoPoints distributed. This is the command center."

---

#### /admin/pickups — Pickup Management

**What to say:**
> "Every pickup in the system — by every resident — is visible here. Admins can monitor status, reassign collectors, or intervene when something stalls."

---

#### /admin/reports — Report Management

**What to say:**
> "Resident reports of illegal dumping sites feed directly into this triage board. Admins can mark them as Under Review or Cleared once the site has been addressed."

---

#### /admin/collectors — Collector Management

**What to say:**
> "Complete visibility into the collector network — availability status, zone coverage, and contact info. As the network scales, this becomes the operational backbone."

---

#### /admin/analytics — System Analytics

**What to say:**
> "This is where data becomes strategy. Which waste types dominate? Which areas generate the most reports? Which severity levels are most common? Admins can deploy resources where they actually matter."

Point out:
- Bar chart: Pickups by Waste Type
- Pie chart: Reports by Severity
- KPI cards: Collection Rate, Total EcoPoints Issued

---

#### /admin/feedback — Prototype Feedback

**What to say:**
> "We tested with real users and documented every piece of feedback — and every change we made as a result. This isn't just a prototype. It's an iterated product."

---

### STOP 6 — Recycler Flow

**Log in as → Recycler Partner**

#### /recycler — Recycler Dashboard

**What to say:**
> "The recycler is the final link in the chain. They see sorted materials available for collection — pre-aggregated at community disposal points.
>
> No cold-calling disposal sites. No uncertainty about what's available. Just a clean inventory, ready to claim."

---

#### /recycler/materials/[id] — Material Detail

**What to say:**
> "Each material listing shows sorting quality, estimated quantity, and originating community. One click to claim it."

Demonstrate claiming a material. Show the status change to "Claimed."

---

#### /recycler/claims — Active Claims

**What to say:**
> "Claimed materials are tracked here until physical collection. This prevents double-claiming and gives both the recycler and the admin clarity on what's in transit."

---

#### /recycler/history — Collection History

**What to say:**
> "A complete record of everything collected. The recycler's audit trail — useful for their own reporting and accountability to industrial partners."

---

## Key Talking Points to Weave In

| Moment | Line to Deliver |
|---|---|
| Resident submits pickup | "No phone calls. No uncertainty. One form, under 60 seconds." |
| Collector accepts a job | "The collector is incentivized by completions, not hours." |
| EcoPoints auto-awarded | "Behavior change through reward, not enforcement." |
| Admin analytics | "Data-driven decisions, not guesswork." |
| Recycler claims material | "Waste becomes a resource. The loop is closed." |
| Role switcher at login | "One platform. Four stakeholders. Zero duplication." |
| Photo evidence upload | "Community accountability, built in." |

---

## Answering Tough Judge Questions

**"How does this work offline or in low-connectivity areas?"**
> "The current prototype is browser-based. In a production implementation, the collector mobile view would use a PWA with offline-first caching for job data, syncing when connectivity is restored."

**"How do you incentivize collectors if there's no payment integration yet?"**
> "EcoPoints serve as the proof-of-concept for the incentive layer. In production, the same transaction system connects to mobile money APIs — MTN MoMo, Vodafone Cash — allowing direct payment per completed job."

**"What prevents fake reports or false collections?"**
> "Photo evidence is required for reports. Collector job completion is gated by sequential status transitions — a collector can't mark 'Collected' without first accepting and starting the job. In production, GPS verification is the next layer."

**"Can this scale beyond one community?"**
> "The system is community-agnostic. Each community is a data scope — same platform, different zone configurations. A city deploys the same product as a neighbourhood."

---

## Closing Statement

> "EcoLoop doesn't solve waste by building a better bin. It solves waste by building a better system — one where every actor has a role, every action is tracked, and every collection moves the community forward.
>
> The prototype you just saw runs fully in the browser, with no backend required for the demo. In production, this scales to any community, any city, any country that shares this problem.
>
> Ghana has the problem.
> We have the system.
>
> Thank you."

---

## Quick Reference — Full Route Map

| Route | Persona | What to Show |
|---|---|---|
| `/presentation` | Public | Story + narrative slides |
| `/login` | All | Role selector |
| `/dashboard` | Resident | Active pickup + EcoPoints |
| `/pickups/new` | Resident | 3-step pickup wizard |
| `/pickups/[id]` | Resident | Live status tracking |
| `/reports/new` | Resident | Photo upload + severity |
| `/reports/[id]` | Resident | Report detail + status |
| `/rewards` | Resident | EcoPoints + transactions |
| `/profile` | Resident | Account info + logout |
| `/collector` | Collector | Active route card |
| `/collector/requests` | Collector | Job board |
| `/collector/requests/[id]` | Collector | Job detail + actions |
| `/collector/history` | Collector | Completed jobs |
| `/admin` | Admin | System KPIs |
| `/admin/pickups` | Admin | All pickups |
| `/admin/reports` | Admin | Report triage |
| `/admin/collectors` | Admin | Collector network |
| `/admin/analytics` | Admin | Charts + data |
| `/admin/feedback` | Admin | Prototype feedback log |
| `/recycler` | Recycler | Materials marketplace |
| `/recycler/materials/[id]` | Recycler | Claim a material |
| `/recycler/claims` | Recycler | Active claims |
| `/recycler/history` | Recycler | Past collections |
