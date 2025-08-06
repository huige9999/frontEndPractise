import ProfilePage from "./components/ProfilePage";
import RegistrationForm from "./components/RegistrationForm";
import { useState } from "react";

function App() {
  const [profilePageVisible, setProfilePageVisible] = useState(true);
  const user = {
    name: "huige9999",
  };
  function showMain() {
    if (profilePageVisible) {
      return <ProfilePage user={user} />;
    } else {
      return <RegistrationForm />;
    }
  }

  return <>
  {showMain()}
   <button onClick={() => setProfilePageVisible(!profilePageVisible)}>
     Toggle
   </button>
  </>;
}

export default App;
