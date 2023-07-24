# Contract Testing

Many of the benefits of integration and E2E tests can also be achieved using contract tests.
[maybe quick hit definition of contract test]
Furthermore, contract tests attempt to maintain independent service development cycles, while also allowing faster feedback loops than broadly-scoped tests can typically attain.

The typical way to integration test two services is to spin up both services in the same environment, and cause the consumer service to make API calls to the provider service.
If the provider service responds correctly, and the consumer service handles the responses correctly, the integration tests are successful.

**TODO: diagram here illustrating an integration test**

[In contrast...]
During contract tests, the interactions between the consumer and provider services are described in a document called a **contract**.
Both services can be individually tested to determine if they conform to the contract.
If either service does not behave according to what is described in the contract, the test fails, and the team which owns the service is notified that their service will not integrate correctly with the other service.

**TODO: diagram here illustrating a contract test**

## Benefits of Contract Testing

Contract testing aims to maintain the independent deployability of each service.
It allows a team to test that their service performs its side of an integration correctly, without the need to spin up the other service.

Not only do contract tests decouple the development life-cycles of different teams, but they also provide much faster feedback than integration and E2E tests.
Contract tests behave more like unit test or service tests, and can be run quickly, cheaply, and early on in the CI/CD pipeline.
They are lightweight enough that a developer could even run them locally before initiating the build processes.
(much of the content of this paragraph is duplicated above...)

