import { Request, Response } from 'express';
import { Phrases } from '../models/Phrases';
import { Op, where } from 'sequelize';
import sequelize from 'sequelize';

interface Autor{
    autor: String,
    text: String
}

export const getPhrases = async (req: Request, res: Response)=> {
    let PhrasesItem = await Phrases.findAll();
    res.json(PhrasesItem);
};
export const getPhrasesById = async (req: Request, res: Response)=> {
    let PhrasesItem = await Phrases.findAll({
        where: {
            id: req.params.id
        }
    });
    if (PhrasesItem.length > 0) {
        res.json(PhrasesItem);
    } else {
        res.json("Frase não encontrada!");
    }
    
};
export const getPhrasesRandom = async (req: Request, res: Response)=> {
    let PhrasesItem = await Phrases.findOne({
        order: [
            sequelize.fn('RANDOM')
        ]
    });
    if (PhrasesItem) {
        res.json(PhrasesItem); 
    } else {
        res.json('Não a frases cadastradas!');
    }
};
export const createPhrases = async (req: Request, res: Response)=> {
    console.log('frase', req.body);
    try {
        await Phrases.create({
            autor: req.body.autor,
            text: req.body.text
        });
        res.status(201);
        res.json({message: "Dados inseridos com sucesso!", objectResult: req.body});
    } catch(error) {
      res.status(400);
      return res.json(error);
    }
};
export const updatePhrases = async (req: Request, res: Response)=> {
    let {autor, text} = req.body;
    let phrasesData = await Phrases.findByPk(req.params.id);
    if (phrasesData) {
        phrasesData.autor = autor;
        phrasesData.text = text;
        await phrasesData.save();
        res.status(200);
        res.json({objectResult: phrasesData, message: "Dados atualizados com sucesso"});
    } else {
        res.json("Frase não encontrada!");
    }

    res.status(201);
    res.json({message: "Dados inseridos com sucesso!", objectResult: req.body});
};
export const deletePhrases = async (req: Request, res: Response)=> {
    let phrasesData = await Phrases.findByPk(req.params.id);
    if (phrasesData) {
        await phrasesData.destroy();
        res.status(200);
        res.json({message: "Dado deletado com sucesso"});
    } else {
        res.json("Frase não encontrada!");
    }

    res.status(201);
    res.json({message: "Dados inseridos com sucesso!", objectResult: req.body});
};
export const ping = async (req: Request, res: Response) => {
    res.json({nome: 'Api do Guilherme'});
};
export const random = async (req: Request, res: Response) => {
    let numberRandom = Math.floor(Math.random() * 10);
    res.json({numero: numberRandom});
};
export const name = async (req: Request, res: Response) => {
    let name: string = req.params.name;
    res.json({nome: name});
};
