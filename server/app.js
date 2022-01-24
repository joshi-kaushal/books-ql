import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from 'mongoose'

import schema from "./schema/schema.js";

mongoose.connect('mongodb+srv://kaushal:books-ql@cluster0.bapmn.mongodb.net/boooks?retryWrites=true&w=majority')
mongoose.connection.once('open', () => console.log(`connected to database!`))

const app = express()

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}))

app.listen(4000, () => {
	console.log("Listening on port 4000");
})