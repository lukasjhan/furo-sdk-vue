import FuroClient from "@/utils/furoClient";
import { inject, ref, onMounted } from "vue";

const CODE_RE = /[?&]code=[^&]+/;
const ERROR_RE = /[?&]error=[^&]+/;

export const hasAuthParams = (searchParams = window.location.search) =>
  CODE_RE.test(searchParams) || ERROR_RE.test(searchParams);

const onRedirectCallback = (appState, redirectUri) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );

  window.location.href = redirectUri;
};

export default function useFuro() {
  const isLoading = ref(true);
  const isAuthenticated = ref(false);
  const user = ref(undefined);

  const { clientId, domain, redirectUri, apiUrl } = inject("furoOption");
  const client = ref(new FuroClient({ clientId, domain, redirectUri, apiUrl }));

  onMounted(() => {
    const init = async () => {
      try {
        if (hasAuthParams()) {
          await client.value.handleRedirectCallback();
          onRedirectCallback({}, redirectUri);
        } else {
          console.log(`Getting token from storage... Checking Sessions`);
        }

        const userData = await client.value.getUser();
        if (!userData) logout();

        isAuthenticated.value = !!userData;
        user.value = userData;
      } catch (error) {
        console.error(error);
        try {
          const { access_token, refresh_token } =
            await client.value.refreshTokenSilently();
          if (access_token && refresh_token) init();
        } catch (error) {
          console.error(error);
        }
      } finally {
        isLoading.value = false;
      }
    };
    init();
  });

  function logout() {
    localStorage.removeItem("furo-user");
    localStorage.removeItem(`furo-${client.value.clientId}-token`);
    sessionStorage.removeItem(`furo-${client.value.clientId}-token`);
    isAuthenticated.value = false;
    user.value = undefined;
  }

  function loginWithRedirect() {
    client.value.loginWithRedirect();
  }

  function refreshTokenSilently() {
    client.value.refreshTokenSilently();
  }

  async function getAccessTokenSilently() {
    const token = await localStorage.getItem(
      `furo-${client.value.clientId}-token`
    );
    const payloadBase64 = token.split(".")[1];
    const decodedJson = Buffer.from(payloadBase64, "base64").toString();
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;
    if (!exp) return token;
    const expired = Date.now() >= exp * 1000;
    if (!expired) return token;
    else {
      const { access_token: token } = await refreshTokenSilently();
      return token;
    }
  }

  return {
    clientId,
    user,
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    refreshTokenSilently,
    getAccessTokenSilently,
    logout,
  };
}
