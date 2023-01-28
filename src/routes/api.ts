import { Router} from 'express';
import * as HomeController from '../controllers/PhrasesController'
import * as TodosController from '../controllers/TodosController'

const router = Router();

/// frases
router.get('/frases', HomeController.getPhrases);
router.get('/frasesRandom', HomeController.getPhrasesRandom);
router.get('/frases/:id', HomeController.getPhrasesById);
router.get('/ping', HomeController.ping);
router.get('/random', HomeController.random);
router.get('/name/:name', HomeController.name);
router.post('/frases', HomeController.createPhrases);
router.put('/frases/:id', HomeController.updatePhrases);
router.delete('/frases/:id', HomeController.deletePhrases);

// todos
router.get('/todos', TodosController.getTodos);
router.get('/todos/:id', TodosController.getTodosById);
router.post('/todos', TodosController.createTodos);
router.put('/todos/:id', TodosController.updateTodos);
router.delete('/todos/:id', TodosController.deleteTodos);

export default router;
