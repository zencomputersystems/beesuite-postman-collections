# Quick Start Guide - beeSuite Postman Collections

## Prerequisites

- Postman (or Postman Canary)
- beeSuite services running locally

## Directory Structure

```
beesuite-postman-collections/
├── README.md                              # Main documentation
├── QUICKSTART.md                          # This file
├── API_SUMMARY.md                         # API summary
├── beeSuite Updated API Collection.postman_collection.json  # Original collection
├── beeSuite Filtered Collection.postman_collection.json     # Filtered collection (API-matched)
└── filter-collection.js                   # Collection filtering script
```

## Installation

### Using the Filtered Collection (Recommended)

The filtered collection contains only endpoints that match the official API documentation.

1. **Import the Collection**
   - Open Postman
   - Click "Import" button
   - Select `beeSuite Filtered Collection.postman_collection.json`

2. **Configure Environment Variables**
   - Create a new Postman environment or update existing one
   - Set the following variables:
     - `base_url`: Main API base URL
     - `eleave_core_url`: http://localhost:3000
     - `eleave_tenant_url`: http://localhost:3001
     - `beewhere_url`: http://localhost:3002
     - `eleave_login_url`: http://localhost:3003
     - `beescheduler_url`: http://localhost:3004
     - `eleave_woocommerce_url`: http://localhost:3005

3. **Select the Environment**
   - In Postman, select your configured environment from the environment dropdown

### Using the Original Collection

The original collection contains all endpoints including those not in the official API docs.

1. **Import the Collection**
   - Open Postman
   - Click "Import" button
   - Select `beeSuite Updated API Collection.postman_collection.json`

2. **Configure Environment Variables**
   - Same as above

3. **Select the Environment**
   - In Postman, select your configured environment from the environment dropdown

## Getting Started

### Step 1: Start Services

Ensure all beeSuite services are running:

```bash
# eLeave Core (port 3000)
cd beesuiteCore
npm run start:dev

# eLeave Tenant (port 3001)
cd eLeaveTenantCore
npm run start:dev

# beeWhere (port 3002)
cd beeWhereCore
npm run start:dev

# eLeave Login (port 3003)
cd eLeaveLoginCore
npm run start:dev

# Beescheduler (port 3004)
cd beeschedulerCore
npm run start:dev

# eLeave WooCommerce (port 3005)
cd eLeaveWoocommerceCore
npm run start:dev
```

### Step 2: Test Authentication

1. In Postman, navigate to **eLeave Core → Authentication → Login**
2. Update the request body with your credentials:
   ```json
   {
       "email": "admin@example.com",
       "password": "your-password"
   }
   ```
3. Click "Send"
4. Copy the access token from the response

### Step 3: Set the Token

1. Click on the "beeSuite Development" environment (for individual collections)
   OR
   Click on the "beeSuite Consolidated" environment (for consolidated collection)
2. Find the `access_token` variable
3. Paste the token you copied
4. Click "Update"

### Step 4: Test Other Endpoints

Now you can test any endpoint in the collections. The authentication token will be automatically included.

## Available Collections

### Individual Collections (in `individual_collections/`)

| Collection | Port | Description |
|---------|------|-------------|
| eLeave Core | 3000 | Leave Management System |
| eLeave Tenant | 3001 | Multi-tenant Management |
| beeWhere | 3002 | Attendance & Workforce |
| eLeave Login | 3003 | Authentication Service |
| Beescheduler | 3004 | Scheduling System |
| eLeave WooCommerce | 3005 | WooCommerce Integration |

### Consolidated Collection (in `consolidated/`)

| Collection | Description |
|------|-------------|
| beeSuite-Consolidated | Single collection with all endpoints from all services |

## Common Tasks

### Get All Users
- Collection: eLeave Core
- Endpoint: `/api/admin/user`
- Method: GET

### Create New User
- Collection: eLeave Core
- Endpoint: `/api/admin/user`
- Method: POST
- Body: Include user details

### Clock In
- Collection: beeWhere
- Endpoint: `/api/clock`
- Method: POST
- Body: Include user GUID and clock time

### Get Reports
- Collection: eLeave Core
- Endpoint: `/api/admin/report/:reporttype/:startdate/:enddate`
- Method: GET

## Troubleshooting

### Connection Refused
- Ensure the service is running on the correct port
- Check the `base_url` environment variable

### Authentication Failed
- Ensure you've logged in and set the `access_token` variable
- Check if the token has expired

### 404 Not Found
- Verify the endpoint path
- Check if the service is running

### 401 Unauthorized
- Ensure the `Authorization` header is set correctly
- Check if the token is valid

## Support

For more information, see the main README.md file in this directory.
