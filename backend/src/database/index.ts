import {createConnection} from "typeorm";

createConnection()
.then(() => {
    console.log("Connected to the database")
    import("../server")
})
.catch(() => console.error("Unable to connect to the database"));
