// Consolidated Authentication Folder
// Contains authentication requests for all services

// eLeave Core Authentication
const eleaveCoreAuth = {
    "name": "eLeave Core - Authentication",
    "item": [
        {
            "name": "Login",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"admin@example.com\",\n    \"password\": \"password\"\n}"
                },
                "url": {
                    "raw": "{{eleave_core_url}}/api/auth/login",
                    "host": ["{{eleave_core_url}}"],
                    "path": ["api", "auth", "login"]
                },
                "description": "Login to eLeave Core system",
                "script": {
                    "id": "eleave-core-login-script",
                    "type": "text",
                    "exec": [
                        "if (pm.response.successful) {",
                        "    var response = pm.response.json();",
                        "    if (response.access_token) {",
                        "        pm.environment.set('access_token', response.access_token);",
                        "        console.log('eLeave Core Login successful. Token:', response.access_token);",
                        "    } else {",
                        "        console.log('Login failed. No token received.');",
                        "    }",
                        "} else {",
                        "    console.log('Login failed. Status:', pm.response.code);",
                        "}"
                    ]
                }
            }
        },
        {
            "name": "Forgot Password",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"user@example.com\"\n}"
                },
                "url": {
                    "raw": "{{eleave_core_url}}/api/forgot-password",
                    "host": ["{{eleave_core_url}}"],
                    "path": ["api", "forgot-password"]
                },
                "description": "Request password reset for eLeave Core"
            }
        },
        {
            "name": "Accept Invitation",
            "request": {
                "method": "GET",
                "url": {
                    "raw": "{{eleave_core_url}}/api/invitation/:token",
                    "host": ["{{eleave_core_url}}"],
                    "path": ["api", "invitation", ":token"],
                    "variable": [
                        {
                            "key": "token",
                            "value": "invitation-token-here"
                        }
                    ]
                },
                "description": "Accept invitation sent by admin"
            }
        },
        {
            "name": "Set New Password",
            "request": {
                "method": "PATCH",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"id\": \"user-guid-here\",\n    \"password\": \"new-password\"\n}"
                },
                "url": {
                    "raw": "{{eleave_core_url}}/api/invitation",
                    "host": ["{{eleave_core_url}}"],
                    "path": ["api", "invitation"]
                },
                "description": "Set password for new user"
            }
        }
    ],
    "description": "eLeave Core Authentication endpoints"
};

// eLeave Tenant Authentication
const eleaveTenantAuth = {
    "name": "eLeave Tenant - Authentication",
    "item": [
        {
            "name": "Login Local",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"tenant@example.com\",\n    \"password\": \"password\"\n}"
                },
                "url": {
                    "raw": "{{eleave_tenant_url}}/api/auth/login/local",
                    "host": ["{{eleave_tenant_url}}"],
                    "path": ["api", "auth", "login", "local"]
                },
                "description": "Login to eLeave Tenant with local database",
                "script": {
                    "id": "eleave-tenant-login-script",
                    "type": "text",
                    "exec": [
                        "if (pm.response.successful) {",
                        "    var response = pm.response.json();",
                        "    if (response.access_token) {",
                        "        pm.environment.set('access_token', response.access_token);",
                        "        console.log('eLeave Tenant Login successful. Token:', response.access_token);",
                        "    }",
                        "}"
                    ]
                }
            }
        },
        {
            "name": "Login AD",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"tenant@example.com\",\n    \"password\": \"password\"\n}"
                },
                "url": {
                    "raw": "{{eleave_tenant_url}}/api/auth/login/ad",
                    "host": ["{{eleave_tenant_url}}"],
                    "path": ["api", "auth", "login", "ad"]
                },
                "description": "Login to eLeave Tenant with Active Directory",
                "script": {
                    "id": "eleave-tenant-ad-login-script",
                    "type": "text",
                    "exec": [
                        "if (pm.response.successful) {",
                        "    var response = pm.response.json();",
                        "    if (response.access_token) {",
                        "        pm.environment.set('access_token', response.access_token);",
                        "        console.log('eLeave Tenant AD Login successful. Token:', response.access_token);",
                        "    }",
                        "}"
                    ]
                }
            }
        },
        {
            "name": "Forgot Password",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"tenant@example.com\"\n}"
                },
                "url": {
                    "raw": "{{eleave_tenant_url}}/api/admin/forgot-password",
                    "host": ["{{eleave_tenant_url}}"],
                    "path": ["api", "admin", "forgot-password"]
                },
                "description": "Request password reset for eLeave Tenant"
            }
        }
    ],
    "description": "eLeave Tenant Authentication endpoints"
};

