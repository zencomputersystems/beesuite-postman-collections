# beeSuite API Summary

This document provides a summary of all APIs in the beeSuite project.

## Services Overview

### 1. eLeave Core (Port 3000)
**Purpose:** Main leave management system

**API Categories:**
- Authentication (3 endpoints)
- User Management (5 endpoints)
- Staff Management (2 endpoints)
- Leave Types (5 endpoints)
- Leave Entitlement (6 endpoints)
- Leave Applications (5 endpoints)
- Company Management (2 endpoints)
- Master Setup (2 endpoints)
- Reports (4 endpoints)
- Dashboard (3 endpoints)
- Profile Picture (2 endpoints)
- Holiday (1 endpoint)
- Overtime (2 endpoints)

**Total:** ~45 endpoints

---

### 2. eLeave Tenant (Port 3001)
**Purpose:** Multi-tenant administration

**API Categories:**
- Authentication (3 endpoints)
- Customer Management (2 endpoints)
- Subscription Management (2 endpoints)
- User Management (5 endpoints)
- Role Management (4 endpoints)
- Dashboard (1 endpoint)
- Activity Log (1 endpoint)
- Support (1 endpoint)
- Sync Data (1 endpoint)
- Resync Subscription (1 endpoint)

**Total:** ~21 endpoints

---

### 3. beeWhere (Port 3002)
**Purpose:** Attendance and workforce management

**API Categories:**
- Authentication (1 endpoint)
- Clock Management (4 endpoints)
- Overtime Management (2 endpoints)
- Client Management (6 endpoints)
- User Info (1 endpoint)
- Login Log (3 endpoints)
- Attendance Profile (1 endpoint)
- Location (1 endpoint)
- Project (1 endpoint)
- Contract (1 endpoint)
- Report (1 endpoint)
- Map (1 endpoint)
- Support (1 endpoint)

**Total:** ~28 endpoints

---

### 4. eLeave Login (Port 3003)
**Purpose:** Authentication service

**API Categories:**
- Authentication (4 endpoints)
- User Management (5 endpoints)
- Encryption (4 endpoints)

**Total:** ~13 endpoints

---

### 5. Beescheduler (Port 3004)
**Purpose:** Attendance scheduling

**API Categories:**
- Scheduler (3 endpoints)
- Health Check (1 endpoint)

**Total:** ~4 endpoints

---

### 6. eLeave WooCommerce (Port 3005)
**Purpose:** WooCommerce integration

**API Categories:**
- Products (5 endpoints)
- Product Variations (2 endpoints)
- Product Categories (2 endpoints)
- Product Tags (1 endpoint)
- Product Attributes (2 endpoints)
- Product Attribute Terms (1 endpoint)
- Product Shipping Classes (1 endpoint)
- Customers (4 endpoints)
- Orders (4 endpoints)
- Order Notes (1 endpoint)
- Order Refunds (1 endpoint)
- Coupons (3 endpoints)
- Tax Rates (1 endpoint)
- Tax Classes (1 endpoint)
- Shipping Zones (2 endpoints)
- Shipping Zone Locations (1 endpoint)
- Shipping Zone Methods (1 endpoint)
- Shipping Methods (1 endpoint)
- Payment Gateways (1 endpoint)
- Settings (1 endpoint)
- Setting Options (1 endpoint)
- System Status (1 endpoint)
- System Status Tools (1 endpoint)
- Data (1 endpoint)
- Reports (1 endpoint)
- Subscriptions (2 endpoints)
- Subscription Orders (1 endpoint)
- Subscription Notes (1 endpoint)
- Product Reviews (1 endpoint)

**Total:** ~75 endpoints

---

## Total API Summary

| Service | Endpoints | Category |
|----------|-----------|----------|
| eLeave Core | ~45 | Leave Management |
| eLeave Tenant | ~21 | Multi-tenant Admin |
| beeWhere | ~28 | Attendance & Workforce |
| eLeave Login | ~13 | Authentication |
| Beescheduler | ~4 | Scheduling |
| eLeave WooCommerce | ~75 | E-commerce Integration |
| **Total** | **~186** | |

## Authentication

All services use JWT Bearer token authentication:
- Header: `Authorization: Bearer {token}`
- Login endpoints are public
- All other endpoints require authentication

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `base_url` | Base URL for API | `http://localhost:3000` |
| `access_token` | JWT token | (empty) |

## Postman Collections

| File | Description |
|----------|-------------|
| `eLeaveCore.postman_collection.json` | eLeave Core API |
| `eLeaveTenantCore.postman_collection.json` | eLeave Tenant API |
| `beeWhereCore.postman_collection.json` | beeWhere API |
| `eLeaveLoginCore.postman_collection.json` | eLeave Login API |
| `beeschedulerCore.postman_collection.json` | Beescheduler API |
| `eLeaveWoocommerceCore.postman_collection.json` | WooCommerce API |
| `beeSuite.postman_collection.json` | Main collection (references all) |
| `beeSuite-Development.postman_environment.json` | Development environment |

## Quick Start

1. Import `beeSuite.postman_collection.json` into Postman
2. Import `beeSuite-Development.postman_environment.json`
3. Select the "beeSuite Development" environment
4. Call the Login endpoint to get a token
5. Set the `access_token` variable
6. Start testing APIs!

## Notes

- All collections are valid JSON and can be imported directly into Postman
- Environment variables are pre-configured for development
- Each service has its own port for easy testing
- Authentication is consistent across all services
