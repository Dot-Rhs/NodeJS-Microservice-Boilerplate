
# CURL API

## API - System Status

```sh
curl --location --request GET 'http://localhost:3146/api/status/system'

curl --location --request GET 'http://localhost:3146/api/status/time'

curl --location --request GET 'http://localhost:3146/api/status/usage'

curl --location --request GET 'http://localhost:3146/api/status/process'

curl --location --request GET 'http://localhost:3146/api/status/error'
```

## CRUD - USER

```sh
# Get list of users
curl --location --request GET 'http://localhost:3146/api/users'

# Get user info
curl --location --request GET 'http://localhost:3146/api/users/<userId>'

# Create user
curl --location --request POST 'http://localhost:3146/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"alex.plywood@tuts.com","password":"123"}'

# Update user
curl --location --request PUT 'http://localhost:3146/api/users/<userId>' \
--header 'Content-Type: application/json' \
--data-raw '{"email":"alex.plywood@tuts.com","password":"1234"}'
```
