# beeSuite Postman API Collections

This directory contains Postman API collections for the beeSuite project.

## Directory Structure

```
beesuite-postman-collections/
├── README.md                    # This file
├── QUICKSTART.md                # Quick start guide
├── API_SUMMARY.md               # API summary documentation
├── beeSuite.postman_collection.json  # Main collection (references all services)
├── individual_collections/      # Individual service collections
│   ├── eLeaveCore.postman_collection.json
│   ├── eLeaveTenantCore.postman_collection.json
│   ├── beeWhereCore.postman_collection.json
│   ├── eLeaveLoginCore.postman_collection.json
│   ├── beeschedulerCore.postman_collection.json
│   ├── eLeaveWoocommerceCore.postman_collection.json
│   └── beeSuite-Development.postman_environment.json
└── consolidated/                # Consolidated collection and tools
    ├── README.md                # Consolidated collection documentation
    ├── SUMMARY.md               # Consolidated collection summary
    ├── beeSuite-Consolidated.postman_collection.json
    ├── beeSuite-Consolidated.postman_environment.json
    ├── combine.py               # Script to regenerate consolidated collection
    └── combine.sh               # Script to regenerate consolidated collection
```

## Overview

The beeSuite project consists of multiple backend services, each with its own API. This Postman collection provides comprehensive API documentation and testing capabilities for all services.

## Available Collections

### Individual Collections (in `individual_collections/`)

Each service has its own dedicated collection file:

| Service | Port | Collection File |
|---------|------|-----------------|
| eLeave Core | 3000 | `eLeaveCore.postman_collection.json` |
| eLeave Tenant | 3001 | `eLeaveTenantCore.postman_collection.json` |
| beeWhere | 3002 | `beeWhereCore.postman_collection.json` |
| eLeave Login | 3003 | `eLeaveLoginCore.postman_collection.json` |
| Beescheduler | 3004 | `beeschedulerCore.postman_collection.json` |
| eLeave WooCommerce | 3005 | `eLeaveWoocommerceCore.postman_collection.json` |

### Consolidated Collection (in `consolidated/`)

For a unified collection with all endpoints:

| File | Description |
|------|-------------|
| `beeSuite-Consolidated.postman_collection.json` | Single collection with all endpoints |
| `beeSuite-Consolidated.postman_environment.json` | Environment with all service URLs |

See `consolidated/README.md` for more details.

## Quick Start

### Using Individual Collections

1. Open Postman
2. Import individual collection files from `individual_collections/`
3. Import `beeSuite-Development.postman_environment.json`
4. Select the environment and start testing

### Using the Consolidated Collection

1. Open Postman
2. Import `consolidated/beeSuite-Consolidated.postman_collection.json`
3. Import `consolidated/beeSuite-Consolidated.postman_environment.json`
4. Select the environment and start testing

See `consolidated/README.md` for more details.

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
