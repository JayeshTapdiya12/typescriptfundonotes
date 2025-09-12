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
    //    get all the notes
    this.router.get(
      '/getallnotes',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.getAllNotes
    );

    // get note by id
    this.router.get(
      '/:_id/getnote',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.getnotebyid
    );

    //   creating the note
    this.router.post(
      '/addnote',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.addNote
    );

    //   is archived note
    this.router.post(
      '/:_id/isarchived',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.archived
    );

    //   is trash note
    this.router.post(
      '/:_id/istrash',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.trash
    );

    // update the note
    this.router.put(
      '/:_id',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.updateNote
    );

    //   color the note
    this.router.patch(
      '/:_id/color',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.color
    );

    //   delete the note
    this.router.delete(
      '/:_id',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.deleteNote
    );

    //   label of the notes start from here
    //   get the labels
    this.router.get(
      '/label',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.getlabel
    );

    // add labels
    this.router.get(
      '/:_id/addlabel',
      userAuth(process.env.jwt_sceret_key),
      this.NoteController.addlabel
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default NoteRoutes;
