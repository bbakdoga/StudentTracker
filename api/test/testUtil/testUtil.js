// util/interceptor.js
module.exports = {
    mockRequest: () => {
      let req = {}
      req.body = null
      req.params = {
        authUserId: null,
        userId: null,
        groupId: null,
        interactionId: null,
        noteId: null,
        fileId: null
      }
      return req
    },
  
    mockResponse: () => {
      const res = {}
      res.send = jest.fn().mockImplementation((data) => {
      res.json = data
      });
      res.status = jest.fn().mockReturnValue(200)
      return res
    },

    mockNext: () => {
      const next = jest.fn().mockImplementation((data) => {
        next.value = data
      });
      return next
    }
  }