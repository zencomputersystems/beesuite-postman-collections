# Quick Start Guide - beeSuite Postman Collections

## Prerequisites

- Postman (or Postman Canary)
- beeSuite services running locally

## Directory Structure

```
beesuite-postman-collections/
├── README.md                    # Main documentation
├── QUICKSTART.md                # This file
├── API_SUMMARY.md               # API summary
├── beeSuite.postman_collection.json  # Main collection (references all services)
├── individual_collections/      # Individual service collections
└── consolidated/                # Consolidated collection and tools
```

## Installation

### Option 1: Using Individual Collections

1. **Import Individual Collections**
   - Open Postman
   - Click "Import" button
   - Select individual collection files from `individual_collections/`

2. **Import the Environment**
   - Click "Import" button again
   - Select `individual_collections/beeSuite-Development.postman_environment.json`

3. **Select the Environment**
   - In Postman, select "beeSuite Development" from the environment dropdown

### Option 2: Using the Consolidated Collection

1. **Import the Consolidated Collection**
   - Open Postman
   - Click "Import" button
   - Select `consolidated/beeSuite-Consolidated.postman_collection.json`

2. **Import the Environment**
   - Click "Import" button again
   - Select `consolidated/beeSuite-Consolidated.postman_environment.json`

3. **Select the Environment**
   - In Postman, select "beeSuite Consolidated" from the environment dropdown

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
