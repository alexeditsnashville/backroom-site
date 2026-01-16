import { useState } from "react";
import "./App.css";
import Experience from "./components/Experience";

function App() {
  const [showExperience, setShowExperience] = useState(false);

  if (showExperience) {
    return <Experience onExit={() => setShowExperience(false)} />;
  }

  return (
    <main className="landing">
      <div className="landing__content">
        <button
          type="button"
          className="btn btn--cta"
          onClick={() => setShowExperience(true)}
        >
          COUNTER PROGRAM
        </button>
      </div>
    </main>
  );
}

export default App;
