import express from 'express';
import { createErrorMessage, errorHandler } from '../utils/error-handler';
import { Constants } from '../utils/constants';
import GroupService from '../services/group-service';
import { Group } from '../models/group.model';
import { CreateGroupSchema, UpdateGroupSchema } from '../utils/group-schemas';
import { createValidator } from 'express-joi-validation';

const router = express.Router();
const validator = createValidator();
const groupService = new GroupService(Group);

/* GET groups list */
router.get('/',
  async (req, res) => {
    try {
      const response = await groupService.getGroups();

      res.status(Constants.HTTP_OK).json(response);
    } catch (err) {
      console.log(err);
      errorHandler(err, res);
    }
  });

/* GET group by ID */
router.get('/:id', async (req, res) => {
  try {
    const groupId = req.params.id;
    const response = await groupService.getGroupById(groupId);
    if (response) {
      res.status(Constants.HTTP_OK).json(response);
    } else {
      const error = createErrorMessage(Constants.HTTP_NOT_FOUND, Constants.NOT_FOUND_ERROR, `No group found with id: ${groupId}.`);
      errorHandler(error, res);
    }
  } catch (err) {
    errorHandler(err, res);
  }
});

/* POST create new group */
router.post('/',
  validator.body(CreateGroupSchema),
  async (req, res) => {
    try {
      const { name, permissions } = req.body;
      const response = await groupService.createGroup({ name, permissions });
      if (response) {
        res.status(Constants.HTTP_CREATED).json(response);
      }
    } catch (err) {
      errorHandler(err, res);
    }
  });

// /* PUT update existing group */
router.put('/:id',
  validator.body(UpdateGroupSchema),
  async (req, res) => {
    try {
      const groupId = req.params.id;
      const { name, permissions } = req.body;
      const group = await groupService.getGroupById(groupId);
      if (group) {
        const response = await groupService.updateGroup(groupId, { name, permissions });
        if (response) {
          const updatedRows = response[1];
          res.status(Constants.HTTP_OK).json(updatedRows[0]);
        }
      } else {
        const error = createErrorMessage(Constants.HTTP_NOT_FOUND, Constants.NOT_FOUND_ERROR, `No group found with id: ${groupId}.`);
        errorHandler(error, res);
      }
    } catch (err) {
      errorHandler(err, res);
    }
  });

// /* DELETE existing group */
router.delete('/:id', async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await groupService.getGroupById(groupId);
    if (group) {
      const response = await groupService.deleteGroup(groupId);
      if (response) {
        res.status(Constants.HTTP_OK).json('Group deleted successfully.');
      }
    } else {
      const error = createErrorMessage(Constants.HTTP_NOT_FOUND, Constants.NOT_FOUND_ERROR, `No group found with id: ${groupId}.`);
      errorHandler(error, res);
    }
  } catch (err) {
    errorHandler(err, res);
  }
});

export { router as GroupRoutes };
