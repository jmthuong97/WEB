export default {
  rootPath:
    process.env.REACT_APP_STATE === "localhost" ? "http://localhost:6969" : "http://localhost:6969"
};
