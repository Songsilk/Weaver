import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p className="text-sm text-violet-300 hover:text-violet-200 cursor-pointer" onClick={() => navigate("/login")}>
        Ir al login
      </p>
    </>
  )
}

export default App
