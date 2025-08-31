import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { NodeForm } from './components/NodeForm';
import { NodeData, NodeDataProvider } from './contextApi/NodeData';

function App() {
  return (
    <div>
      <NodeDataProvider>
      <NodeForm/>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      </NodeDataProvider>
    </div>
  );
}

export default App;
