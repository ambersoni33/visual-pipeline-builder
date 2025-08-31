# Visual Pipeline Builder
FlowCraft is a web-based visual workflow editor that allows users to design, build, and validate complex data pipelines using a drag-and-drop interface. The application features a React frontend for a dynamic user experience and a Python FastAPI backend to process and analyze the pipeline structures.

✨ Features Interactive Drag-and-Drop UI: Easily drag nodes from a component palette onto an infinite canvas.

Dynamic Custom Node Creation: Use a dedicated form to create new node types on the fly, specifying the number of input (target) and output (source) handles.

Built-in & Custom Nodes: Includes a set of pre-defined nodes (Input, LLM, Output, Text) and supports adding any number of user-created custom nodes to the palette.

Node Connectivity: Visually define the pipeline's flow by connecting nodes from a source handle to a target handle.

Backend Validation: Submit the final pipeline structure to a FastAPI backend, which validates the graph (e.g., checks if it's a Directed Acyclic Graph - DAG) and returns the analysis.

Modern State Management: Utilizes Zustand for simple, fast, and scalable state management of nodes and edges on the frontend.

🛠️ Tech Stack This project is composed of a frontend client and a backend server.

Frontend React: A JavaScript library for building user interfaces.

React Flow: A powerful library for building interactive node-based editors and graphs.

Zustand: A small and fast state-management solution for React.

JavaScript (ES6+) & CSS-in-JS: For component logic and styling.

Backend Python 3: The programming language for the server logic.

FastAPI: A modern, high-performance web framework for building APIs.

Pydantic: For robust data validation and settings management based on Python type hints.

Uvicorn: An ASGI server for running the FastAPI application.

🚀 Getting Started Follow these instructions to get the project up and running on your local machine for development and testing.

Prerequisites Node.js & npm: You must have Node.js (version 14.0 or later) and npm installed. You can download them from nodejs.org.

Python & pip: You must have Python (version 3.8 or later) and pip installed. You can download it from python.org.

Backend Setup First, navigate to the directory containing the backend code (main.py) and set up the environment.
1. Navigate to your project's root folder in the terminal
2. Install the required Python packages
pip install "fastapi[all]"

3. Start the backend server
The server will automatically reload on changes and run on http://127.0.0.1:8000
uvicorn main:app --reload

Frontend Setup In a new terminal window, navigate to the directory containing the React frontend files and set up the client.
1. Navigate to your project's root folder in the terminal
2. Install the required npm packages
npm install

3. Start the React development server
The application will automatically open in your browser at http://localhost:3000
npm start

Once both servers are running, you can access the application at http://localhost:3000.

📝 How to Use the Application Create a Custom Node:

Click the ✨ Create New Node button to open the creation form.

Fill in a Node Label, a Node Type, and select the total number of connection Handles.

Specify how many handles should be Target (inputs) and Source (outputs).

Click 🎯 Create Node. Your new node will appear in the "Custom Nodes" section of the palette.

Build Your Pipeline:

Drag any node from the Node Palette and drop it onto the canvas.

You can create multiple instances of any node type.

Connect the Nodes:

Click and drag from a handle on the right side (source) of one node to a handle on the left side (target) of another.

An animated edge will appear, visually representing the connection and data flow.

Execute and Validate:

When your pipeline is designed, click the 🚀 Execute Pipeline button.

The frontend sends your graph's structure to the backend for analysis.

The backend validates the pipeline (checking for cycles, etc.) and returns the results, which are then displayed in an alert.

📂 Project Structure A brief overview of the key files and directories in this project.

/ ├── public/ # Static assets for the React app ├── src/ │ ├── components/ │ │ └── NodeForm.js # React component for the custom node creation form │ ├── contextApi/ │ │ └── NodeData.js # React Context to share custom node data across components │ ├── nodes/ │ │ ├── customNode.js # Component for dynamically created user nodes │ │ ├── inputNode.js # Built-in "Input" node component │ │ ├── llmNode.js # Built-in "LLM" node component │ │ ├── outputNode.js # Built-in "Output" node component │ │ └── textNode.js # Built-in "Text" node component │ ├── App.js # Main application component that assembles the UI │ ├── draggableNode.js # Component for the nodes displayed in the top toolbar │ ├── index.css # Global styles │ ├── index.js # Entry point for the React application │ ├── store.js # Zustand store for managing React Flow state (nodes, edges) │ ├── submit.js # Component for the "Execute" button and its API call logic │ ├── toolbar.js # The top toolbar/palette containing all draggable nodes │ └── ui.js # The main React Flow canvas component where the pipeline is built │ ├── main.py # The FastAPI backend server file └── package.json # Frontend dependencies and project scripts
