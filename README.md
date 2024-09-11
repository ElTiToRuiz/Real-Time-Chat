# Real-Time Chat Application

This is a real-time chat application built with Node.js, Express, Socket.io, and a SQLite database.

## Features

- Real-time communication with multiple users.
- Persistent message storage in a SQLite (or Turso) database.
- Static file serving for front-end assets.
- Scalable architecture with support for multiple chat rooms.

## Requirements

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Turso (for database management)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Real-Time-Chat.git
    cd Real-Time-Chat
    ```

2. Install dependencies:

    ```bash
    npm install
    ```
3. Install `turso` and continue this instruccion in https://docs.turso.tech/quickstart :

    ```bash
    curl -sSfL https://get.tur.so/install.sh | bash
    ```

4. Create a `.env` file in the root of the project and add your database token DB_TOKEN:

    ```env
    DB_URL=your_database_link/url
    DB_TOKEN=your_database_token
    ```

5. Update the `chat.js` file to use `turso` for database operations. You can refer to the `turso` documentation for more details on how to use it.

6. Start the server:

    ```bash
    node chat.js
    ```

7. Open your browser and navigate to `http://localhost:{PORT}` to see the real-time chat application.

## Usage

1. Start the server:

    ```bash
    node chat.js
    ```

2. Open your browser and navigate to `http://localhost:{PORT}` to see the real-time chat application.

## Project Structure
The project structure is as follows:

```
.
├── client
│   ├── index.html
│   ├── css
│   │   └── style.css
│   ├── img
│   └── script
│       └── script.js
├── chat.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

- `chat.js` is the main server file that handles the real-time chat functionality.
- `client` folder contains the client-side code for the chat application.
- `index.html` is the main HTML file for the chat application.
- `style.css` is the CSS file for the chat application.
- `script.js` is the JavaScript file for the chat application.
- `img` folder contains the images for the chat application
- `package.json` and `package-lock.json` are used for dependency management.
- `.gitignore` is used to ignore certain files and folders in the repository.
- `README.md` is the file that contains this documentation.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to suggest improvements or report bugs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

- **Issue 1**: Cannot connect to the database.
- **Solution**: Ensure that `turso` is correctly installed and that the `DB_TOKEN` is properly set in the `.env` file.

Feel free to modify and organize the project structure according to your needs.
