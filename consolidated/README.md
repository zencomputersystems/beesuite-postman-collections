# beeSuite Consolidated Postman Collection

This directory contains the consolidated Postman collection for all beeSuite services.

## Overview

The consolidated collection combines all API endpoints from the following services:

| Service | Port | Description |
|---------|------|-------------|
| eLeave Core | 3000 | Leave Management System |
| eLeave Tenant | 3001 | Multi-tenant Management |
| beeWhere | 3002 | Attendance & Workforce |
| eLeave Login | 3003 | Authentication Service |
| Beescheduler | 3004 | Scheduling System |
| eLeave WooCommerce | 3005 | WooCommerce Integration |

## Files

- `beeSuite-Consolidated.postman_collection.json` - Main consolidated collection
- `beeSuite-Consolidated.postman_environment.json` - Environment configuration
- `combine.py` - Python script to regenerate the collection
- `combine.sh` - Bash script to regenerate the collection

## Usage

### Import into Postman

1. Open Postman
2. Click "Import" button
3. Select `beeSuite-Consolidated.postman_collection.json`
4. Click "Import" again and select `beeSuite-Consolidated.postman_environment.json`

### Configure Environment

1. In Postman, select "beeSuite Consolidated" from the environment dropdown
2. Update the `access_token` variable with your JWT token (get this from the Login endpoint)

### Get Authentication Token

1. Navigate to **eLeave Core - Authentication → Login**
2. Update the request body with your credentials:
   ```json
   {
       "email": "admin@example.com",
       "password": "password"
   }
   ```
3. Click "Send"
4. The access token will be automatically extracted and stored in the environment variable

### Use the Collection

All endpoints are organized by service and category. The collection includes:

- **Pre-request Scripts**: Automatically encode passwords with base64
- **Post-response Scripts**: Automatically extract and store access tokens from login responses
- **Environment Variables**: Service-specific URLs for easy switching

## Regenerating the Collection

To regenerate the consolidated collection from the source files:

```bash
# Using Python
python3 combine.py

# Using Bash
./combine.sh
```

## Pre-request Scripts

The collection includes the following pre-request scripts:

1. **Collection-level**: Sets base URL and encodes passwords with base64
2. **Authentication endpoints**: Extracts and stores access tokens from login responses

## Post-response Scripts

The collection includes the following post-response scripts:

1. **Collection-level**: Validates response time and success status
2. **Authentication endpoints**: Extracts and stores access tokens from login responses

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `base_url` | http://localhost:3000 | Default API base URL |
| `access_token` | (empty) | JWT token for authenticated requests |
| `eleave_core_url` | http://localhost:3000 | eLeave Core API URL |
| `eleave_tenant_url` | http://localhost:3001 | eLeave Tenant API URL |
| `beewhere_url` | http://localhost:3002 | beeWhere API URL |
| `eleave_login_url` | http://localhost:3003 | eLeave Login API URL |
| `beescheduler_url` | http://localhost:3004 | Beescheduler API URL |
| `eleave_woocommerce_url` | http://localhost:3005 | eLeave WooCommerce API URL |
| `password` | password | Password for authentication |
| `aes_key` | secret key 122 | AES encryption key |
| `aes_encrypted` | (empty) | Encrypted value for testing |
| `aes_decrypted` | (empty) | Decrypted value for testing |

## Notes

- The collection uses service-specific URLs (e.g., `{{eleave_core_url}}`) instead of a single `{{base_url}}` to allow testing across multiple services
- Passwords are automatically encoded with base64 before sending requests
- Access tokens are automatically extracted from login responses and stored in the environment
- All authenticated endpoints use the `Authorization: Bearer {{access_token}}` header
