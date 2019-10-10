const app = require('./server/server.js');

const port = process.env.PORT || 5000;

app.listen(port, () =>
{
	console.log(`Server is running on port ${port}`);
});