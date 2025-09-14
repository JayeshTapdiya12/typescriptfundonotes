import Notes from '../models/notes.model';
import User from '../models/user.model';
import {
  INotes,
  INoteNotFound,
  INotesSuccess,
  INoteError
} from '../interfaces/notes.interface';
import dotenv from 'dotenv';
import { sendMail } from '../utils/emailsender';
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

  public getnotebyid = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note doest exists',
          success: false
        };
      } else {
        return {
          code: 200,
          success: true,
          data: data,
          message: 'the note is succefully fetched by id '
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

  public addNote = async (
    body
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.create(body);
      return {
        code: 200,
        success: true,
        data: data,
        message: 'the note is succefully created'
      };
    } catch (error) {
      return {
        code: 500,
        message: 'Internal server error',
        error: error.message,
        success: false
      };
    }
  };

  public archived = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'note did not exisit',
          success: false
        };
      } else {
        data.isArchived = !data.isArchived;
        await data.save();
        return {
          code: 200,
          message: `Note has been ${
            data.isArchived ? 'archived' : 'unarchived'
          } successfully`,
          data: data,
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

  public trash = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'note did not exisit',
          success: false
        };
      } else {
        if (data.isArchived) {
          return {
            code: 200,
            success: false,
            message: 'connot trash the note because it is archived'
          };
        }

        data.isTrashed = !data.isTrashed;
        await data.save();
        return {
          code: 200,
          message: `Note has been ${
            data.isTrashed ? 'Trashe' : 'trashed'
          } successfully`,
          data: data,
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

  public updateNote = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({
        _id: id,
        $or: [{ createdBy: body.createdBy }, { collaborators: body.Email }]
      });
      if (!data) {
        return {
          code: 400,
          message: 'note did not exisit',
          success: false
        };
      } else {
        // await data.update({ ...body });
        Object.assign(data, body);
        await data.save();
        return {
          code: 200,
          message: `Note has been updated successfully`,
          data: data,
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

  public color = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'note did not exisit',
          success: false
        };
      } else {
        await data.update({ color: body.color });
        // await data.save();
        return {
          code: 200,
          message: `Note color has been updated successfully`,
          data: data,
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

  public deleteNote = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'note did not exisit',
          success: false
        };
      } else {
        if (data.isArchived === true) {
          return {
            code: 200,
            success: false,
            message: 'the note is archived which can not be deleted'
          };
        }
        await data.deleteOne();

        return {
          code: 200,
          message: `Note  has been delete successfully`,
          data: data,
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

  public getlabel = async (
    body
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.distinct('label', { createdBy: body.createdBy });
      if (!data || data.length === 0) {
        return {
          code: 400,
          message: 'no label for the notes/user',
          success: false
        };
      } else {
        return {
          code: 200,
          message: 'Labels fetched successfully',
          data: data,
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
  public addlabel = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note does not found',
          success: false
        };
      } else {
        let labels = data.label || [];
        let newLabel = Array.isArray(body.label) ? body.label : [body.label];
        labels = [...new Set([...labels, ...newLabel])];
        await data.update({ label: labels });

        return {
          code: 200,
          message: 'Labels updatead successfully',
          data: data,
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
  public updateLabel = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note does not found',
          success: false
        };
      } else {
        let labels = data.label || [];

        if (!labels.includes(body.oldlabel)) {
          return {
            code: 404,
            message: `Label "${body.oldlabel}" not found in this note`,
            success: false
          };
        }

        labels = labels.map((l) => (l === body.oldlabel ? body.newlabel : l));
        await data.update({ label: labels });

        return {
          code: 200,
          message: `Label "${body.newlabel}" updated successfully`,
          data: data,
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

  public deletelabel = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note does not found',
          success: false
        };
      } else {
        let labels = data.label || [];
        labels = labels.filter((l) => l !== body.label);
        await data.update({ label: labels });

        return {
          code: 200,
          message: 'Labels deleted successfully',
          data: data,
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
  public getreminder = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note does not found',
          success: false
        };
      } else {
        if (!data.reminder) {
          return {
            code: 200,
            message: 'the note doesnote contain the reminder',
            success: true
          };
        } else {
          return {
            code: 200,
            message: 'the reminder succesfullt fetched ',
            data: data.reminder,
            success: true
          };
        }
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

  public addreminder = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note does not found',
          success: false
        };
      } else {
        if (data.reminder) {
          return {
            code: 200,
            message: 'the note already contain the reminder',
            success: true,
            data: data.reminder
          };
        } else {
          data.reminder = body.reminder;
          await data.save();

          return {
            code: 200,
            message: 'the reminder succesfully added ',
            data: data.reminder,
            success: true
          };
        }
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

  public updateReminder = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note does not found',
          success: false
        };
      } else {
        await data.update({ reminder: body.reminder });

        return {
          code: 200,
          message: 'the reminder succesfully added ',
          data: data.reminder,
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

  public deleteReminder = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data || !data.reminder) {
        return {
          code: 400,
          message: 'the note does not found / there is no reminder',
          success: false
        };
      } else {
        await data.updateOne({ $unset: { reminder: '' } });

        return {
          code: 200,
          message: 'the reminder succesfully deletedd ',
          data: data.reminder,
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

  // collaborators starts here:
  public getCollaborators = async (
    body,
    id
  ): Promise<string[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.distinct('collaborators', {
        createdBy: body.createdBy,
        _id: id
      });
      if (!data || data.length === 0) {
        return {
          code: 400,
          message: 'there is no collaborators present',
          success: false
        };
      } else {
        return {
          code: 200,
          message: 'the collaborators succesfully fetched ',
          data: data,
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
  public addCollaborators = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note does not found',
          success: false
        };
      } else {
        let collaborators = data.collaborators || [];

        let newcollaborators = Array.isArray(body.emailid)
          ? body.emailid
          : [body.emailid];
        collaborators = [...new Set([...collaborators, ...newcollaborators])];
        data.collaborators = collaborators;
        await data.save();

        const content = `
                <h1>Hello,</h1>
                <h4>you are invited for the collbaoration of the note created by ${body.username} for the note title: ${data.title} and the description : ${data.description} </h4>
            `;
        const subject = `invitation of the collaborators of the note by ${body.username} `;

        await sendMail({
          email: body.emailid,
          subject: subject,
          body: content
        });

        return {
          code: 200,
          message: 'collaborators deleted successfully',
          data: data,
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

  public deleteCollaborators = async (
    body,
    id
  ): Promise<INotes[] | INotesSuccess | INoteError | INoteNotFound> => {
    try {
      const data = await Notes.findOne({ createdBy: body.createdBy, _id: id });
      if (!data) {
        return {
          code: 400,
          message: 'the note does not found',
          success: false
        };
      } else {
        let collaborators = data.collaborators || [];
        if (!collaborators.includes(body.emailid)) {
          return {
            code: 404,
            success: false,
            message: 'email id not found in the collaborator'
          };
        }
        collaborators = collaborators.filter((c) => c !== body.emailid);
        data.collaborators = collaborators;
        await data.save();
        const content = `
                <h1>Hello,</h1>
                <h4>you are removed for the collbaoration of the note created by ${body.username} for the note title: ${data.title} and the description : ${data.description} </h4>
            `;
        const subject = `removed of the collaborators of the note by ${body.username} `;
        await sendMail({
          email: body.emailid,
          subject: subject,
          body: content
        });

        return {
          code: 200,
          message: 'collaborators added successfully',
          data: data,
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
