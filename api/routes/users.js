var express = require("express");
var router = express.Router();

const UsersAuthentication = require("../util/UsersAuthentication");

const GetUserGroups = require("../controller/GetUserGroups");
const GetGroupInteractions = require("../controller/GetUserGroupInteractions");
const GetUserUser = require("../controller/GetUserUser");
const GetUserUserInteractions = require("../controller/GetUserUserInteractions");
const GetUserGroup = require("../controller/GetUserGroup");
const GetUserNotes = require("../controller/GetUserNotes");
const GetInteractionFile = require("../controller/FileManagement/GetInteractionFile");
const GetInteractionFiles = require("../controller/FileManagement/GetInteractionFiles");

const PostUserGroup = require("../controller/PostUserGroup");
const PostUserInteractions = require("../controller/PostUserInteractions");
const PostUserNote = require("../controller/PostUserNote");
const PostInteractionFile = require("../controller/FileManagement/PostInteractionFile");

const DeleteUserInteraction = require("../controller/DeleteUserInteraction");
const DeleteUserGroup = require("../controller/DeleteUserGroup");

const UpdateUserGroup = require("../controller/UpdateUserGroup");
const UpdateUserInteractions = require("../controller/UpdateUserInteraction");
const UpdateUserNote = require("../controller/UpdateUserNote");
const DeleteUserNote = require("../controller/DeleteUserNote");
const DeleteInteractionFile = require("../controller/FileManagement/DeleteInteractionFile");

// Makes sure that the User ID that is passed is the same as the env mock auth
router.use("/:authUserId", UsersAuthentication);

// Routes for getting information from the database
router.get("/:authUserId/groups", GetUserGroups);
router.get("/:authUserId/groups/:groupId/interactions", GetGroupInteractions);
router.get("/:authUserId/users/:userId", GetUserUser);
router.get("/:authUserId/users/:userId/interactions", GetUserUserInteractions);
router.get("/:authUserId/groups/:groupId", GetUserGroup);
router.get("/:authUserId/notes/:interactionId", GetUserNotes);
router.get("/:authUserId/interactions/:interactionId/file/:fileId", GetInteractionFile);
router.get("/:authUserId/interactions/:interactionId/files", GetInteractionFiles);

//Routes for posting information to the database
router.post("/:authUserId/groups", PostUserGroup);
router.post("/:authUserId/interactions", PostUserInteractions);
router.post("/:authUserId/notes", PostUserNote);
router.post(
  "/:authUserId/interactions/:interactionId/file",
  PostInteractionFile
);

//Routes for deleting information in the database
router.delete(
  "/:authUserId/groups/:groupId/interactions/:interactionId",
  DeleteUserInteraction
);
router.delete("/:authUserId/groups/:groupId", DeleteUserGroup);
router.delete(
  "/:authUserId/interactions/:interactionId/notes/:noteId",
  DeleteUserNote
);
router.delete("/:authUserId/interactions/:interactionId/file/:fileId", DeleteInteractionFile);

//Routes for updating information in the database
router.put("/:authUserId/groups/:groupId", UpdateUserGroup);
router.put(
  "/:authUserId/groups/:groupId/interactions/:interactionId",
  UpdateUserInteractions
);
router.put(
  "/:authUserId/interactions/:interactionId/notes/:noteId",
  UpdateUserNote
);

module.exports = router;
