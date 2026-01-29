const app = require('./src/app');
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`A Thursday server running on port ${PORT}`);
});
