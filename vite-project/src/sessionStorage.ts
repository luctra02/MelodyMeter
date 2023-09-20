import { getAccessToken } from "./script";

async function main() {
    let accessToken = null;
    if (window.sessionStorage.getItem('accesstoken') == null) {
      accessToken = await getAccessToken();
      sessionStorage.setItem('accesstoken', accessToken);
    } else {
      // Handle the case when the token is already in sessionStorage
      accessToken = String(sessionStorage.getItem('accesstoken'));
    }
  }
  
main()
 