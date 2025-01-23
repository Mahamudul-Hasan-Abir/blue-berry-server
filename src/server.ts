import mongoose from "mongoose";
import app from "./app";
const port = 5200;
const dbUrl = process.env.DB_URL;
const atlasUrl = process.env.ATLAS_URL;
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(atlasUrl as string);
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
