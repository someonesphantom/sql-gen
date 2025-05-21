# SQL Generator – Node-Based No-Code Tool

This is a node-based no-code tool that allows users to visually design and generate SQL database structures. By connecting nodes and entering data, the tool generates SQL database definitions downloadable as a `.sql` file.

## 🔧 Tech Stack

- **React** – Frontend framework
- **ReactFlow** – For interactive node-based canvas and connections
- **MUI (Material-UI)** – For UI components and styling

## 🚀 Links

- **Source Code:** [GitHub Repository](https://github.com/someonesphantom/sql-gen)

## 📸 Screenshots

### 1. SQL Generator – UI

By clicking the **Add Table** button, a new node is added. You can double-click the node to rename the table. Clicking **Add Row** inside a node lets you add new rows, and double-clicking on a row allows you to edit its contents. You can connect rows using edges to define relationships.

![SQL Generator UI](path/to/image1.png)
*Figure 1: SQL Generator – UI*

---

### 2. SQL File Generation

Clicking the **Generate Project** button creates a `.sql` file that contains the full schema based on the node graph you designed.

![SQL File Output](path/to/image2.png)
*Figure 2: Generated SQL File*

---

## 📂 How It Works

1. **Add Tables:** Click the "Add Table" button to insert a new node.
2. **Edit Tables:** Double-click on the table name to rename.
3. **Add & Edit Rows:** Use the "Add Row" button and double-click existing rows to modify them.
4. **Connect Tables:** Drag edges between rows to define relationships.
5. **Generate SQL:** Click "Generate Project" to download your database schema as a `.sql` file.

---

## 🙌 Acknowledgements

Built with ❤️ using React, ReactFlow, and Material-UI.

