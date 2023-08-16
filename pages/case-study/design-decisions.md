# Design Decisions

Signet's feature set has been carefully designed for a specific use case: making it simple to implement contract testing to reduce the burden of integration and E2E tests in CI/CD for microservices.
Now that we have described what Signet is and what it does, we will examine five of the more interesting engineering decisions we made when designing Signet.

We begin by discussing Signet's model for consumer contracts and provider specifications.
This sets up an analysis of Signet's first-class support for provider verification and consumer contract generation.
Finally, we examine the trade-offs of using a dedicated contract broker, and how that relates to integrating Signet contract testing into the CI/CD pipeline.
