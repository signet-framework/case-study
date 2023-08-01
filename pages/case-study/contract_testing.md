# Contract Testing

Given two services that interact with each other, a **contract test** interrogates each service *in isolation* to see if the two interfaces are compatible with each other.
The test relies on a document known as a **contract** that formally describes the interactions between the services.

Both services are individually tested to ensure that they conform to the contract.
The test fails if either service does not conform, indicating that the two services will not integrate correctly.

**TODO: diagram here illustrating an integration test**

## Benefits of Contract Testing

Contract tests relieve the burden of having to deploy multiple services together for integration testing.
They build confidence that the services will work correctly together, without requiring both teams to coordinate their testing or know how to run the other team's service.

Not only that, but they also provide much faster feedback than integration and E2E tests.
Contract tests behave more like unit test or service tests, and can be run quickly, cheaply, and early on in the CI/CD pipeline.
In fact, they are lightweight enough that a developer could even run them locally before initiating the build processes.

An added benefit of contract tests is that they isolate bugs with more specificity than most integration and E2E tests.
Because each interaction (e.g. an HTTP request and response pair) is enumerated in the contract, a failing test can report exactly which messages are missing or malformed.

## Drawbacks of Contract Testing

While contract tests reduce the need for broadly-scoped tests, they do not replace them entirely.
E2E tests provide a high degree of confidence because they try to mimic production conditions to the greatest extent possible.
Contract tests have a more narrow focus—to test the compatibility of interfaces and catch breaking changes quickly.
Contract tests do not replicate production conditions such as latency, service unavailability, and high amounts of load.

Instead, contract tests reduce the *quantity* of broadly-scoped tests that an application needs. Ideally, these tests can even be moved out of the CI/CD pipeline, and run in a periodic manner that is decoupled from the deployment life-cycle of any given team.

Another trade-off to consider is that implementing contract testing may require writing many new tests. Until there is sufficient coverage of a service's interface, that team cannot be confident that accidental breakages will be caught.

## Evaluating various forms of Contract Testing

There are many approaches to contract testing, and each vendor has a slightly different take on how it should be conducted. Methodologies are grouped into three categories according on how they determine the details of the contract. We will examine each of them in turn.

- Consumer-driven - the consumer service is the source of truth
- Provider-driven - the provider service is the source of truth
- Spec-driven - the source of truth is independent of either service's implementation

### Consumer-driven

In consumer-driven contract testing, the consumer service is implemented first.
After the consumer team has implemented their side of the integration, they use unit tests to generate a consumer contract, which describes the expectations that the consumer service has of the provider service.
The consumer contract is then handed over to the provider team and they implement the provider's API to satisfy the needs of the consumer.
After the provider API is implemented, the requests in the contract are *replayed* against the API (a processed known as **provider verification**) and the responses are compared with those specified in the contract. If the provider service sends the correct response for each request, the test passes.

A significant advantage of the consumer-driven approach is that the contract describes exactly which parts of the provider API is being used by the consumer.
This gives the provider team insight into how they can evolve their API without breaking any consumers.

On the other hand, the consumer-driven approach has a critical drawback. It undermines independent deployability for consumer services.
After generating the consumer contract, the consumer team must wait for the provider team to pull down the contract, spin up their service, and verify that it correctly implements the consumer's requirements.
Only if the provider passes verification can the consumer team proceed to deploying their service.
In the event that provider verification fails, either the consumer team must fix the issue and start the process over again, or they must wait for the provider team to update their API to satisfy the contract.

In either case, the provider team must be involved any time the consumer team wants to deploy a new version of their service.
Taking into account that microservices may have multiple external dependencies, consumer-driven contract testing requires significant cross-team coordination — placing a severe limitation on how quickly new software can be deployed.

### Provider-driven

Provider-driven contract testing is nearly the reverse of consumer-driven.
The provider service is implemented first, and a provider contract is generated that describes the provider's side of the integration.
Usually the provider contract comes in the form of an API specification, other times the provider team distributes a test double which consumers can test against.

The main benefit of a provider-driven approach is that it gives the provider team authority over what the integration looks like.
Whether or not this makes sense depends on the organization and the roles of the services involved.
One situation where this is appropriate is when the provider has a large number of consumers, and it is impractical for the provider team to negotiate their API will all of them at once.

