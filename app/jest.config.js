 module.exports = {
//   "setupFilesAfterEnv": [
//     "<rootDir>/src/setuptests.ts"
//   ]
    transform: {
      '^.+\\.ts?$': 'ts-jest',
      "^.+\\.jsx?$": "babel-jest"
    },
  };