const GET_ISSUES_AND_PULL_REQUESTS = (owner, name) => {
  return `query { 
    repository(owner: "${owner}", name: "${name}") {
      pullRequests(last: 100, states: MERGED) {
      edges {
        node {
          title
          bodyHTML
          url
          mergedAt
          mergeCommit {
            id
          }
          reviews(first: 10) {
            edges {
              node {
                id
              }
            }
          }
          labels(first: 5) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
    issues(last: 5, states: CLOSED) {
      edges {
        node {
          title
          bodyHTML
          url
          labels(first: 5) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}`;
};

module.exports = { GET_ISSUES_AND_PULL_REQUESTS };
