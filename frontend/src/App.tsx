import { NewSynonyms } from "./components/NewSynonyms";
import { SynonymSearch } from "./components/SynonymSearch";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className=" m-auto w-96 my-10">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Synonym Search Tool
        </h1>
        <SynonymSearch />
        <NewSynonyms />
      </div>
    </QueryClientProvider>
  );
}

export default App;
