# Design Decisions

Signet's paradigm and feature set have been carefully designed for a specific use case: making it simple to integrate contract testing for small organizations with a rapidly scaling microservice architecture.
Now that we have described what Signet is and what it does, we will examine 5 key engineering decisions we made when designing Signet.

We begin by discussing Signet's paradigm for consumer contracts and provider specifications.
This sets up an analysis of Signet's first-class support for consumer contract generation and provider verification.
Finally, we examine the trade-offs of using a dedicated contract broker, and how that relates to integrating Signet contract testing into the CI/CD pipeline.