# Automated CI/CD integration

When designing Signet, it was important to us that Signet would integrate easily with a team's CI/CD pipeline.
This supported our goal to make it simple to get started with contract testing.

**Continuous Integration/Continuous Delivery (CI/CD)** is a practice by which changes to the codebase are frequently tested, merged, and deployed.
Teams building microservices often rely on an automated CI/CD pipeline to maintain a high level of quality while shipping updates quickly.

As discussed [previously](/case-study/background/challenges_testing_microservices#challenges-with-e2e-testing), CI/CD should inform the developer as soon as possible if their changes broke something.
Replacing integration and E2E tests with contract tests in CI/CD promotes this objective by moving the expensive tests outside of the pipeline.
This gives developers faster feedback when breaking changes occur, while still allowing the CI/CD pipeline to stop a deployment when necessary.

## How Signet does it

Signet integrates with CI/CD in two ways: through the **CLI**, and through the broker's support for **webhooks**.

The CLI provides commands for automatically [generating contracts](/case-study/design-decisions/contract-generation), publishing contracts and API specs to the broker, and [verifying provider services](/case-study/design-decisions/provider-verification).
It can also notify the broker of deployments and use Deploy Guard to determine if a given service is safe to deploy to an environment.
A CI/CD pipeline can automate all of these behaviors by invoking CLI commands and can simplify the automation by pre-configuring the CLI using a config file.

Teams can also use the Signet web interface to subscribe their CI/CD pipeline to receive webhooks in response to certain events.
The Signet broker can emit webhooks when new contracts are published, when providers are verified against their API spec, and when new contract test results are available.
This enables a CI/CD pipeline to perform actions in response to contract testing events.

## Another Alternative Considered

During our design phase, we initially considered allowing the Signet broker to not only *emit* webhooks, but also *consume* webhooks from the CI/CD pipeline.
Most CI/CD pipelines offer the ability to subscribe to receive webhooks based on CI/CD events.
For instance, Github Actions can emit webhooks in response to pull requests, test runs, deployments, and many other events.

While this would have given Signet users more options for how to automate their contract tests, we ultimately decided not to offer this feature.
Every CI/CD vendor has their own webhook format and their own set of events which are supported.
For the Signet broker to consume webhooks from all of these vendors, it would need to accept and parse a vast number of different webhook types and formats.
Implementing this feature would have limited Signet's compatibility to a small number of CI/CD vendors.

By exposing Signet's features through the CLI, we were able to maintain support for a wide array of CI/CD vendors without having to design our code around each one individually.
