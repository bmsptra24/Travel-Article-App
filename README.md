## Prerequisites 🛠️

Before getting started, ensure you have the following:

- **Node.js**: (v20) or the latest version of Node.js. You can download it from the [official Node.js website](https://nodejs.org/).
- **npm / yarn / pnpm**: Usually installed with Node.js.
- **Git**: To clone the repository. If you haven’t installed it, you can download it from the [official Git website](https://git-scm.com/).

## Installation Steps 📋

1. **Clone the Repository** 📥
    
    Open your terminal or command prompt and run the following command to clone the repository:
    
    ```bash
    git clone https://github.com/bmsptra24/Travel-Article-App.git
    ```
    
2. **Navigate to the Project Directory** 📂
    
    After cloning the repository, navigate to the project directory:
    
    ```bash
    cd Travel-Article-App
    ```
    
3. **Install Dependencies** 📦
    
    Run the following command to install all the required dependencies:
    
    ```bash
    yarn
    ```
    
4. **Set Up Environment Variables** 🌐
    
    Create a `.env` file in the root directory of your project if it doesn't exist, and add the following environment variable:
    
    ```
    VITE_ENDPOINT_URL=https://extra-brooke-yeremiadio-46b2183e.koyeb.app
    ```
    
    The `.env` file should be in the same directory as your `package.json` file.
    
5. **Run the Project** 🚀
    
    After completing all the steps above, you can run the project with the following command:
    
    ```bash
    yarn dev
    ```
    
    The project will run in development mode and can be accessed in your browser at `http://localhost:5173`.
