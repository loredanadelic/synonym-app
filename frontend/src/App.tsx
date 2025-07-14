import { NewSynonyms } from "./components/NewSynonyms";
import { SynonymSearch } from "./components/SynonymSearch";

function App() {
  return (
    <div className=" m-auto w-80 my-10">
      <h1 className="text-3xl text-gray-700 font-bold mb-4">
        Synonym Search Tool
      </h1>
      <SynonymSearch />
      <NewSynonyms />
    </div>
  );
}

export default App;