In a provider-driven model, it is less clear whether contract testing will give the provider team insight into how their API is being consumed. The contract describes what the provider offers, not necessarily how consumers are using it. Provider-driven solutions commonly support the ability for writing consumer-specific test cases in the provider contract, but this demands substantial additional effort.

### Spec-driven

Spec-driven contract testing occurs when the API spec is defined separately from either service's implementation.
Usually this means that the consumer and provider teams agree on the API spec ahead of time, before either service has implemented it.

This approach flows naturally out of "Spec-first" API design, a practice where the provider team decides on a spec before writing the code, instead of documenting their implementation after it is completed.
This design philosophy is beneficial because it allows both the consumer and provider services to be implemented simultaneously.
As each service finishes implementation, it can be independently tested against the API spec to verify that it will integrate correctly with the other service.

Spec-driven contract testing is the most conducive to independent deployability.
The API spec is decided at the beginning, and both services can be tested against the spec independently.
Neither team needs help from the other to test the integration.
As long as the both teams require every new version of their service to be tested for conformance to the spec, the deployment cycles of the two services can remain decoupled.

## Existing Solutions

### Pact

Pact is the most well-known open-source option for contract testing.
It uses a purely consumer-driven model.

Two notable characteristics of Pact are that it relies on client libraries for writing consumer contract tests, and it includes a backend application called a "broker."
The broker is responsible for managing contracts and describing the reasons for failed tests.
It also gives developers insight into which services are deployed where, and whether or not their service is safe to be deployed to a given environment.

We see two main challenges with Pact. The fact that it only works with a consumer-driven approach means that it does not maximize independent deployability. It also requires substantial investment in writing new unit tests.

### PactFlow

The original creators of Pact have more recently come out with a paid Software-as-a-Service (SaaS) product called PactFlow.
PactFlow builds on the foundation of Pact to provided a service they call "bidirectional" contract testing.
Bidirectional supports both spec-driven and provider-driven models by allowing the provider's API spec to be published before or after it has been tested against the provider service.

While PactFlow significantly improves upon the flexibility of Pact, it still requires substantial effort to add contract testing into the CI/CD workflow.
Consumer teams still need to write new unit tests using a Pact client library, or else configure a third-party tool for generating the consumer contract.
Provider teams likewise need to supply their own solution for testing the provider implementation against the API spec.

### Karate

Karate is another popular open-source solution for contract testing.
Karate takes a unique approach to the provider-driven model.
Rather than creating an API spec, the provider team uses Karate to generate a mock of the provider service.
The consumer team can then use the mock in their service tests to verify that the consumer will integrate correctly with the real provider.
Although Karate does not use unit tests to generate a consumer contract, developer's still use Karate's DSL to manually program the provider mock to respond correctly to the specific requests from the consumer.

### Specmatic

Specmatic is an open-source offering for spec-driven contract testing.
A key feature of Specmatic is that it offers a way to generate the contract by automatically recording the interactions between the consumer and provider service.
This means that contract testing can be achieved with a significantly smaller startup cost — there is no need to write new unit tests to get up and running.

Another characteristic of Specmatic is that it does not use a broker — contracts are stored in version control instead.
While this comprises a simple solution for managing contracts, it loses out on some useful features that a broker can provide.
For instance, in order for a CI/CD pipeline to automatically gate a deployment based on what is currently deployed, significant effort must be expended to DIY this capability.

## A Need for a New Solution

**TODO: existing solution diagram**

Existing solutions offer clear trade-offs in terms of contract testing approach and feature set.
A recurring theme among many of them is that adopting contract testing is costly, requiring significant investment in writing new unit tests.

Other solutions also stop short of answering the ultimate question developers ask when adopting contract testing: will this service integrate properly with other services in a given environment?
Broker-less solutions require teams to build this capability from scratch, as they lack awareness of what service versions are currently deployed.

There are also a limited number of open-source solutions that offer a spec-driven approach.
A spec-driven model is highly desirable since it maximizes independent deployability and naturally aligns with a spec-first approach to API design.
