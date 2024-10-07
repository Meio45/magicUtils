module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    // 如果需要对 "node_modules" 中的某些文件进行转译
    transformIgnorePatterns: [
      "/node_modules/(?!@babel/runtime-corejs3)"
    ]
  };
  