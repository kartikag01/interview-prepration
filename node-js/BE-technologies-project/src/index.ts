// import { gql } from "graphql-tag";
import resolvers from "./graphql/resolvers";
import cors from 'cors';
import express from 'express';
import { server } from "typescript";
import createApolloGraphQLServer from "./graphql";
const { expressMiddleware } = require("@apollo/server/express4");
var cookieParser = require('cookie-parser');

// const typeDefs = gql`
//   ${require('fs').readFileSync(require.resolve('./graphql/schema.graphql'), 'utf8')}
// `;


function errorMiddleWare(err: any, req: any, res: any, next: any) {
    console.error(err.stack);
    res.status(500).send(err.message);
}


async function init() {
    const app = express();

    app.use(cors());
    app.use(cookieParser());
    // res.cookie("userData", users); 
    app.use(express.json()); // body-parser
    app.use(express.urlencoded({ extended: true }));

    // GraphQL
    app.use("/grapphql", expressMiddleware(await createApolloGraphQLServer()));

    app.use("/static", (req, res, next) => {
        throw new Error("Not found");
    });

    app.use("/", (req, res) => {
        res.send("Graphql server is on /grapphql");
    });

    app.use(errorMiddleWare);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
}

init();