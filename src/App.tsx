import { PopulationChart } from "./components/PopulationChart";
import { usePopulationData } from "./hooks/usePopulationData";

function App() {
  const { data, loading, error } = usePopulationData();

  return (
    <div>
      <h1>Goose</h1>

      {data && !loading && !error && <PopulationChart data={data} />}
    </div>
  );
}

export default App;