Another benefit of contract tests is that they provide more fine-grained feedback than most integration and E2E tests.
Because each interaction in the contract is tested individually, when a contract test fails, the developer is informed of exactly which request or response was missing or malformed.
(We don't focus on this as a problem in the `background` section... maybe add it?)

## Drawbacks of Contract Testing

While contract tests reduce the need for broadly-scoped tests, they do not replace them entirely.
Integration and E2E test provide a high degree of confidence because they try to recreate production conditions as accurately as possible.
Contract tests are not designed to replicate conditions like latency, service unavailability, and high amounts of load.
Ideally, contract tests can reduce the dependence on E2E tests enough that they can be run asynchronously outside of the CI/CD pipeline.
[do we need following sentence in this section?]
Successful implementation of contract testing increases the independence of teams, while still maintaining a high degree of confidence that breaking changes will be caught early on.

Another trade-off with contract testing is that it usually requires a large startup cost at the beginning.
Some forms of contract testing require swaths of new unit tests to be written.
In these cases, an organization does not get the confidence benefit of contract testing until the new unit tests cover the majority of the service's interface.

## Evaluating various forms of Contract Testing

There are many approaches to contract testing, and each vendor has a slightly different take on how it should be conducted.
The different methodologies can generally be classified according to how they answer two questions:

1. Does the contract test care about schema or semantics?
2. How is the contract generated?

### Schema vs. Semantics

Contract tests are intended to catch unintended changes to the integration that will cause the consumer service to break.
The breaking change can occur in either the consumer or the provider service.
Contract tests can be categorized according to the type of breaking change they screen for:

- **Schema change** - a change to the structure of a message
- **Semantic change** - a change to the meaning of a message

(I think it is probably worth cutting the section below... or at least having a more concise example)

Suppose we have a consumer service that wants to know the date of birth for a specific user.
The service uses HTTP, and makes a request to the "Users" microservice that looks like this:

```
GET /users/date-of-birth?username=catowner22
```

The consumer service is expecting the "Users" service to respond with a payload like this:

```json
{
  "username": "catowner22",
  "dob": "7-10-1998"
}
```

Instead of giving the DOB as a string, what if the provider returns a number instead--the date in milliseconds since the UNIX epoch:

```json
{
  "username": "catowner22",
  "dob": 900028800000
}
```

This is a schema change--the meaning of the value is the same, but its format is different.

Instead, what if the "Users" service response with a different date?

```json
{
  "username": "catowner22",
  "dob": "1-23-2005"
}
```

This constitutes a semantic change--the value has the same format, but the meaning of the value is different.

Some styles of contract testing are purely schema-based.
They don't check what the values in a message are, they only check that the structure of the message is correct.
Contract tests that also verify the semantics provide more confidence.
They are able to catch more breaking changes than purely schema based tests.
The drawback to semantic tests is that they often require more work to implement and maintain.

### The source of truth

The other key differentiator between methodologies is how the contract is generated.
In other words, who is the source of truth?
Does the contract originate from how one of the services is implemented, or is it generated separately?
Existing solutions generally fall into one of three categories.

- Consumer-driven - the consumer service is the source of truth
- Provider-driven - the provider service is the source of truth
- Spec-driven - the source of truth is independent of either service's implementation

#### Consumer-driven

In consumer-driven contract testing, the consumer service is implemented first.
After the consumer team has implemented their side of the integration, they use unit tests to generate a consumer contract, which describes the expectations that the consumer service has of the provider service.
[Only after that, ]The consumer contract is handed over to the provider team and they implement the provider service's interface to satisfy the needs of the consumer.

One advantage of a consumer-driven approach is that the contract only includes the parts of the provider's API which are actually being used.
This gives the provider team insight into how they can evolve their API without breaking the consumers.

Another benefit of consumer-driven contracts is they typically describe the *semantic* details.
The actual requests the consumer makes and the responses the consumer expects are recorded in the contract.
When the provider is verified against the contract, the requests are *replayed* against the provider service.
As far as contract tests go, this [consumer driven] methodology yields the most confidence that the services integrate correctly.

Although a consumer-driven approach has clear benefits, it also comes with significant trade-offs.
Perhaps the biggest one is that it undermines independent deployability for consumer services.
When a consumer service is updated, a new consumer contract is generated.
Before the consumer service can be deployed, the consumer contract must be pulled down by the provider team, the provider service must be spun up, and the interactions in the contract must be replayed against the provider.
After that, the results of the test must be sent back over to the consumer team.
Only when the consumer team is notified of a successful [test of the provider] are they able to proceed to deploying the new version of the consumer.
In the event that provider verification fails, either the consumer team must fix the issue and start the process over again, or they must wait for the provider team to update their API to satisfy the contract.

In either case, the consumer team does not get immediate feedback about whether their service is compatible with the provider.
The provider team has to be involved.
Taking into account that microservices often have multiple external dependencies, performing consumer-driven contract testing requires coordination from multiple teams any time a service is updated, [undermining ID].

(Two more drawbacks that are not mentioned for brevity):
- (-) workflow is unintuitive, and does not align with how most teams agree on APIs
- (-) consumer must be implemented first

#### Provider-driven

Provider-driven contract testing is nearly the reverse of consumer-driven.
The provider service is implemented first, and a provider contract is generated that describes the provider's side of the integration.
Usually the provider contract comes in the form of an API specification, other times the provider team distributes a test double which consumers can test against.

The main benefit of a provider-driven approach is that it gives the provider team authority over what the integration must look like.
Whether or not this is a good fit is specific to the organization, and depends on the roles of the services involved.
Many organizations prefer a more collaborative approach to API design, where consumer and provider teams work together.

[see if this para can be condensed]
Provider-driven contract tests are mainly schema-based, unless significant effort is expended to tailor the contract (or test double) to all of the consumers involved.
It is natural to describe an API in terms of the schema it requires and the general behaviors it is capable of.
However, it is difficult-to-impossible to exhaustively describe the semantics of every possible interaction with the API.
Creating specific test cases requires knowing about the specific needs of each consumer--a provider contract is not designed for that purpose.

#### Spec-driven

[The third...]
Spec-driven contract testing (a.k.a "contract-driven" or "law-driven") occurs when the API spec is defined independently of either service's implementation.
Usually this means that the consumer and provider teams agree on the API spec ahead of time, before either service conforms to it.

This approach flows naturally out of "Spec-first" API design, a practice where the provider team decides on a spec before writing the code, instead of documenting their implementation after it is completed.
This design philosophy is beneficial because it allows both the consumer and provider services to be implemented simultaneously.
As each service finishes implementation, it can be independently tested against the API spec to verify that it will integrate correctly with the other service.

Spec-driven contract testing is the most conducive to independent deployability.
The API spec is decided at the beginning, and both services can be tested against the spec independently.
Neither team needs help from the other to test the integration.
As long as the both teams require every new version of their service to be tested for conformance to the spec, the life-cycles of the two services remain decoupled.

## Existing Solutions

### Pact

Pact is the most well-known open-source option for contract testing.
It uses a purely consumer-driven model.

Two notable characteristics of Pact are that it relies on client libraries for writing consumer contract tests, and it includes a backend application called a "broker."
The broker is responsible for managing contracts and describing the reasons for failed tests.
It also gives developers insight into which services are deployed where, and whether or not their service is safe to be deployed to a given environment.

Two challenges we see with Pact are that it only works with consumer-driven contract testing and that it requires substantial initial investment in writing additional unit tests.

### PactFlow

The creators of Pact have more recently come out with a paid Software-as-a-Service (SaaS) product called PactFlow.
PactFlow builds on the foundation of Pact to provided a service they call "bidirectional" contract testing.
Bidirectional supports both provider-driven and spec-driven models by allowing the provider's API spec to be published before or after it has been tested against the provider service.

While PactFlow significantly improves upon the flexibility of Pact, it still requires substantial effort to add contract testing into the CI/CD workflow.
Consumer teams still need to write new unit tests using a Pact client library, or else configure their own solution for generating the consumer contract.
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
This means that contract testing can be achieved with a significantly smaller startup cost.

Another characteristic of Specmatic is that there is no broker--contracts are stored in version control instead.
While this comprises a simple solution for managing contracts, it loses out on some interesting features that a broker can provide.
For instance, in order for a CI/CD pipeline to automatically gate a deployment based on what is currently deployed, significant effort must be expended to DIY this capability.
