import app from "./app";
import { connectionDB } from "./database";
const port = app.get("port");

connectionDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
