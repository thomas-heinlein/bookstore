#!/usr/bin/env bash

KEYCLOAK_HOST_PORT=${1:-"localhost:8080"}
echo
echo "KEYCLOAK_HOST_PORT: $KEYCLOAK_HOST_PORT"

echo
echo "Getting admin access token"
echo "--------------------------"

ADMIN_TOKEN=$(curl -s -X POST "http://$KEYCLOAK_HOST_PORT/realms/master/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin" \
  -d 'password=admin' \
  -d 'grant_type=password' \
  -d 'client_id=admin-cli' | jq -r '.access_token')

echo "ADMIN_TOKEN=$ADMIN_TOKEN"
echo

echo "Creating bookstore-realm realm"
echo "-------------------------------"

curl -i -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"realm": "bookstore-realm", "enabled": true, "registrationAllowed": true}'

echo "Getting required action Verify Profile"
echo "--------------------------------------"

VERIFY_PROFILE_REQUIRED_ACTION=$(curl -s "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/authentication/required-actions/VERIFY_PROFILE" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq)

echo $VERIFY_PROFILE_REQUIRED_ACTION
echo

echo "Disabling required action Verify Profile"
echo "----------------------------------------"

NEW_VERIFY_PROFILE_REQUIRED_ACTION=$(echo "$VERIFY_PROFILE_REQUIRED_ACTION" | jq '.enabled = false')

echo $NEW_VERIFY_PROFILE_REQUIRED_ACTION
echo

curl -i -X PUT "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/authentication/required-actions/VERIFY_PROFILE" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$NEW_VERIFY_PROFILE_REQUIRED_ACTION"

echo "Creating bookstore client"
echo "--------------------------"

CLIENT_ID=$(curl -si -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/clients" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"clientId": "bookstore", "directAccessGrantsEnabled": true, "publicClient": true, "redirectUris": ["http://localhost:3000/*"]}' \
  | grep -oE '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')

echo "CLIENT_ID=$CLIENT_ID"
echo

echo "Creating the client role USER for the bookstore client"
echo "--------------------------------------------------------------"

curl -i -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/clients/$CLIENT_ID/roles" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "USER"}'

USER_CLIENT_ROLE_ID=$(curl -s http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/clients/$CLIENT_ID/roles/USER \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.id')

echo "USER_CLIENT_ROLE_ID=$USER_CLIENT_ROLE_ID"
echo

echo "Creating the client role ADMIN for the bookstore client"
echo "---------------------------------------------------------------"

curl -i -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/clients/$CLIENT_ID/roles" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "ADMIN"}'

ADMIN_CLIENT_ROLE_ID=$(curl -s http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/clients/$CLIENT_ID/roles/ADMIN \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.id')

echo "ADMIN_CLIENT_ROLE_ID=$ADMIN_CLIENT_ROLE_ID"
echo

echo "Creating USERS group"
echo "--------------------"
USERS_GROUP_ID=$(curl -si -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/groups" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "USERS"}' \
  | grep -oE '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')

echo "USERS_GROUP_ID=$USERS_GROUP_ID"
echo

echo "Creating ADMIN group"
echo "--------------------"
ADMINS_GROUP_ID=$(curl -si -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/groups" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "ADMINS"}' \
  | grep -oE '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')

echo "ADMINS_GROUP_ID=$ADMINS_GROUP_ID"
echo

echo "Adding USERS group as realm default group"
echo "-----------------------------------------"

curl -i -X PUT "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/default-groups/$USERS_GROUP_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

echo "Assigning USER client role to USERS group"
echo "------------------------------------------------"

curl -i -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/groups/$USERS_GROUP_ID/role-mappings/clients/$CLIENT_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "[{\"id\": \"$USER_CLIENT_ROLE_ID\", \"name\": \"USER\"}]"

echo "Assigning USER and ADMIN client roles to ADMINS group"
echo "-------------------------------------------------------------------"

curl -i -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/groups/$ADMINS_GROUP_ID/role-mappings/clients/$CLIENT_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "[{\"id\": \"$USER_CLIENT_ROLE_ID\", \"name\": \"USER\"}, {\"id\": \"$ADMIN_CLIENT_ROLE_ID\", \"name\": \"ADMIN\"}]"

echo "Creating 'user' user"
echo "--------------------"

USER_ID=$(curl -si -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/users" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "enabled": true, "credentials": [{"type": "password", "value": "user", "temporary": false}]}' \
  | grep -oE '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')

echo "USER_ID=$USER_ID"
echo

echo "Assigning USERS group to user"
echo "-----------------------------"

curl -i -X PUT "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/users/$USER_ID/groups/$USERS_GROUP_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

echo "Creating 'admin' user"
echo "---------------------"

ADMIN_ID=$(curl -si -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/users" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "enabled": true, "credentials": [{"type": "password", "value": "admin", "temporary": false}]}' \
  | grep -oE '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')

echo "ADMIN_ID=$ADMIN_ID"
echo

echo "Assigning ADMINS group to admin"
echo "-------------------------------"

curl -i -X PUT "http://$KEYCLOAK_HOST_PORT/admin/realms/bookstore-realm/users/$ADMIN_ID/groups/$ADMINS_GROUP_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

echo "Getting user access token"
echo "-------------------------"

curl -s -X POST "http://$KEYCLOAK_HOST_PORT/realms/bookstore-realm/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user" \
  -d "password=user" \
  -d "grant_type=password" \
  -d "client_id=bookstore" | jq -r .access_token
echo

echo "Getting admin access token"
echo "--------------------------"

curl -s -X POST "http://$KEYCLOAK_HOST_PORT/realms/bookstore-realm/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  -d "client_id=bookstore" | jq -r .access_token
echo