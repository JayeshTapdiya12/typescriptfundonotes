import express, { IRouter } from 'express';
import notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';

import dotenv from 'dotenv';
dotenv.config();

class NoteRoutes {
  private NoteController = new notesController();
  private router = express.Router();

  constructor() {
    this.routes();
  }
  private routes = () => {
    this.router.get(
      '/getallnotes',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.getAllNotes
    );

    //   creating the note
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default NoteRoutes;
