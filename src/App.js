import {Route, Routes} from "react-router"
// import SignIn from "./pages/login/SignIn";
// import SignUp from "./pages/login/SignUp";
import PatientShowPage from "./pages/patient/PatientShowPage";
import AllPatients from "./pages/patient/AllPatients";
import AllProviders from "./pages/provider/AllProviders";
import AllInsurances from "./pages/insurance/AllInsurances";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import InsuranceShowModal from "./pages/insurance/InsuranceShowModal";
import ProviderShowModal from "./pages/provider/ProviderShowModal";
import WelcomePage from "./pages/provider/WelcomePage";

function App() {
  return (
    <div className="bg-blue-300 min-h-screen w-full">
    <NavBar/>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      {/* <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp/>} /> */}
      <Route path="/welcome" element={<WelcomePage/>} />
      <Route path="/patients" element={<AllPatients />} />
      <Route path="/patient/:id" element={<PatientShowPage />} />
      <Route path="/providers" element={<AllProviders />} />
      <Route path="/provider/:id" element={<ProviderShowModal />} />
      <Route path="/insurances" element={<AllInsurances />} />
      <Route path="/insurance/:id" element={<InsuranceShowModal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  );
}

export default App;
