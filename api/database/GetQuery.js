const fs = require("fs");

function GetGroupTypesQuery() {
  const GetGroupTypes = fs
    .readFileSync(__dirname + "/queries/GetGroupTypes.sql")
    .toString();
  return GetGroupTypes;
}

function GetInteractionRolesQuery() {
  const GetInteractionRoles = fs
    .readFileSync(__dirname + "/queries/GetInteractionRoles.sql")
    .toString();
  return GetInteractionRoles;
}

function GetPeriodsQuery() {
  const GetPeriods = fs
    .readFileSync(__dirname + "/queries/GetPeriods.sql")
    .toString();
  return GetPeriods;
}

function GetUserGroupsQuery() {
  const GetUserGroups = fs
    .readFileSync(__dirname + "/queries/GetUserGroups.sql")
    .toString();
  return GetUserGroups;
}

function GetUserGroupQuery() {
  const GetUserGroup = fs
    .readFileSync(__dirname + "/queries/GetUserGroup.sql")
    .toString();
  return GetUserGroup;
}

function GetUserGroupInteractionsQuery() {
  const GetUserGroupInteractions = fs
    .readFileSync(__dirname + "/queries/GetUserGroupInteractions.sql")
    .toString();
  return GetUserGroupInteractions;
}

function GetUserUserQuery() {
  const GetUserUser = fs
    .readFileSync(__dirname + "/queries/GetUserUser.sql")
    .toString();
  return GetUserUser;
}

function GetUserQuery() {
  const GetUser = fs
    .readFileSync(__dirname + "/queries/GetUser.sql")
    .toString();
  return GetUser;
}

function GetUserUserInteractionsQuery() {
  const GetUserUserInteractions = fs
    .readFileSync(__dirname + "/queries/GetUserUserInteractions.sql")
    .toString();
  return GetUserUserInteractions;
}

function GetInteractionQuery() {
  const GetInteraction = fs
    .readFileSync(__dirname + "/queries/GetInteraction.sql")
    .toString();
  return GetInteraction;
}

function PostUserGroup() {
  const PostUserGroup = fs
    .readFileSync(__dirname + "/queries/PostUserGroup.sql")
    .toString();
  return PostUserGroup;
}

function PostUserInteraction() {
  const PostUserInteraction = fs
    .readFileSync(__dirname + "/queries/PostUserInteraction.sql")
    .toString();
  return PostUserInteraction;
}

function CreateUser() {
  const CreateUser = fs
    .readFileSync(__dirname + "/queries/CreateUser.sql")
    .toString();
  return CreateUser;
}

function CreateNote() {
  const CreateNote = fs
    .readFileSync(__dirname + "/queries/CreateNote.sql")
    .toString();
  return CreateNote;
}

function GetUserUnity() {
  const GetUserUnity = fs
    .readFileSync(__dirname + "/queries/GetUserUnity.sql")
    .toString();
  return GetUserUnity;
}

function DeleteUserInteraction() {
  const DeleteUserInteraction = fs
    .readFileSync(
      __dirname + "/queries/DeleteUserInteraction/DeleteUserInteraction.sql"
    )
    .toString();
  const DeleteInteractionNote = fs
    .readFileSync(
      __dirname + "/queries/DeleteUserInteraction/DeleteInteractionNote.sql"
    )
    .toString();
  return [DeleteInteractionNote, DeleteUserInteraction];
}

function DeleteUserGroup() {
  const DeleteGroupInteractionNotes = fs
    .readFileSync(
      __dirname + "/queries/DeleteUserGroup/DeleteUserGroupInteractionNotes.sql"
    )
    .toString();
  const DeleteGroupInteractions = fs
    .readFileSync(
      __dirname + "/queries/DeleteUserGroup/DeleteUserGroupInteractions.sql"
    )
    .toString();
  const DeleteGroup = fs
    .readFileSync(__dirname + "/queries/DeleteUserGroup/DeleteUserGroup.sql")
    .toString();
  return [DeleteGroupInteractionNotes, DeleteGroupInteractions, DeleteGroup];
}

function UpdateUserGroup() {
  const UpdateUserGroup = fs
    .readFileSync(__dirname + "/queries/UpdateUserGroup.sql")
    .toString();
  return UpdateUserGroup;
}

function UpdateInteraction() {
  const UpdateUser = fs
    .readFileSync(__dirname + "/queries/UpdateUserInteraction/UpdateUser.sql")
    .toString();
  const UpdateNote = fs
    .readFileSync(__dirname + "/queries/UpdateUserInteraction/UpdateNote.sql")
    .toString();
  const UpdateInteraction = fs
    .readFileSync(
      __dirname + "/queries/UpdateUserInteraction/UpdateUserInteraction.sql"
    )
    .toString();
  return [UpdateUser, UpdateNote, UpdateInteraction];
}

function GetUserNotes() {
  const GetUserNotesQuery = fs
    .readFileSync(__dirname + "/queries/GetUserNotes.sql")
    .toString();
  return GetUserNotesQuery;
}

function PostUserNote() {
  const PostUserNoteQuery = fs
    .readFileSync(__dirname + "/queries/PostUserNote.sql")
    .toString();
  return PostUserNoteQuery;
}

function UpdateUserNote() {
  const UpdateUserNoteQuery = fs
    .readFileSync(__dirname + "/queries/UpdateUserNotes.sql")
    .toString();
  return UpdateUserNoteQuery;
}

function DeleteUserNote() {
  const DeleteUserNoteQuery = fs
    .readFileSync(__dirname + "/queries/DeleteUserNote.sql")
    .toString();
  return DeleteUserNoteQuery;
}

function PostInteractionFile() {
  const PostInteractionFileQuery = fs
    .readFileSync(__dirname + "/queries/FileManagement/PostInteractionFile.sql")
    .toString();
  return PostInteractionFileQuery;
}

function DeleteInteractionFile() {
  const DeleteInteractionFile = fs
    .readFileSync(__dirname + "/queries/FileManagement/DeleteInteractionFile.sql")
    .toString();
  return DeleteInteractionFile;
}

function GetInteractionFiles() {
  const GetInteractionFiles = fs
    .readFileSync(__dirname + "/queries/FileManagement/GetInteractionFiles.sql")
    .toString();
  return GetInteractionFiles;
}

function GetInteractionFile() {
  const GetInteractionFile = fs
    .readFileSync(__dirname + "/queries/FileManagement/GetFile.sql")
    .toString();
  return GetInteractionFile;
}

module.exports = Object.freeze({
  GetGroupTypesQuery,
  GetInteractionRolesQuery,
  GetPeriodsQuery,
  GetUserGroupsQuery,
  GetUserGroupQuery,
  GetUserGroupInteractionsQuery,
  GetUserUserQuery,
  GetUserQuery,
  GetUserUserInteractionsQuery,
  GetInteractionQuery,
  PostUserGroup,
  PostUserInteraction,
  CreateUser,
  CreateNote,
  GetUserUnity,
  DeleteUserInteraction,
  DeleteUserGroup,
  UpdateUserGroup,
  UpdateInteraction,
  UpdateUserNote,
  GetUserNotes,
  PostUserNote,
  DeleteUserNote,
  PostInteractionFile,
  DeleteInteractionFile,
  GetInteractionFiles,
  GetInteractionFile
});
