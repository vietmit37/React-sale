import { useState } from "react";
import Test from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Test />
    </div>
  );
}

export default App;
