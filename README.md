# beeSuite Postman API Collections

This directory contains Postman API collections for the beeSuite project.

## Overview

The beeSuite project consists of multiple backend services, each with its own API. This Postman collection provides comprehensive API documentation and testing capabilities for all services.

## Available Collections

### 1. eLeave Core (`eLeaveCore.postman_collection.json`)
**Port:** 3000

Leave Management System API for the main eLeave application.

**Key Features:**
- Authentication (Login, Forgot Password, Invitation)
- User Management
- Staff Management
- Leave Types & Entitlements
- Leave Applications
- Company Management
- Master Setup (Departments, Designations, etc.)
- Reports & Analytics
- Dashboard
- Profile Picture Upload
- Holiday Management
- Overtime Management

**Base URL:** `http://localhost:3000`

### 2. eLeave Tenant (`eLeaveTenantCore.postman_collection.json`)
**Port:** 3001

Multi-tenant Leave Management System API for tenant administration.

**Key Features:**
- Authentication (Local, AD)
- Customer Management
- Subscription Management
- User Management (Tenant-specific)
- Role Management
- Dashboard
- Activity Log
- Support Tickets
- Data Sync

**Base URL:** `http://localhost:3001`

### 3. beeWhere (`beeWhereCore.postman_collection.json`)
**Port:** 3002

Attendance and Workforce Management System API.

**Key Features:**
- Authentication
- Clock Management (Clock In/Out, History)
- Overtime Management
- Client Management
- User Info
- Login Logs
- Attendance Profiles
- Location Management
- Project Management
- Contract Management
- Reports
- Map Integration
- Support Tickets

**Base URL:** `http://localhost:3002`

### 4. eLeave Login (`eLeaveLoginCore.postman_collection.json`)
**Port:** 3003

Authentication Service API.

**Key Features:**
- Local Database Authentication
- Active Directory Authentication
- Email Authentication
- User Management
- Encryption Utilities (SHA256, AES)

**Base URL:** `http://localhost:3003`

### 5. Beescheduler (`beeschedulerCore.postman_collection.json`)
**Port:** 3004

Attendance Scheduling System API.

**Key Features:**
- Scheduler Status
- Clock Reminders
- Entitlement Management
- Health Check

**Base URL:** `http://localhost:3004`

### 6. eLeave WooCommerce (`eLeaveWoocommerceCore.postman_collection.json`)
**Port:** 3005

WooCommerce Integration API.

**Key Features:**
- Products (CRUD operations)
- Product Variations
- Product Categories
- Product Tags
- Product Attributes
- Product Shipping Classes
- Customers (CRUD operations)
- Orders (CRUD operations)
- Order Notes & Refunds
- Coupons
- Tax Rates & Classes
- Shipping Zones & Methods
- Payment Gateways
- Settings
- System Status
- Reports
- Subscriptions

**Base URL:** `http://localhost:3005`

## Main Collection

The `beeSuite.postman_collection.json` file serves as a main collection that references all individual collections. You can import this into Postman to access all APIs in one place.

## Environment Variables

The following environment variables are used across collections:

| Variable | Description | Default |
|----------|-------------|---------|
| `base_url` | Base URL for API endpoints | `http://localhost:3000` |
| `access_token` | JWT authentication token | (empty) |

## Authentication

Most endpoints require JWT authentication. To use the collections:

1. Import the collection into Postman
2. Set up environment variables
3. Call the Login endpoint first to get an access token
4. Set the `access_token` variable in your environment
5. The token will be automatically included in subsequent requests

## Usage Instructions

### Importing into Postman

1. Open Postman
2. Click on "Import" button
3. Select the collection JSON file
4. Set up environment variables:
   - `base_url`: Set to your API base URL
   - `access_token`: Leave empty initially, will be populated after login

### Testing the APIs

1. **Login First**: Use the appropriate login endpoint to authenticate
2. **Set Token**: Copy the access token from the login response and set it as the `access_token` environment variable
3. **Make Requests**: Navigate through the collections and test endpoints
4. **Modify Requests**: Update request parameters as needed for your testing

## API Documentation

Each endpoint includes:
- HTTP Method (GET, POST, PATCH, DELETE)
- Request headers (including authentication)
- Request body examples
- URL parameters
- Query parameters
- Description

## Notes

- All collections use the same authentication pattern (JWT Bearer tokens)
- Some endpoints require specific roles (e.g., `superadmin`, `salesperson`, `support`)
- Environment variables should be configured per deployment environment
- The collections are designed for development and testing purposes

## Support

For issues or questions about the API:
1. Check the individual service documentation
2. Review the source code in the respective service directories
3. Contact the development team

## Version

Last updated: March 2026
beeSuite Version: 0.0.1
