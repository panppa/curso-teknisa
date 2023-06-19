const express = require('express');
const bodyParser = require('body-parser');

const programmer = require('./database/tables/programmer');

const app = express();
const port = 5000;



app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`porta: ${port}`);
});


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});





app.get('/syncDatabase', async (req, res) => {
  const database = require('./database/db');

  try {
    await database.sync();

    res.send(`Database successfully sync'ed`);
  } catch (error) {
    res.send(error);
  }
});



//get --

app.get('/getProgrammer', async (req, res) => {
  const database = require('./database/db');

  try {
    const params = req.body;
    const record = await validateID(params);


    res.send(record);
  } catch (error) {
    res.send(error);
  }
});


//create --
app.post('/createProgrammer', async (req, res) => {
  try {
    const params = req.body;

    const properties = ['name', 'python', 'java', 'javascript'];

    const check = properties.every((property) => {
      return property in params;
    });

    if (!check) {
      const propStr = properties.join(', ');
      res.send(`All parameters needed to create a programmer must be sent: ${propStr}`);
      return;
    }
 
    const newProgrammer = await programmer.create({
      name: params.name,
      python: params.python,
      javascript: params.javascript,
      java: params.java
    });
 
    res.send(newProgrammer);
  } catch (error) {
    res.send(error);
  }
})


//delete --
app.delete('/deleteProgrammer', async (req, res) => {
  try {
    const params = req.body;

    const record = await validateID(params);

    await record.destroy();

    res.send(`${record.id} ${record.name} - Deleted successfully`);
  } catch (error) {
    res.send(error);
  }
});




const validateID = async (params) => {
  try {
    if (!('id') in params) {
      throw `Missing 'id' in request body`;
    }

    const record = await programmer.findByPk(params.id);

    if (!record) {
      throw `Programmer ID not found.`;
    }

    return record;
  } catch (error) {
    throw error;
  }
}




//update --

app.put('/updateProgrammer', async (req, res) => {
  try {
    const params = req.body;

    const record = await validateID(params);

    const properties = ['name', 'python', 'java', 'javascript'];

    const check = properties.some((property) => {
      return property in params;
    });

    if (!check) {
      res.send(`Request body doesn't have any of the following properties: ${properties.join(', ')}`);
      return;
    }

    record.name = params.name || record.name;
    record.python = params.python || record.python;
    record.java = params.java || record.java;
    record.javascript = params.javascript || record.javascript;

    await record.save();

    res.send(`${record.id} ${record.name} - Updated successfully`);
  } catch (error) {
    res.send(error);
  }
});
