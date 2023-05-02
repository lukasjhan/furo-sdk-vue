<p align="center">
  <img src="./furo.svg" alt="Furo Logo" width="400" height="240">
</p>

# furo-sdk-vue

Check Furo's [Official Documentation](https://docs.furo.one/react-sdk).

## FuroProvider

This is a component required for the Furo plugin implementation function, and all paths to use the Furo SDK must be wrapped.

```javascript
<template>
  <img id="logo" alt="Vue logo" src="./assets/furo.svg" />
  <FuroProvider
    :domain="`https://auth.furo.one`"
    :clientId="clientId"
    :redirectUri="origin + `/${clientId}`"
    :apiUrl="`https://api.furo.one`"
  >
    <Board />
  </FuroProvider>
</template>

<script>
import FuroProvider from "./components/FuroProvider.vue";
import Board from "./components/Board.vue";

export default {
  name: "App",
  components: {
    FuroProvider,
    Board,
  },
  setup() {
    return {
      clientId: "Input Client ID in App.vue",
      origin: window.location.origin,
    };
  },
};
</script>
```

### Parameters

| Name        | Type   | Description                                                                                        | Required |
| ----------- | ------ | -------------------------------------------------------------------------------------------------- | -------- |
| domain      | string | Using loginWithRedirect The login page to redirect to, using the default of https://auth.furo.one. | Yes      |
| clientId    | string | This is the client identifier assigned when creating the Furo project.                             | Yes      |
| redirectUri | string | This is the uri of the page to go to after login.                                                  | Yes      |

## useFuro

This is a hook that provides the Furo SDK instance.

```javascript
<template>
  <div class="test">
    <button @click="loginWithRedirect">login</button>
    <button @click="logout" :disabled="!isAuthenticated">logout</button>
    <h1>ID: {{ cid }}</h1>
    <code>
      <h2>User</h2>
      <pre>{{ data }}</pre>
    </code>
  </div>
</template>

<script>
import useFuro from "../composables/use-furo";

export default {
  name: "TestPage",
  setup() {
    const { clientId, loginWithRedirect, logout, isAuthenticated, user } =
      useFuro();
    return {
      cid: clientId,
      data: user,
      loginWithRedirect,
      logout,
      isAuthenticated,
    };
  },
};
</script>
```

### Property

- loginWithRedirect

This function moves to the domain specified by FuroProvider.

```javascript
const loginWithRedirect: () => void;
```

- logOut

This is the logout function.

```javascript
const logout: () => void;
```

- isLoading

A status value that takes true if login is in progress, false otherwise.

```javascript
const isLoading: boolean;
```

- isAuthenticated

A state value that holds true if logged in and false if not logged in.

```javascript
const isAuthenticated: boolean;
```

- user

A user object containing login information.

```javascript
const isAuthenticated: User;
```

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
