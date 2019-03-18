'use strict';
//Отправляет данные с клиента на сервер.

const bodyParser = require('body-parser');

class Routes {

  constructor({
    logger,
    httpServer,
    config,
    projectController,
    userController,
    taskController,
  }) {
    this.logger = logger;
    this.httpServer = httpServer;
    this.config = config;
    this.projectController = projectController;
    this.userController = userController;
    this.taskController = taskController;
  }

  async run () {

    const self = this;
    this.httpServer.use('/status', (_, res) => {
      res.status(200).send('OK');
    });

    this.httpServer.get('/projects', async (_, res) => {
      const data = await this.projectController.getList();
      //console.log("Данные с базы project" , data)
      res.send({
        status: 'ok',
        data,
      });
    }); 

    this.httpServer.get('/projects/join_users', async (_, res) => {
      const data = await this.projectController.JoinningUsersToProjects();
      //console.log("Данные с базы project" , data)
      res.send({
        status: 'ok',
        data,
      });
    }); 

   this.httpServer.post('/projects/:id/add_user/:userId', async(req, res) => {
      //console.log('router', req);
      const answer = await this.projectController.addUsers(req.params.id, req.params.userId);
      console.log('Ответ с controller' , answer)
      res.send({ status: 'ok' });
    });

    this.httpServer.delete('/projects/:id', async (req, res) => {
      const answer = await this.projectController.delete({
        '_id': req.params.id
      });
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/projects', bodyParser.json(), async (req, res) => {
      const answer = await this.projectController.create(req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/projects/:id', bodyParser.json(), async(req, res) => {
      const answer = await this.projectController.update({
        '_id': req.params.id
      }, req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.get('/users', async (_, res) => {
      const data = await this.userController.getList();
      res.send({ 
        status: 'ok',
        data,
      });
    }); 

    this.httpServer.post('/users/:id', bodyParser.json(), async(req, res) => {
      const answer = await this.userController.update({
        '_id': req.params.id
      }, req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.delete('/users/:id', async (req, res) => {
      const answer = await this.userController.delete({
        '_id': req.params.id
      });
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/users', bodyParser.json(), async (req, res) => {
      const answer = await this.userController.create(req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.get('/tasks', async (_, res) => {
      const data = await this.taskController.getList();
      res.send({ 
        status: 'ok',
        data,
      });
        //console.log(data, "Массив полученых обьектов");
    }); 

    this.httpServer.post('/tasks/:id', bodyParser.json(), async(req, res) => {
      const answer = await this.taskController.update({
        '_id': req.params.id
      }, req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.delete('/tasks/:id', async (req, res) => {
      const answer = await this.taskController.delete({
        '_id': req.params.id
      });
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/tasks', bodyParser.json(), async (req, res) => {
      const answer = await this.taskController.create(req.body);
      if(answer == true){
        console.log('Ты получил положительный ответ от controller');
      }
      res.send({ status: 'ok' });
    });

    this.httpServer.all('*', function (req, res) {
      self.logger.error('Bad request', req.params);
      res.status(400).send('Bad request');
    });

    this.httpServer.listen(this.config.port, (err) => {
      if (err) {
        self.logger.error(`Server error`, err);
        return;
      }
      self.logger.info(`Server is listening on ${this.config.port}`);
    })
  }
}

module.exports = Routes;
