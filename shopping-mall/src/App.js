import "./App.css";
import { initializeApp } from 'firebase/app';
import "firebase/auth";
import Header from "./components/header/Header";
import ProductLists from "./components/productList/ProductLists";

function App() {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  };
  // Firebase 앱 초기화
  const app = initializeApp(firebaseConfig);

  return (
    <div className="App">
      <Header />
      <ProductLists />
    </div>
  );
}

export default App;
