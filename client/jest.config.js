module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
    transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)',
      ],
      moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
      }
  };
  