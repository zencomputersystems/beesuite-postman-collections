#!/usr/bin/env python3
"""
Script to combine consolidated Postman collection chunks into a single file
Usage: python combine.py
"""

import json
import os
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
OUTPUT_DIR = SCRIPT_DIR
OUTPUT_FILE = OUTPUT_DIR / "beeSuite-Consolidated.postman_collection.json"

def load_json_file(filepath):
    """Load and parse a JSON file."""
    with open(filepath, 'r') as f:
        return json.load(f)

def load_json_from_js(filepath):
    """Extract JSON from a JavaScript file."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Find the JSON object in the JavaScript file
    # This is a simple approach - in production, use a proper parser
    start = content.find('{')
    if start == -1:
        raise ValueError("No JSON object found in file")
    
    # Count braces to find the end
    brace_count = 0
    end = start
    for i, char in enumerate(content[start:], start):
        if char == '{':
            brace_count += 1
        elif char == '}':
            brace_count -= 1
            if brace_count == 0:
                end = i + 1
                break
    
    json_str = content[start:end]
    return json.loads(json_str)

def main():
    print("Starting consolidation of Postman collection...")
    
    # Load header
    header = load_json_file(OUTPUT_DIR / "_collection_header.json")
    
    # Create the consolidated collection
    collection = {
        "info": header["info"],
        "variable": header["variable"],
        "event": header["event"],
        "item": []
    }
    
    # Add authentication folders
    print("Adding authentication folders...")
    
    # Load auth data from JS file
    with open(OUTPUT_DIR / "_collection_auth.js", 'r') as f:
        auth_content = f.read()
    
    # Extract each auth folder manually
    auth_folders = [
        ("eleaveCoreAuth", "eLeave Core - Authentication", "Import from: eLeaveCore.postman_collection.json - Authentication"),
        ("eleaveTenantAuth", "eLeave Tenant - Authentication", "Import from: eLeaveTenantCore.postman_collection.json - Authentication"),
        ("beewhereAuth", "beeWhere - Authentication", "Import from: beeWhereCore.postman_collection.json - Authentication"),
        ("eleaveLoginAuth", "eLeave Login - Authentication", "Import from: eLeaveLoginCore.postman_collection.json - Authentication"),
    ]
    
    for var_name, folder_name, description in auth_folders:
        # Find the variable in the JS file
        start_marker = f"const {var_name} ="
        start_idx = auth_content.find(start_marker)
        if start_idx == -1:
            print(f"Warning: Could not find {var_name}")
            continue
        
        # Find the JSON object
        start_idx = auth_content.find('{', start_idx)
        brace_count = 0
        end_idx = start_idx
        for i, char in enumerate(auth_content[start_idx:], start_idx):
            if char == '{':
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i + 1
                    break
        
        json_str = auth_content[start_idx:end_idx]
        auth_folder = json.loads(json_str)
        auth_folder["name"] = folder_name
        auth_folder["description"] = description
        collection["item"].append(auth_folder)
    
    # Add other service folders as placeholders
    print("Adding service folders...")
    
    service_folders = [
        ("eLeave Core - User Management", "Import from: eLeaveCore.postman_collection.json - User Management"),
        ("eLeave Core - Staff Management", "Import from: eLeaveCore.postman_collection.json - Staff Management"),
        ("eLeave Core - Leave Types", "Import from: eLeaveCore.postman_collection.json - Leave Types"),
        ("eLeave Core - Leave Entitlement", "Import from: eLeaveCore.postman_collection.json - Leave Entitlement"),
        ("eLeave Core - Leave Applications", "Import from: eLeaveCore.postman_collection.json - Leave Applications"),
        ("eLeave Core - Company Management", "Import from: eLeaveCore.postman_collection.json - Company Management"),
        ("eLeave Core - Master Setup", "Import from: eLeaveCore.postman_collection.json - Master Setup"),
        ("eLeave Core - Reports", "Import from: eLeaveCore.postman_collection.json - Reports"),
        ("eLeave Core - Dashboard", "Import from: eLeaveCore.postman_collection.json - Dashboard"),
        ("eLeave Core - Holiday", "Import from: eLeaveCore.postman_collection.json - Holiday"),
        ("eLeave Core - Overtime", "Import from: eLeaveCore.postman_collection.json - Overtime"),
        ("eLeave Core - Profile Picture", "Import from: eLeaveCore.postman_collection.json - Profile Picture"),
        ("eLeave Tenant - Customer Management", "Import from: eLeaveTenantCore.postman_collection.json - Customer Management"),
        ("eLeave Tenant - Subscription Management", "Import from: eLeaveTenantCore.postman_collection.json - Subscription Management"),
        ("eLeave Tenant - Role Management", "Import from: eLeaveTenantCore.postman_collection.json - Role Management"),
        ("eLeave Tenant - Dashboard", "Import from: eLeaveTenantCore.postman_collection.json - Dashboard"),
        ("eLeave Tenant - Activity Log", "Import from: eLeaveTenantCore.postman_collection.json - Activity Log"),
        ("eLeave Tenant - Support", "Import from: eLeaveTenantCore.postman_collection.json - Support"),
        ("eLeave Tenant - Sync Data", "Import from: eLeaveTenantCore.postman_collection.json - Sync Data"),
        ("eLeave Tenant - Resync Subscription", "Import from: eLeaveTenantCore.postman_collection.json - Resync Subscription"),
        ("beeWhere - Clock Management", "Import from: beeWhereCore.postman_collection.json - Clock Management"),
        ("beeWhere - Overtime Management", "Import from: beeWhereCore.postman_collection.json - Overtime Management"),
        ("beeWhere - Client Management", "Import from: beeWhereCore.postman_collection.json - Client Management"),
        ("beeWhere - User Info", "Import from: beeWhereCore.postman_collection.json - User Info"),
        ("beeWhere - Login Log", "Import from: beeWhereCore.postman_collection.json - Login Log"),
        ("beeWhere - Attendance Profile", "Import from: beeWhereCore.postman_collection.json - Attendance Profile"),
        ("beeWhere - Location Management", "Import from: beeWhereCore.postman_collection.json - Location Management"),
        ("beeWhere - Project Management", "Import from: beeWhereCore.postman_collection.json - Project Management"),
        ("beeWhere - Contract Management", "Import from: beeWhereCore.postman_collection.json - Contract Management"),
        ("beeWhere - Report", "Import from: beeWhereCore.postman_collection.json - Report"),
        ("beeWhere - Map", "Import from: beeWhereCore.postman_collection.json - Map"),
        ("beeWhere - Support", "Import from: beeWhereCore.postman_collection.json - Support"),
        ("Beescheduler - Scheduler", "Import from: beeschedulerCore.postman_collection.json - Scheduler"),
        ("Beescheduler - Health Check", "Import from: beeschedulerCore.postman_collection.json - Health Check"),
        ("eLeave WooCommerce - Products", "Import from: eLeaveWoocommerceCore.postman_collection.json - Products"),
        ("eLeave WooCommerce - Product Variations", "Import from: eLeaveWoocommerceCore.postman_collection.json - Product Variations"),
        ("eLeave WooCommerce - Product Categories", "Import from: eLeaveWoocommerceCore.postman_collection.json - Product Categories"),
        ("eLeave WooCommerce - Product Tags", "Import from: eLeaveWoocommerceCore.postman_collection.json - Product Tags"),
        ("eLeave WooCommerce - Orders", "Import from: eLeaveWoocommerceCore.postman_collection.json - Orders"),
        ("eLeave WooCommerce - Order Notes", "Import from: eLeaveWoocommerceCore.postman_collection.json - Order Notes"),
        ("eLeave WooCommerce - Order Refunds", "Import from: eLeaveWoocommerceCore.postman_collection.json - Order Refunds"),
        ("eLeave WooCommerce - Coupons", "Import from: eLeaveWoocommerceCore.postman_collection.json - Coupons"),
        ("eLeave WooCommerce - Tax Rates", "Import from: eLeaveWoocommerceCore.postman_collection.json - Tax Rates"),
        ("eLeave WooCommerce - Tax Classes", "Import from: eLeaveWoocommerceCore.postman_collection.json - Tax Classes"),
        ("eLeave WooCommerce - Shipping Zones", "Import from: eLeaveWoocommerceCore.postman_collection.json - Shipping Zones"),
        ("eLeave WooCommerce - Shipping Zone Locations", "Import from: eLeaveWoocommerceCore.postman_collection.json - Shipping Zone Locations"),
        ("eLeave WooCommerce - Shipping Zone Methods", "Import from: eLeaveWoocommerceCore.postman_collection.json - Shipping Zone Methods"),
        ("eLeave WooCommerce - Shipping Methods", "Import from: eLeaveWoocommerceCore.postman_collection.json - Shipping Methods"),
        ("eLeave WooCommerce - Payment Gateways", "Import from: eLeaveWoocommerceCore.postman_collection.json - Payment Gateways"),
        ("eLeave WooCommerce - Settings", "Import from: eLeaveWoocommerceCore.postman_collection.json - Settings"),
        ("eLeave WooCommerce - Setting Options", "Import from: eLeaveWoocommerceCore.postman_collection.json - Setting Options"),
        ("eLeave WooCommerce - System Status", "Import from: eLeaveWoocommerceCore.postman_collection.json - System Status"),
        ("eLeave WooCommerce - System Status Tools", "Import from: eLeaveWoocommerceCore.postman_collection.json - System Status Tools"),
        ("eLeave WooCommerce - Data", "Import from: eLeaveWoocommerceCore.postman_collection.json - Data"),
        ("eLeave WooCommerce - Reports", "Import from: eLeaveWoocommerceCore.postman_collection.json - Reports"),
        ("eLeave WooCommerce - Subscriptions", "Import from: eLeaveWoocommerceCore.postman_collection.json - Subscriptions"),
        ("eLeave Login - Encryption", "Import from: eLeaveLoginCore.postman_collection.json - Encryption"),
    ]
    
    for folder_name, description in service_folders:
        collection["item"].append({
            "name": folder_name,
            "item": [],
            "description": description
        })
    
    # Write the collection
    print(f"Writing collection to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(collection, f, indent=4)
    
    print("Consolidation complete!")
    print(f"Output file: {OUTPUT_FILE}")
    print()
    print("Next steps:")
    print("1. Import the collection into Postman")
    print("2. Import the environment file: beeSuite-Consolidated.postman_environment.json")
    print("3. Select the environment from the dropdown")
    print("4. Test the authentication endpoints to populate the access_token")

if __name__ == "__main__":
    main()
