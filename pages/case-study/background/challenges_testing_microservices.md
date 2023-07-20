## Overview of automated testing

Automated software tests are broadly grouped into three categories.

- **Unit Tests** - test individual components of a program. The subject under test is a single function, a class, or some other unit of non-trivial programming logic.
- **Integration Tests** - test that multiple logical components of the system function correctly together.
- **End-to-End Tests** (E2E) - exercise full-system workflows as they would occur when triggered in production.

Each of these categories has its place. Industry best-practice for creating a well-balanced test suite is often depicted with a pyramid.

(Pyramid image here)

Tests which are higher on the pyramid have a larger scope and provide more confidence that the system works correctly. The consequence of their scope is that they take longer to run and provide less information about the cause of a failure. Tests which are lower on the pyramid can be executed more quickly and provide better isolation of bugs; but they provide less confidence that the application works correctly as a whole.


### Applying testing methodologies to microservices

Compared with monoliths, microservices have more to gain from tests which are higher on the pyramid. This is becuase API calls involve more complexity than in-memory method calls, and because different microservices are often built by different teams.

Let's explore an example which illustrates why broadly-scoped tests are so important for microservices. In order to do that it will be helpful to think about services assuming the role of either a **provider** or a **consumer**.

- **Provider** - a service which exposes some functionality and/or data for other services to use.
- **Consumer** - a service which requires functionality and/or data from another service in order to fulfill its own requirements.

Well-designed microservices are loosely-coupled and should be allowed to remain ignorant of the implementation details of other services. This means that the team responsible for building a provider service should not need to understand how consumer services are implemented. This can make it difficult for a provider team to know what changes they can make to their API without breaking the consumers. (1, 4, 10)

Integration and E2E tests are well-suited to catch this type of error by verifying that each of the services can communicate with each other correctly. Unfortunately, it is challenging to apply broadly scoped tests to microservices without compromising independent deployability, isolated ownership, and rapid continuous delivery/continuous deployment (CI/CD) cycles. Let's examine why this is the case. 


### Challenges with integration testing

Independent deployability requires that new versions of a service can be built, deployed, and released without requiring other teams to get involved for integration testing. If one team wants to test the integration between their service and another service, they may need help from the other team for a number of reasons:

- Knowing which version (or versions) of the other service are currently released.
- Setting up the other service's runtime environment, configuring the service, and starting it up in the correct way.
- Setting up and configuring and external dependencies that the other service requires in order to function (this might require getting additional teams involved as well).

To address this problem, integration tests can be replaced with **service tests**, where a the external service is replaced with a test double. The test double recieves requests from the service being tested, and sends back a canned response. This enables a team to test that their service interacts with the test double the way that they are expecting. 

Service tests only work as long as the real provider's interface does not change. If the provider service changes, the test doubles need to be updated as well. Ideally, there should be an automated way to validate that the test doubles are up-to-date with the real services they represent. (7, 10)


### Challenges with E2E testing

The difficulties of testing microservices becomes dramatically greater in the context of E2E testing. There are many reasons for this, but we will take a look at two in particular.

E2E testing requires simulating production conditions as best as possible in a dedicated testing environment. This is incredibly challenging with a large number of microservices, because it requires one or more instances of every service in the application to be spun up in the testing environment. Not only is this expensive, it also becomes increasingly difficult to accomplish as the architecture grows. (1)

Implementing this in practice may actually require multiple testing environments so that different teams can conduct tests on new versions of their service at the same time.

E2E test suites can take a long time to run. They usually consist of consecutive user interactions that make up a workflow, and they often need to be run synchronously to ensure repeatability and consistency of state across different test runs. E2E tests are especially slow for microservice architectures because services interact through network calls, which are orders of magnitude slower than reading from memory. (1, 7)

"I have seen \[E2E tests\] take up to a day to run, if not longer, and on one project I worked on, a full regression suite took six weeks!" Sam Newman (7 - pg. 289)

Besides the impracticality of them, E2E tests also degrade the speed at which new features can be shipped because the slow down the developer feedback loop. If it takes longer for developers to become aware that their changes broke something, it takes longer for them to fix it, and start the CI/CD process over again.