// beeWhere Authentication
const beewhereAuth = {
    "name": "beeWhere - Authentication",
    "item": [
        {
            "name": "Login",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"admin@example.com\",\n    \"password\": \"password\"\n}"
                },
                "url": {
                    "raw": "{{beewhere_url}}/api/auth/login",
                    "host": ["{{beewhere_url}}"],
                    "path": ["api", "auth", "login"]
                },
                "description": "Login to beeWhere system",
                "script": {
                    "id": "beewhere-login-script",
                    "type": "text",
                    "exec": [
                        "if (pm.response.successful) {",
                        "    var response = pm.response.json();",
                        "    if (response.access_token) {",
                        "        pm.environment.set('access_token', response.access_token);",
                        "        console.log('beeWhere Login successful. Token:', response.access_token);",
                        "    }",
                        "}"
                    ]
                }
            }
        }
    ],
    "description": "beeWhere Authentication endpoints"
};

// eLeave Login Authentication
const eleaveLoginAuth = {
    "name": "eLeave Login - Authentication",
    "item": [
        {
            "name": "Login Local",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"user@example.com\",\n    \"password\": \"password\"\n}"
                },
                "url": {
                    "raw": "{{eleave_login_url}}/api/auth/login/local",
                    "host": ["{{eleave_login_url}}"],
                    "path": ["api", "auth", "login", "local"]
                },
                "description": "Login with local database authentication",
                "script": {
                    "id": "eleave-login-local-script",
                    "type": "text",
                    "exec": [
                        "if (pm.response.successful) {",
                        "    var response = pm.response.json();",
                        "    if (response.access_token) {",
                        "        pm.environment.set('access_token', response.access_token);",
                        "        console.log('eLeave Login Local successful. Token:', response.access_token);",
                        "    }",
                        "}"
                    ]
                }
            }
        },
        {
            "name": "Login AD",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"user@example.com\",\n    \"password\": \"password\"\n}"
                },
                "url": {
                    "raw": "{{eleave_login_url}}/api/auth/login/ad",
                    "host": ["{{eleave_login_url}}"],
                    "path": ["api", "auth", "login", "ad"]
                },
                "description": "Login with Active Directory authentication",
                "script": {
                    "id": "eleave-login-ad-script",
                    "type": "text",
                    "exec": [
                        "if (pm.response.successful) {",
                        "    var response = pm.response.json();",
                        "    if (response.access_token) {",
                        "        pm.environment.set('access_token', response.access_token);",
                        "        console.log('eLeave Login AD successful. Token:', response.access_token);",
                        "    }",
                        "}"
                    ]
                }
            }
        },
        {
            "name": "Login Email",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"user@example.com\",\n    \"password\": \"password\"\n}"
                },
                "url": {
                    "raw": "{{eleave_login_url}}/api/auth/login/email",
                    "host": ["{{eleave_login_url}}"],
                    "path": ["api", "auth", "login", "email"]
                },
                "description": "Login with email authentication",
                "script": {
                    "id": "eleave-login-email-script",
                    "type": "text",
                    "exec": [
                        "if (pm.response.successful) {",
                        "    var response = pm.response.json();",
                        "    if (response.access_token) {",
                        "        pm.environment.set('access_token', response.access_token);",
                        "        console.log('eLeave Login Email successful. Token:', response.access_token);",
                        "    }",
                        "}"
                    ]
                }
            }
        },
        {
            "name": "Login AD Extended",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"email\": \"user@example.com\",\n    \"password\": \"password\"\n}"
                },
                "url": {
                    "raw": "{{eleave_login_url}}/api/auth/login/ad-extend",
                    "host": ["{{eleave_login_url}}"],
                    "path": ["api", "auth", "login", "ad-extend"]
                },
                "description": "Login with extended Active Directory authentication",
                "script": {
                    "id": "eleave-login-ad-extend-script",
                    "type": "text",
                    "exec": [
                        "if (pm.response.successful) {",
                        "    var response = pm.response.json();",
                        "    if (response.access_token) {",
                        "        pm.environment.set('access_token', response.access_token);",
                        "        console.log('eLeave Login AD Extended successful. Token:', response.access_token);",
                        "    }",
                        "}"
                    ]
                }
            }
        }
    ],
    "description": "eLeave Login Authentication endpoints"
};

// Export all authentication folders
module.exports = {
    eleaveCoreAuth,
    eleaveTenantAuth,
    beewhereAuth,
    eleaveLoginAuth
};
