import { Request, Response } from 'express';
import pool from '../database';

class GamesController{

    public async list(req: Request, res: Response): Promise<void> {
        const games = await pool.query('select * from games');
        console.log(games.rows);
        res.json(games.rows);
    };

    public async getGame(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ($1)', [id]);
        if(games.rows.length > 0){
            return res.json(games.rows[0]);
        }
        res.status(404).json({text: "The game doesnt exits"});
    };

    public async create(req: Request, res: Response): Promise<void> {
        let values: string[] = [req.body.title, req.body.description, req.body.image];
        await pool.query('insert into games(title, description, image) values($1, $2, $3);', values);
        res.json({text: 'Game saved'});
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('delete from games WHERE id = ($1)', [id]);
        res.json({text: 'Game deleted successful.'});
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('update games set title = ($1), description = ($2), image = ($3)  WHERE id = ($4)', 
        [req.body.title, req.body.description, req.body.image, id]);
        res.json({text: 'Game updated successful.'});
    }
}

export const gamesController = new GamesController();
export default gamesController;