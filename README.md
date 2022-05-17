refs - https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81

# server_auth_bearer

* auth token sent by HTTP Header Authorization Bearer
* Client no need to proxy
* Server CORS must allow React domain (http://localhost:3000)
* Server API must extract token from header

# server_auth_cookie

* auth token sent by Cookie HttpOnly
* Client: need to enable proxy from package.json + using relative paths (in order to let proxy send cookie to server)
* Server: no need to setup CORS
* Server API must extract token from cookie.token

# server_auth_cookie_withcredentials

* auth token sent by Cookie HttpOnly
* no need to enable proxy from package.json
* Client: API calls done with full URL (no need to use relative paths)
* Client: API calls must set withCredentials = true in order to send cookies throught XHR
* Server CORS must allow React domain (http://localhost:3000)
* Server CORS must allow credentials -> thus setting Access-Control-Allow-Credentials: true into the response
* Server API must extract token from cookie.token

# server_auth_cookie_withcredentials_csrf

* Like server_auth_cookie_withcredentials but adding CSRF for post requests
* Server exposes endpoint for getting CSRF token on page load
* Client gets the CSRF token on page load and adds it on any POST
* Server enables CSRF middleware (for post requests) and configures it for matching cookie CSRF token with HTTP Header X-CSRF-Token


# Setup

Server:

    mkdir server
    cd server
    npm i express express-jwt jsonwebtoken cors cookie-parser csurf
    Crea file server.js

Client:

    mkdir client
    npx create-react-app client
    cd client
    npm i axios
    Crea file App.js

