const config = {
    "development": {
        "database": "namethatmovie",
        "host": "localhost"
    },
    "test": {
        "use_env_variable": "MONGODBTEST_URI"
    },
    "production": {
        "use_env_variable": "MONGODB_URI"
    }
};

module.exports = config;