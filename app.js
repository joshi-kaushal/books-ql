import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose"
import cors from "cors"
import path from "path";

import { fileURLToPath } from 'url';

import schema from "./schema/schema.js";

mongoose.connect("mongodb+srv://kaushal:booksql@cluster0.9ldef.mongodb.net/books?retryWrites=true&w=majority")
mongoose.connection.once("open", () => console.log(`connected to database!`))

const app = express()
app.use(cors())

//  __dirname alternative for ES6 Nodeimport path from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static files
app.use(express.static(path.join(__dirname, './client/build')));

app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + './client/build/index.html'));
});

app.listen(4000, () => {
	console.log("Listening on port 4000");
})