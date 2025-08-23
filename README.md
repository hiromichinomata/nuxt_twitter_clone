# nuxt_twitter_clone

https://www.youtube.com/watch?v=_cM4j9_LfQk

## setup

```
$ docker compose up -d
$ docker compose exec mongo mongosh "mongodb://development:testpassword@localhost:27017/admin"
> rs.initiate({
  _id: "rs0",
  members: [{ _id: 0, host: "localhost:27017" }]
})
> rs.status()

npx prisma db push
npm run dev
```

## API example
### POST /api/auth/login
request body

```json
{
	"username": "dev1",
	"password": "password"
}
```

response body

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE5ZDFlNDZhMzZlODIwN2UxNTVhNDUiLCJpYXQiOjE3NTU5NTk4NDYsImV4cCI6MTc1NTk2MDQ0Nn0.XafPMfIWvZIpH-c4hsXiOBlepYHHmWt_2PpUpmX0kUo",
	"user": {
		"id": "68a9d1e46a36e8207e155a45",
		"name": "joe",
		"email": "joe@example.com",
		"username": "dev1",
		"profileImage": "https://picsum.photos/200/200",
		"handle": "@dev1"
	}
}
```

### GET /api/auth/refresh
request body

None

response body

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE5ZDFlNDZhMzZlODIwN2UxNTVhNDUiLCJpYXQiOjE3NTU5NjA3ODgsImV4cCI6MTc1NTk2MTM4OH0.K2jPDIyF-d2xqeiRSOsuLThBrJxgT42-f-i6LVlpU8o"
}
```

### POST /api/auth/register
request body

```json
{
	"username": "dev1",
	"password": "password",
	"repeatPassword": "password",
	"email": "joe@example.com",
	"name": "joe"
}
```

response body

```json
{
	"body": {
		"id": "68a9d1e46a36e8207e155a45",
		"name": "joe",
		"email": "joe@example.com",
		"username": "dev1",
		"profileImage": "https://picsum.photos/200/200",
		"handle": "@dev1"
	}
}
```

### GET /api/auth/user
request body

None

response body

```json
{
	"user": {
		"id": "68a9d1e46a36e8207e155a45",
		"name": "joe",
		"email": "joe@example.com",
		"username": "dev1",
		"profileImage": "https://picsum.photos/200/200",
		"handle": "@dev1"
	}
}
```
