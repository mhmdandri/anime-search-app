This file documents how AI tools were used during the development of this project, as requested in YoPrint’s AI Usage Policy.

AI Tool Used
ChatGPT 5.0

Purpose of AI Assistance
AI assistance was used only for guidance and clarification on implementing Redux state management using Redux Toolkit and TypeScript in React.
No AI-generated code was copied verbatim without understanding.
All Redux logic and structure were reviewed, customized, and manually written by me.

Context of Usage

I used ChatGPT to:
Confirm best practices for setting up a Redux Toolkit store in a React + TypeScript project.
Review the structure for creating slices, actions, and async thunks for fetching anime data from the Jikan API.
Ask about how to type dispatch and state selectors (useAppDispatch, useAppSelector) to maintain strong TypeScript safety.
Understand how to handle async loading and error states properly within Redux slices.

PROMPTS
"How to correctly set up Redux Toolkit with TypeScript and manage async state for an API call in React?"

AI Output Used
The state shape, createAsyncThunk structure, and extraReducers pattern were inspired by AI suggestions.
The final Redux slices and store configuration were manually implemented and adapted to this specific project.

All other parts of the project (UI components, API services, routing, layout, and styling) were completely written by me without AI-generated code.
