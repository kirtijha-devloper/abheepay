# Abheepay Project Progress & ToDo List

This file tracks the current status of all features and modules in the Abheepay project.

## 🟢 Core Infrastructure (Completed)
- [x] **Project Foundation**: Vite (React) Frontend + Node.js (Express) Backend.
- [x] **Database Architecture**: Prisma ORM with Supabase/PostgreSQL.
- [x] **Authentication**:
    - [x] JWT-based secure login.
    - [x] Role-Based Access Control (RBAC).
    - [x] Unified Login (Credential: Email or Mobile).
    - [x] OTP Verification Flow.
- [x] **User Management**:
    - [x] Admin Panel for User Creation/Editing.
    - [x] Hierarchy Enforcement (Admin > Super > Master > Distributor > Retailer).
    - [x] Automated Parent-Child logic.
- [x] **Staff Management**:
    - [x] Employee role implementation.
    - [x] Permission-aware dashboard.
- [x] **Wallet System**:
    - [x] Real-time Balance tracking.
    - [x] Transaction Ledger (Credit/Debit logs).
    - [x] Automated Balance Updates.

## 🟢 Fund Management (Completed)
- [x] **Raise Fund Request**:
    - [x] Admin-configurable Bank Details.
    - [x] Bank Selection Dropdown for Users.
    - [x] Transaction Proof (Image Upload) Support.
    - [x] UTR Validation.
- [x] **Approval Workflow**:
    - [x] Hierarchical Approval (Superior approves Downline).
    - [x] Admin Bulk/Single Status Updates.
    - [x] Approval/Rejection remark handling.

## 🟢 Commission & Revenue (Completed)
- [x] **Commission Plans**:
    - [x] Master Commission Setup (PG, Payout, BBPS).
    - [x] Batch Update capabilities.
- [x] **PG Charges Override**:
    - [x] User-specific PG rate overrides.
    - [x] Dynamic Action buttons for Super/Master/Distributor roles.
- [x] **Service Fees**:
    - [x] Merchant Setup Fees.
    - [x] KYC Processing Fees.

## 🟡 Services Integration (In Progress / Mock)
- [/] **AEPS (Aadhaar Payments)**:
    - [x] UI Dashboard & Forms.
    - [x] Mock Transaction Logic & Commissions.
    - [ ] Real API Integration (Paysprint/Mahagram/etc.).
- [/] **DMT (Money Transfer)**:
    - [x] Recipient Management UI.
    - [x] Cash-to-Bank Mock flow.
    - [ ] Real API Integration.
- [/] **BBPS (Bill Payments & Recharge)**:
    - [x] Operator Selection UI.
    - [x] Bill Fetch/Pay Mock flow.
    - [ ] NPCI/Provider API Integration.
- [/] **Payouts (Settlements)**:
    - [x] Transfer to Bank UI.
    - [ ] Real-time IMPS/NEFT API Integration.
- [ ] **PAN Card Service**:
    - [x] UI/Report screen.
    - [ ] NSDL/UTI API Integration.

## 🔵 KYC & Support (Operational)
- [x] **KYC Module**:
    - [x] Document (Aadhaar, PAN, Video) upload flow.
    - [x] Admin Review UI.
- [x] **Support Tickets**:
    - [x] Ticket Raising & Reply system.
- [x] **Profile & Security**:
    - [x] Password Change.
    - [x] Profile Detail Updates.

## 🔴 Pending & Future Enhancements
- [ ] **Detailed Reports**:
    - [ ] Advanced Date & Service filters.
    - [ ] Export to Excel/CSV.
- [ ] **Analytics Dashboard**:
    - [ ] Revenue/Profit graphs for Admin.
    - [ ] Sales volume tracking for Super/Master Distributors.
- [ ] **Notification System**:
    - [ ] In-app alerts for Fund Approval/Rejection.
    - [ ] Low balance warnings.
- [ ] **Mobile App**:
    - [ ] Flutter/React Native integration.
