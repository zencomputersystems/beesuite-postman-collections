# Consolidated Postman Collection - Summary

## Overview

This document summarizes the consolidated Postman collection created for the beeSuite project.

## Files Created

### Main Files
- `beeSuite-Consolidated.postman_collection.json` - Main consolidated collection (35KB, 820 lines)
- `beeSuite-Consolidated.postman_environment.json` - Environment configuration

### Supporting Files
- `combine.py` - Python script to regenerate the collection
- `combine.sh` - Bash script to regenerate the collection
- `README.md` - Usage documentation

## Collection Structure

### Total Folders: 61
### Total Authentication Endpoints: 12 (with scripts)

#### Authentication Folders (with scripts)
1. **eLeave Core - Authentication** (4 requests)
   - Login (with token extraction script)
   - Forgot Password
   - Accept Invitation
   - Set New Password

2. **eLeave Tenant - Authentication** (3 requests)
   - Login Local (with token extraction script)
   - Login AD (with token extraction script)
   - Forgot Password

3. **beeWhere - Authentication** (1 request)
   - Login (with token extraction script)

4. **eLeave Login - Authentication** (4 requests)
   - Login Local (with token extraction script)
   - Login AD (with token extraction script)
   - Login Email (with token extraction script)
   - Login AD Extended (with token extraction script)

#### Placeholder Folders (57)
All other service folders are included as placeholders with descriptions pointing to the source files.

## Scripts Included

### Pre-request Scripts

1. **Collection-level Pre-request Script**
   - Sets base URL from environment if not already set
   - Encodes passwords with base64 if present in request body

2. **Authentication Endpoint Scripts**
   - Extracts access token from login responses
   - Stores token in environment variable
   - Logs success/failure messages

### Post-response Scripts

1. **Collection-level Test Script**
   - Validates response time is reasonable (< 10 seconds)
   - Checks for successful response status

2. **Authentication Endpoint Scripts**
   - Extracts and stores access tokens
   - Logs token information

## Environment Variables

| Variable | Default | Description |
|--|--|--|
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

## Usage

### Import into Postman
1. Open Postman
2. Import `beeSuite-Consolidated.postman_collection.json`
3. Import `beeSuite-Consolidated.postman_environment.json`
4. Select the environment from the dropdown

### Get Authentication Token
1. Navigate to **eLeave Core - Authentication → Login**
2. Update the request body with your credentials
3. Click "Send"
4. The access token will be automatically extracted and stored

### Switch Between Services
Use the environment variables to switch between services:
- `{{eleave_core_url}}` for eLeave Core (port 3000)
- `{{eleave_tenant_url}}` for eLeave Tenant (port 3001)
- `{{beewhere_url}}` for beeWhere (port 3002)
- `{{eleave_login_url}}` for eLeave Login (port 3003)
- `{{beescheduler_url}}` for Beescheduler (port 3004)
- `{{eleave_woocommerce_url}}` for eLeave WooCommerce (port 3005)

## Regenerating the Collection

To regenerate the consolidated collection:

```bash
# Using Python
python3 combine.py

# Using Bash
./combine.sh
```

## Notes

- The collection uses service-specific URLs instead of a single `{{base_url}}` to allow testing across multiple services
- Passwords are automatically encoded with base64 before sending requests
- Access tokens are automatically extracted from login responses and stored in the environment
- All authenticated endpoints use the `Authorization: Bearer {{access_token}}` header
- The collection is designed to be imported into Postman and used with the environment file
