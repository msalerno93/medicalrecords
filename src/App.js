import {Route, Routes} from "react-router"
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
import PatientShowPage from "./pages/patient/PatientShowPage";
import AllPatients from "./pages/patient/AllPatients";
import AllProviders from "./pages/provider/AllProviders";
import AllInsurances from "./pages/insurance/AllInsurances";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="bg-blue-200 min-h-screen w-full">
    <NavBar/>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/patients" element={<AllPatients />} />
      <Route path="/patient/:id" element={<PatientShowPage />} />
      <Route path="/providers" element={<AllProviders />} />
      <Route path="/insurances" element={<AllInsurances />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  );
}

export default App;
