const axios = require("axios");
const { client } = require("../config/app");
const {
  GET_ISSUES_AND_PULL_REQUESTS
} = require("../queries/getIssuesAndPullRequests");
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

const index = (req, res) => {
  const { owner, repoName } = req.query;
  return getAsync("accessToken").then(token => {
    axios({
      method: "post",
      url: "https://api.github.com/graphql",
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        query: GET_ISSUES_AND_PULL_REQUESTS(owner, repoName)
      }
    })
      .then(response => {
        if (response.data.errors) {
          response.data.errors.map(err => {
            if (err.type === "NOT_FOUND") {
              return res.status(500).json({ message: err.message });
            }
          });
        } else {
          const { pullRequests, issues } = response.data.data.repository;
          return res.status(200).json({ pullRequests, issues });
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err.message });
      });
  });
};

module.exports = { index };
