import Notes from '../models/notes.model';
import User from '../models/user.model';
import {
  INotes,
  INoteNotFound,
  INotesSuccess,
  INoteError
} from '../interfaces/notes.interface';
import dotenv from 'dotenv';
dotenv.config();

class NoteService {
  public getAllNotes = async (
    body
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await User.findOne({ email: body.Email });
      if (!data) {
        return {
          code: 400,
          message: 'the email does not exists',
          success: false
        };
      } else {
        const notes = await Notes.find({
          $or: [{ createdBy: body.createdBy }, { collaborators: body.Email }]
        }).sort({ createdAt: -1 });

        return {
          code: 200,
          message: 'the notes get fetched ',
          data: notes,
          success: true
        };
      }
    } catch (error) {
      return {
        code: 500,
        message: 'Internal server error',
        error: error.message,
        success: false
      };
    }
  };
}
export default NoteService;
