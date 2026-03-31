const fs = require('fs');
const path = require('path');

// Load the Postman collection
const collectionPath = path.join(__dirname, 'beeSuite Updated API Collection.postman_collection.json');
const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));

console.log('Loaded collection with', collection.item.length, 'main items');

// Define available endpoints from API documentation
const availableEndpoints = new Map();

// Helper to add endpoint
function addEndpoint(method, path, desc) {
    const key = `${method}:${path}`;
    availableEndpoints.set(key, { method, path, desc });
}

// Commerce Core (WooCommerce) endpoints
const commerceEndpoints = [
    { path: '/coupons', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/customers', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/orders', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/order-notes', methods: ['GET', 'POST', 'DELETE'] },
    { path: '/refunds', methods: ['GET', 'POST', 'DELETE'] },
    { path: '/products', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/product-variations', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/product-attributes', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/product-attribute-term', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/product-category', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/product-shipping-class', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/product-tag', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/report', methods: ['GET'] },
    { path: '/report/sales', methods: ['GET'] },
    { path: '/report/top-seller', methods: ['GET'] },
    { path: '/report/coupons-total', methods: ['GET'] },
    { path: '/report/customers-total', methods: ['GET'] },
    { path: '/report/orders-total', methods: ['GET'] },
    { path: '/report/products-total', methods: ['GET'] },
    { path: '/report/reviews-total', methods: ['GET'] },
    { path: '/tax-rate', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/tax-class', methods: ['GET', 'POST', 'DELETE'] },
    { path: '/setting', methods: ['GET'] },
    { path: '/setting-option', methods: ['GET', 'PATCH'] },
    { path: '/payment-gateway', methods: ['GET', 'PATCH'] },
    { path: '/shipping-zone', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/shipping-zone-location', methods: ['GET', 'PATCH'] },
    { path: '/shipping-zone-method', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/shipping-method', methods: ['GET'] },
    { path: '/system-status', methods: ['GET'] },
    { path: '/system-status-tool', methods: ['GET', 'PATCH'] },
    { path: '/data', methods: ['GET'] },
    { path: '/data/continent', methods: ['GET'] },
    { path: '/data/country', methods: ['GET'] },
    { path: '/data/currency', methods: ['GET'] },
    { path: '/data/currency/current', methods: ['GET'] },
    { path: '/subscription', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/subscription-order', methods: ['GET'] },
    { path: '/subscription-note', methods: ['GET', 'POST', 'DELETE'] }
];

// Password Reset endpoints
const passwordResetEndpoints = [
    { path: '/', methods: ['GET'] },
    { path: '/api/forgot-password', methods: ['PATCH', 'POST'] }
];

// AMS (Attendance) endpoints
const amsEndpoints = [
    { path: '/admin/attendance/attendance-profile', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/admin/attendance/user-attendance', methods: ['PATCH'] },
    { path: '/admin/attendance/user', methods: ['GET'] },
    { path: '/admin/attendance/user/{userId}', methods: ['GET'] },
    { path: '/clock', methods: ['GET', 'POST', 'PATCH'] },
    { path: '/clock/beewhere/latest', methods: ['GET'] },
    { path: '/clock/clockIn-old', methods: ['POST'] },
    { path: '/clock/transaction', methods: ['POST'] },
    { path: '/clock/clockout', methods: ['POST'] },
    { path: '/clock/{clockId}', methods: ['GET'] },
    { path: '/clock/activity', methods: ['PATCH'] },
    { path: '/clock/activity/{clockId}', methods: ['GET'] },
    { path: '/clock/history/{type}/{startdate}/{enddate}', methods: ['GET'] },
    { path: '/clock/history-list/{limit}/{page}', methods: ['GET'] },
    { path: '/clock/history-list/{limit}/{page}/{type}', methods: ['GET'] },
    { path: '/clock/history-list/lastest', methods: ['GET'] },
    { path: '/admin/import-clock/csv/old', methods: ['POST'] },
    { path: '/admin/import-clock/csv', methods: ['POST'] },
    { path: '/admin/import-clock/attendance-upload-log', methods: ['GET'] },
    { path: '/client', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/client/{type}', methods: ['GET'] },
    { path: '/client/coordinate/{latitude}/{longitude}', methods: ['GET'] },
    { path: '/client/{clientId}', methods: ['DELETE'] },
    { path: '/client/bundle', methods: ['PATCH'] },
    { path: '/contract', methods: ['GET', 'POST', 'PATCH'] },
    { path: '/contract/{clientid}', methods: ['GET'] },
    { path: '/login-log', methods: ['GET', 'POST', 'PATCH'] },
    { path: '/login-log/{id}', methods: ['GET'] },
    { path: '/location', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/location/{clientid}', methods: ['GET'] },
    { path: '/location/search/{input}', methods: ['GET'] },
    { path: '/location/search/{type}/{input}', methods: ['GET'] },
    { path: '/location/csv', methods: ['POST'] },
    { path: '/map/search', methods: ['GET'] },
    { path: '/map/suggest', methods: ['GET'] },
    { path: '/project', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/project/{clientid}', methods: ['GET'] },
    { path: '/report/attendance', methods: ['POST'] },
    { path: '/report/activity/{startdate}/{enddate}/{category}/{input}', methods: ['GET'] },
    { path: '/support', methods: ['GET', 'POST'] },
    { path: '/support/module/{module}', methods: ['GET'] },
    { path: '/support/request', methods: ['GET'] },
    { path: '/support/list', methods: ['GET'] },
    { path: '/support/employee', methods: ['GET'] },
    { path: '/support/clarification', methods: ['POST'] },
    { path: '/support/admin/clarification', methods: ['POST'] },
    { path: '/support/{supportId}', methods: ['GET'] },
    { path: '/overtime/cycle', methods: ['GET'] },
    { path: '/overtime/history', methods: ['POST'] },
    { path: '/user-info', methods: ['GET'] }
];

// Tenant endpoints
const tenantEndpoints = [
    { path: '/', methods: ['GET'] },
    { path: '/api/admin/sync-data/testsync', methods: ['POST'] },
    { path: '/api/admin/sync-data/testsyncsubscription', methods: ['POST'] },
    { path: '/api/admin/sync-data/sync-subscription-create', methods: ['POST'] },
    { path: '/api/admin/sync-data/sync-subscription-update', methods: ['POST'] },
    { path: '/api/admin/sync-data/resend-mail', methods: ['POST'] },
    { path: '/api/admin/user-manage/personal-detail', methods: ['GET'] },
    { path: '/api/admin/user-manage/{role}', methods: ['GET'] },
    { path: '/api/admin/user-manage/sign-up', methods: ['POST'] },
    { path: '/api/admin/user-manage/user-main', methods: ['PATCH'] },
    { path: '/api/admin/customer', methods: ['GET', 'POST', 'PATCH'] },
    { path: '/api/admin/customer/woocommerce', methods: ['GET'] },
    { path: '/api/admin/subscription', methods: ['GET', 'POST', 'PATCH'] },
    { path: '/api/admin/subscription/{item}/{subs_id}', methods: ['GET'] },
    { path: '/api/admin/activity-log', methods: ['GET', 'POST'] },
    { path: '/api/admin/activity-log/{id}', methods: ['GET'] },
    { path: '/api/admin/dashboard/{period}', methods: ['GET'] },
    { path: '/support', methods: ['GET', 'POST'] },
    { path: '/support/clarification', methods: ['POST'] },
    { path: '/support/admin/clarification', methods: ['POST'] },
    { path: '/support/{supportId}', methods: ['GET'] },
    { path: '/resync-subscription', methods: ['POST'] },
    { path: '/resync-subscription/{customer_id}', methods: ['POST'] }
];

// App Core (eLeave Core) endpoints
const appCoreEndpoints = [
    { path: '/', methods: ['GET'] },
    { path: '/api/auth/login', methods: ['POST'] },
    { path: '/api/auth/login/ad', methods: ['POST'] },
    { path: '/api/auth/login/email', methods: ['POST'] },
    { path: '/api/test-calculation/{entitlementId}', methods: ['POST'] },
    { path: '/api/forgot-password/{email}', methods: ['POST'] },
    { path: '/api/change-password/execute', methods: ['POST'] },
    { path: '/api/azure/upload', methods: ['POST'] },
    { path: '/api/invitation/{token}', methods: ['GET'] },
    { path: '/api/invitation', methods: ['PATCH', 'POST'] },
    { path: '/api/invitation/sent', methods: ['POST'] },
    { path: '/api/userimport', methods: ['POST'] },
    { path: '/api/userimport/csv', methods: ['POST'] },
    { path: '/api/company', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/api/company/year-end', methods: ['GET'] },
    { path: '/api/company/{id}', methods: ['GET', 'DELETE'] },
    { path: '/api/company/{name}', methods: ['POST'] },
    { path: '/api/leave/policy', methods: ['POST'] },
    { path: '/api/leave/manager-list', methods: ['GET'] },
    { path: '/api/leave/apply-on-behalf/role/staffs', methods: ['GET'] },
    { path: '/api/leave/apply', methods: ['POST'] },
    { path: '/api/leave/applyleave', methods: ['POST'] },
    { path: '/api/leave/apply-on-behalf', methods: ['POST'] },
    { path: '/api/admin/announcement', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/api/admin/approval-override', methods: ['GET', 'PATCH'] },
    { path: '/api/admin/approval-override/role/list', methods: ['GET'] },
    { path: '/api/admin/approval-override/company/{id}', methods: ['GET'] },
    { path: '/api/admin/approval-override/{id}', methods: ['GET'] },
    { path: '/api/admin/company', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/api/admin/company/year-end', methods: ['GET'] },
    { path: '/api/admin/company/{id}', methods: ['GET', 'DELETE'] },
    { path: '/api/admin/company/{name}', methods: ['POST'] },
    { path: '/api/admin/dashboard/{item}', methods: ['GET'] },
    { path: '/api/default-profile/{tenantId}', methods: ['POST'] },
    { path: '/api/default-profile/{tenantId}/{userId}', methods: ['POST'] },
    { path: '/api/default-profile/{tenantId}/{companyName}/{userId}', methods: ['POST'] },
    { path: '/api/admin/general-leave-policy', methods: ['GET', 'POST', 'PATCH'] },
    { path: '/api/admin/general-leave-policy/{id}', methods: ['GET'] },
    { path: '/api/admin/general-leave-policy/resync/{companyPolicyId}', methods: ['PATCH'] },
    { path: '/api/admin/holiday/calendar', methods: ['GET'] },
    { path: '/api/admin/holiday/calendar-profile', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/api/admin/holiday/calendar-profile/current-year', methods: ['GET'] },
    { path: '/api/admin/holiday/calendar-profile/{id}', methods: ['DELETE'] },
    { path: '/api/admin/holiday/calendar-profile/days/{id}/{year}', methods: ['GET'] },
    { path: '/api/admin/holiday/calendar-profile/users/{id}', methods: ['GET'] },
    { path: '/api/admin/holiday/calendar-profile/user-calendar', methods: ['PATCH'] },
    { path: '/api/admin/leave-adjustment', methods: ['PATCH'] },
    { path: '/api/admin/leavetype', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/api/admin/leavetype/{id}', methods: ['GET', 'DELETE'] },
    { path: '/api/leavetype-entitlement', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/api/leavetype-entitlement/active/list', methods: ['GET'] },
    { path: '/api/leavetype-entitlement/{id}', methods: ['GET', 'DELETE'] },
    { path: '/api/leave-entitlement', methods: ['GET', 'POST'] },
    { path: '/api/leave-entitlement/{id}', methods: ['GET'] },
    { path: '/api/leave-entitlement/replacement', methods: ['POST'] },
    { path: '/api/leave-entitlement/entitlement-claim', methods: ['POST'] },
    { path: '/api/leave-entitlement/{userID}/{entitlementID}', methods: ['DELETE'] },
    { path: '/api/admin/master/{item}', methods: ['GET', 'PATCH'] },
    { path: '/api/admin/overtime/entitlement', methods: ['PATCH'] },
    { path: '/api/admin/overtime/month-year', methods: ['GET'] },
    { path: '/api/admin/overtime/policy/{id}', methods: ['GET'] },
    { path: '/api/admin/overtime/policy/access-level/list', methods: ['GET'] },
    { path: '/api/admin/overtime/policy/access-level/role', methods: ['GET'] },
    { path: '/api/admin/overtime/policy', methods: ['POST', 'PATCH'] },
    { path: '/api/admin/overtime/rate/{id}', methods: ['GET'] },
    { path: '/api/admin/overtime/rate', methods: ['POST', 'PATCH'] },
    { path: '/api/admin/overtime/rate-setting/{id}', methods: ['GET'] },
    { path: '/api/admin/overtime/rate-setting', methods: ['POST', 'PATCH', 'DELETE'] },
    { path: '/api/admin/overtime/claim-transaction', methods: ['POST'] },
    { path: '/api/admin/profile-default', methods: ['GET', 'POST'] },
    { path: '/api/admin/profile-default/{profile}/{id}', methods: ['POST'] },
    { path: '/api/admin/report/{reporttype}/{id}/{startdate}/{enddate}', methods: ['GET'] },
    { path: '/api/admin/report/{reporttype}/{startdate}/{enddate}', methods: ['GET'] },
    { path: '/api/admin/report', methods: ['POST'] },
    { path: '/api/admin/role/role-profile', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/api/admin/role/role-profile/{id}', methods: ['DELETE'] },
    { path: '/api/admin/role/role-profile/users/{id}', methods: ['GET'] },
    { path: '/api/admin/role/{id}', methods: ['GET'] },
    { path: '/api/admin/role/user-role', methods: ['PATCH'] },
    { path: '/api/admin/soc', methods: ['GET', 'POST'] },
    { path: '/api/admin/soc/list', methods: ['GET'] },
    { path: '/api/admin/staff-list', methods: ['GET'] },
    { path: '/api/admin/staff-list/directory', methods: ['GET'] },
    { path: '/api/admin/user-info-details/activate/{id}', methods: ['POST'] },
    { path: '/api/admin/user-info-details/recent-staff-id/{id}', methods: ['GET'] },
    { path: '/api/admin/user-info-details/{item}', methods: ['GET'] },
    { path: '/api/admin/user-info-details/{item}/{id}', methods: ['GET'] },
    { path: '/api/admin/user-info-details/all/{id}', methods: ['PATCH'] },
    { path: '/api/admin/user-info-details/employment/{id}', methods: ['PATCH'] },
    { path: '/api/admin/user-info-details/personal/{id}', methods: ['PATCH'] },
    { path: '/api/admin/user-info-details/notification-rule/{id}', methods: ['PATCH'] },
    { path: '/api/admin/working-hours/working-hours-profile', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    { path: '/api/admin/working-hours/working-hours-profile/{id}', methods: ['GET'] },
    { path: '/api/admin/working-hours/working-hours-profile/users/{id}', methods: ['GET'] },
    { path: '/api/admin/working-hours/{id}', methods: ['GET'] },
    { path: '/api/admin/working-hours/user-working-hours', methods: ['PATCH'] },
    { path: '/api/admin/year-end-closing/{year}', methods: ['POST'] },
    { path: '/api/admin/year-end-closing/{year}/{companyid}', methods: ['POST'] }
];

// Add all endpoints
[...commerceEndpoints, ...passwordResetEndpoints, ...amsEndpoints, ...tenantEndpoints, ...appCoreEndpoints].forEach(endpoint => {
    endpoint.methods.forEach(method => {
        addEndpoint(method, endpoint.path, endpoint.desc || '');
    });
});

console.log('Loaded', availableEndpoints.size, 'available endpoints from API documentation');

// Helper to get path from Postman request
function getPathFromRequest(request) {
    if (request.url && request.url.path && Array.isArray(request.url.path)) {
        return '/' + request.url.path.join('/');
    }
    return null;
}

// Collect existing endpoints from collection
const existingEndpoints = new Set();
const removedRequests = [];
const addedRequests = [];

function collectExistingEndpoints(items) {
    for (const item of items) {
        if (item.request && item.request.url && item.request.url.path) {
            const path = getPathFromRequest(item.request);
            const method = item.request.method;
            if (path) {
                existingEndpoints.add(`${method}:${path}`);
            }
        } else if (item.item) {
            collectExistingEndpoints(item.item);
        }
    }
}

collectExistingEndpoints(collection.item);
console.log('Found', existingEndpoints.size, 'existing endpoints in collection');

// Recursive function to process requests
function processRequests(items, folderName) {
    const filteredItems = [];
    
    for (const item of items) {
        if (item.request && item.request.url && item.request.url.path) {
            const path = getPathFromRequest(item.request);
            const method = item.request.method;
            const key = `${method}:${path}`;
            
            if (availableEndpoints.has(key)) {
                filteredItems.push(item);
            } else {
                removedRequests.push({
                    folder: folderName,
                    request: item.name,
                    method,
                    path
                });
            }
        } else if (item.item) {
            const subFolderName = item.name;
            item.item = processRequests(item.item, subFolderName);
            
            // Only keep folders that have requests
            if (item.item.length > 0) {
                filteredItems.push(item);
            }
        }
    }
    
    return filteredItems;
}

// Process each top-level folder
for (const folder of collection.item) {
    console.log('\nProcessing folder:', folder.name);
    folder.item = processRequests(folder.item, folder.name);
}

// Find and add missing endpoints
console.log('\n\nChecking for missing endpoints to add...');
for (const [key, endpoint] of availableEndpoints) {
    if (!existingEndpoints.has(key)) {
        addedRequests.push(endpoint);
    }
}

console.log('\nFiltering complete!');
console.log('Removed', removedRequests.length, 'requests');
console.log('Added', addedRequests.length, 'missing endpoints');

// Save filtered collection
const filteredCollectionPath = path.join(__dirname, 'beeSuite Filtered Collection.postman_collection.json');
fs.writeFileSync(filteredCollectionPath, JSON.stringify(collection, null, 4));

console.log('\nFiltered collection saved to:', filteredCollectionPath);

// Show summary
if (removedRequests.length > 0) {
    console.log('\nRemoved requests summary:');
    removedRequests.forEach(req => {
        console.log(`  ${req.method} ${req.path} (${req.request})`);
    });
}

if (addedRequests.length > 0) {
    console.log('\nAdded requests summary:');
    addedRequests.forEach(req => {
        console.log(`  ${req.method} ${req.path} - ${req.desc}`);
    });
}
