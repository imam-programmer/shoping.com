import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyD5w7ULPUELyRS6G0NVbcpPzneklz06Wz0",
  authDomain: "shoping-site-9a189.firebaseapp.com",
  projectId: "shoping-site-9a189",
  storageBucket: "shoping-site-9a189.firebasestorage.app",
  messagingSenderId: "1044987742934",
  appId: "1:1044987742934:web:fce3d8b38f0a42b5709777"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
export default app;