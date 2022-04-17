const express = require("express");

const app = express();

app.listen(3333);

const projects = [];
var count = 0;

app.use(express.json());

app.use((req, res, next) => 
{
  count = count + 1;

  console.log(`Realizadas ${count} requisições`);

  return next();
});

function checkId(req, res, next)
{
  const 
  { 
    id 
  } = req.params;

  const verifica = projects.find(e => e.id === id);

  if (!verifica)
  {
    return res.status(400).json({ error: "Nenhum projeto com este ID encontrado" });
  }
  return next();
}

app.get("/projects", (req, res) => {
  return res.json(projects);
});

app.post("/projects", (req, res) => {
  const 
  { 
    id, title 
  } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

app.post("/projects/:id/tasks", checkId, (req, res) => 
{
  const 
  { 
    id 
  } = req.params;
  const 
  { 
    title 
  } = req.body;

  const projectIndex = projects.findIndex(e => e.id === id);

  projects[projectIndex].tasks.push(title);

  return res.json(projects);
});


app.put("/projects/:id", checkId, (req, res) => 
{
  const 
  { 
    id 
  } = req.params;
  const 
  { 
    title 
  } = req.body;

  const project = projects.find(e => e.id === id);

  project.title = title;

  return res.json(project);
});


app.delete("/projects/:id", checkId, (req, res) => {
  const 
  { 
    id 
  } = req.params;

  const projectIndex = projects.findIndex(e => e.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
});