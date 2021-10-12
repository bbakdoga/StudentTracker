import HTTPClient from "./HTTPClient";
import IDBClient from "../db-helper";

export default class APIClient extends HTTPClient {
  /**
   * Gets userId of the user that is logged into the system
   */
  static getAuthenticatedUser() {
    return APIClient.get(`/user`).then((response) => response.json());
  }

  /**
   *  Will insert a group in the database
   * */
  static postUserGroup(authUserId, body) {
    return APIClient.post(`/users/${authUserId}/groups`, body).then((response) => response.json());
  }

  /**
   * Will insert a Student in the database. Passing it through group endpoint
   * Because all student must be part of at least one group. Thinking of using a batch call,
   * but since in most cases multiple students being inserted will not exceed by 100 or 200 max,
   * thinking POST call is better instead of a batch with multiple post calls. Thoughts?
   */
  static postStudent(body) {
    return APIClient.post(`/students`, body).then((response) =>
      response.json()
    );
  }

  /**
   * Insert interaction data for a student within a group
   *
   * @param {*} groupId
   * @param {*} studentId
   * @param {*} body
   */
  static postUserInteraction(authUserId, body) {
    return APIClient.post(
      `/users/${authUserId}/interactions`, body).then((response) => response.json());
  }

  /**
   * Thinking of having seperate POST/files call for an interaction
   * instead of including it in Post interactions,
   * Not sure if files is a required field.
   *
   * @param {*} interactionId
   * @param {*} body
   */
  static postInteractionFile(interactionId, body) {
    return APIClient.post(
      `/interactions/${interactionId}/files`,
      body
    ).then((response) => response.json());
  }

  /**
   * Thinking of having seperate POST/notes call for an interaction
   * instead of including it in Post interactions,
   * Not sure if notes is a required field.
   *
   * @param {*} groupId
   * @param {*} studentId
   * @param {*} interactionId
   * @param {*} body
   */
  static postInteractionNote(authUserId, body) {
    return APIClient.post(
      `/users/${authUserId}/notes`,
      body
    ).then((response) => response.json());
  }

  /**
   * Returns Single group
   *
   * @param {*} groupId
   */
  static getGroup(authUserId, groupId) {
    return APIClient.get(`/users/${authUserId}/groups/${groupId}`).then((response) =>
      response.json()
    );
  }

  /**
   * Returns notes
   *
   * @param {*} groupId
   */
   static getNotes(authUserId, interactionId) {
    return APIClient.get(`/users/${authUserId}/notes/${interactionId}`).then((response) =>
      response.json()
    );
  }

  /**
   * Returns notes
   *
   * @param {*} groupId
   */
   static getFiles(authUserId, interactionId) {
    return APIClient.get(`/users/${authUserId}/interactions/${interactionId}/files`).then((response) =>
      response.json()
    );
  }

  /**
   * Returns Group Types
   *
   */
  static getGroupTypes() {
    return APIClient.get(`/group-types`).then((response) => response.json());
  }

  /**
   * Returns Group Types
   *
   */
   static getInteractionRoles() {
    return APIClient.get(`/interaction-roles`).then((response) => response.json());
  }

  /**
   * Returns Group Types
   *
   */
   static getPeriods() {
    return APIClient.get(`/periods`).then((response) => response.json());
  }

  /**
   * Returns multiple groups
   */
  static getUserGroups(authUserId) {
    return APIClient.get(`/users/${authUserId}/groups`).then((response) =>
      response.json()
    );
  }

  /**
   * Returns a single student
   *
   * @param {*} userId
   */
  static getUser(authUserId, userId) {
    return APIClient.get(
      `/users/${authUserId}/users/${userId}`
    )
    .then((response) => response.json())
  }

  /**
   * Returns all the interactions that have occured within a grouping
   *
   * @param {*} groupId
   */
  static getUserGroupInteractions(authUserId, groupId) {
    return APIClient.get(
      `/users/${authUserId}/groups/${groupId}/interactions`
    ).then((response) => response.json());
  }

  /**
   *
   * @returns Count of interactions
   */
  static getInteractionCount() {
    return APIClient.get(`/interactions/count`).then((response) =>
      response.json()
    );
  }

  /**
   * Returns all the interactions that have occured with a student
   * (This is not group dependent)
   *
   * @param {*} userId
   */
  static getUserInteractions(authUserId, userId) {
    return APIClient.get(
      `/users/${authUserId}/users/${userId}/interactions`
    ).then((response) => response.json());
  }

  /**
   * For editing, thinking of using PUT instead of Patch so multiple fields
   * can be updated at the same time. Thoughts?
   */

  /**
   * Edit Group fields for a specific group
   * @param {*} groupId
   * @param {*} body
   */
  static putGroup(authUserId, groupId, body) {
    return APIClient.put(`/users/${authUserId}/groups/${groupId}`, body).then((response) =>
      response.json()
    );
  }

  /**
   * Edit interaction data. Since interaction data contains group and user id
   * @param {*} interactionId
   * @param {*} body
   */
  static putUserInteraction(authUserId, groupId, interactionId, body) {
    return APIClient.put(`/users/${authUserId}/groups/${groupId}/interactions/${interactionId}`, body).then((response) => 
      response.json());
  }

  /**
   * Edit notes for an interaction
   * @param {*} authUserId 
   * @param {*} notesId 
   * @param {*} body 
   * @returns 
   */
  static putInteractionNotes(authUserId, interactionId, notesId, body) {
    return APIClient.put(`/users/${authUserId}/interactions/${interactionId}/notes/${notesId}`, body).then((response) => 
      response.json());
  }

  /**
   * Deletes group specified. This will delete all interactions associated with that group
   * @param {*} groupId
   */
  static deleteGroup(authUserId, groupId) {
    return APIClient.delete(`/users/${authUserId}/groups/${groupId}`).then((response) =>
      response.json()
    );
  }

  /**
   * Deletes Students specified. This will delete all interactions associated with that student
   *
   * @param {*} studentId
   */
  static deleteStudent(studentId) {
    return APIClient.delete(`/students/${studentId}`).then((response) =>
      response.json()
    );
  }

  /**
   * Deletes an interaction for the interaction specified
   *
   * @param {*} authUserId
   * @param {*} interactionId
   */
  static deleteUserInteraction(authUserId, groupId, interactionId) {
    return APIClient.delete(`/users/${authUserId}/groups/${groupId}/interactions/${interactionId}`).then((response) =>
      response.json()
    );
  }

  /**
   * Deletes notes specified
   * @param {*} notesId
   */
  static deleteInteractionNotes(authUserId, interactionId, notesId) {
    return APIClient.delete(`/users/${authUserId}/interactions/${interactionId}/notes/${notesId}`).then((response) =>
      response.json()
    );
  }

  /**
   * Deletes notes specified
   * @param {*} notesId
   */
   static deleteFile(authUserId, interactionId, fileId) {
    return APIClient.delete(`/users/${authUserId}/interactions/${interactionId}/file/${fileId}`).then((response) =>
      response.json()
    );
  }

  /**
   * Deletes notes specified
   * @param {*} notesId
   */
   static downloadFile(authUserId, interactionId, fileId) {
    return APIClient.get(`/users/${authUserId}/interactions/${interactionId}/file/${fileId}`).then((response) =>
      response
    );
  }
}
