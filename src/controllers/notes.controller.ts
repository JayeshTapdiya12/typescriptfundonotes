import NoteService from '../services/notes.service';

import { Request, Response, NextFunction } from 'express';

import {
  INotes,
  INoteNotFound,
  INotesSuccess,
  INoteError
} from '../interfaces/notes.interface';

class NoteController {
  public noteService = new NoteService();

  public getAllNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.noteService.getAllNotes(req.body);
      if ((data as INotesSuccess).code) {
        res.status((data as INotesSuccess).code).json(data);
      } else if ((data as INoteNotFound).code) {
        res.status((data as INoteNotFound).code).json(data);
      } else {
        res.status((data as INoteError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during getting the all notes  of the user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
}

export default NoteController;
