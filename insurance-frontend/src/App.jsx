import { BrowserRouter, Routes, Route } from "react-router-dom";

import Step1 from "./pages/Step1_SelectAdmission";
import Step2 from "./pages/Step2_PreAuth";
import Step3 from "./pages/Step3_UploadDocs";
import Step5 from "./pages/Step5_Risk";
import Step6 from "./pages/Step6_Status";
import Step7 from "./pages/Step7_Settlement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/preauth" element={<Step2 />} />
        <Route path="/upload" element={<Step3 />} />

        <Route path="/risk" element={<Step5 />} />
        <Route path="/status" element={<Step6 />} />
        <Route path="/settlement" element={<Step7 />} />
      </Routes>
    </BrowserRouter>
  );
}
