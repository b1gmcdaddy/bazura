module.exports = {
  globals: {
    'process.env.NODE_ENV': 'test',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
