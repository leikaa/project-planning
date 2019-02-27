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

     //Отображение на экране 
    this.httpServer.get('/projects', async (_, res) => {
      const data = await this.projectController.getList();
      res.send({
        status: 'ok',
        data,
      });
    }); 
    
   this.httpServer.post('/projects/:id/add_user/:userId', async(req, res) => {
     //console.log('router', req);
      const _ = await this.projectController.addUsers(req.params.id, req.params.userId);
      res.send({ status: 'ok' });
    });

    this.httpServer.delete('/projects/:id', async (req, res) => {
      const _ = await this.projectController.delete({
        '_id': req.params.id
      });
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/projects', bodyParser.json(), async (req, res) => {
      const _ = await this.projectController.create(req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/projects/:id', bodyParser.json(), async(req, res) => {
      const _ = await this.projectController.update({
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
      const _ = await this.userController.update({
        '_id': req.params.id
      }, req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.delete('/users/:id', async (req, res) => {
      const _ = await this.userController.delete({
        '_id': req.params.id
      });
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/users', bodyParser.json(), async (req, res) => {
      const _ = await this.userController.create(req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.get('/tasks', async (_, res) => {
      const data = await this.taskController.getList();
      res.send({ 
        status: 'ok',
        data,
      });
      console.log(data, "Массив полученых обьектов");
    }); 

    this.httpServer.post('/tasks/:id', bodyParser.json(), async(req, res) => {
      const _ = await this.taskController.update({
        '_id': req.params.id
      }, req.body);
      res.send({ status: 'ok' });
    });

    this.httpServer.delete('/tasks/:id', async (req, res) => {
      const _ = await this.taskController.delete({
        '_id': req.params.id
      });
      res.send({ status: 'ok' });
    });

    this.httpServer.post('/tasks', bodyParser.json(), async (req, res) => {
      const answer = await this.taskController.create(req.body);
      console.log(answer, "Это answer!")
      if(answer == true){
        console.log('Ты получил положительный ответ от controller');
      }else{
        console.log('Ты получил отрицательный ответ от controller');
      };

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
