import express from "express";
import { graphqlHTTP } from "express-graphql";

import schema from "./schema/schema";

const app = express()

app.use('/graphql', graphqlHTTP({
	schema
}))

app.listen(4000, () => {
	console.log("Listening on port 4000");
})