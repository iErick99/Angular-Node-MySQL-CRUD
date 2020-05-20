"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('select * from games');
            console.log(games.rows);
            res.json(games.rows);
        });
    }
    ;
    getGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM games WHERE id = ($1)', [id]);
            if (games.rows.length > 0) {
                return res.json(games.rows[0]);
            }
            res.status(404).json({ text: "The game doesnt exits" });
        });
    }
    ;
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let values = [req.body.title, req.body.description, req.body.image];
            yield database_1.default.query('insert into games(title, description, image) values($1, $2, $3);', values);
            res.json({ text: 'Game saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('delete from games WHERE id = ($1)', [id]);
            res.json({ text: 'Game deleted successful.' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('update games set title = ($1), description = ($2), image = ($3)  WHERE id = ($4)', [req.body.title, req.body.description, req.body.image, id]);
            res.json({ text: 'Game updated successful.' });
        });
    }
}
exports.gamesController = new GamesController();
exports.default = exports.gamesController;
