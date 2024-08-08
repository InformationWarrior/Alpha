const app = require("./app");
const log = console.log;
const PORT = process.env.PORT || 8000;

app.listen(PORT, (error) => {
  if (!error) log(`Server is successfully running on port ${PORT}`);
  else log(`Error occurred, server can't start -> , ${error}`);
});
