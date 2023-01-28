import { Request, Response } from 'express';
import { Todos } from '../models/todos';
import { Op, where } from 'sequelize';
import sequelize from 'sequelize';

export const getTodos = async (req: Request, res: Response)=> {
    let todos = await Todos.findAll();
    res.json(todos);
};
export const getTodosById = async (req: Request, res: Response)=> {
    let todos = await Todos.findAll({
        where: {
            id: req.params.id
        }
    });
    if (todos.length > 0) {
        res.json(todos);
    } else {
        res.json("Atividade não encontrada!");
    }
    
};
export const createTodos = async (req: Request, res: Response)=> {
    console.log('reqqq', req.body);
    await Todos.create({
        title: req.body.title,
        done: req.body.done
    });
    res.status(201);
    res.json({message: "Dados inseridos com sucesso!", objectResult: req.body});
};
export const updateTodos = async (req: Request, res: Response)=> {
    let todos = await Todos.findByPk(req.params.id);
    if (todos) {
        if (req.body.title) {
            todos.title = req.body.title;
        }
        if (req.body.done) {
            switch(req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    todos.done = true;
                case 'false':
                case '0':
                    todos.done = false;
            }
        }
        await todos.save();
        res.status(200);
        res.json({objectResult: todos, message: "Dados atualizados com sucesso"});
    } else {
        res.json("Atividade não encontrada!");
    }

    res.status(201);
    res.json({message: "Dados inseridos com sucesso!", objectResult: req.body});
};
export const deleteTodos = async (req: Request, res: Response)=> {
    let todos = await Todos.findByPk(req.params.id);
    if (todos) {
        await todos.destroy();
        res.status(200);
        res.json({message: "Dado deletado com sucesso"});
    } else {
        res.json("Atividade não encontrada!");
    }

    res.status(201);
    res.json({message: "Dados inseridos com sucesso!", objectResult: req.body});
};
