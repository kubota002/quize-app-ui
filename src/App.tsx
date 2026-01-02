import { questionsData } from "./data/data";
import { MultipleChoiceQuestion, } from "./components/MultipleChoiceQuestion";
import { Route, Routes } from "react-router-dom";
import { ResultPage } from "./pages/ResultPage";

export default function App() {

  return (
    <Routes>
      <Route path="" element={<MultipleChoiceQuestion questions={questionsData}/>}/>
      <Route path="/result" element={<ResultPage/>}/>
    </Routes>
  );
}
