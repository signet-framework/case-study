# Monoliths and Microservices

**\[This version flows (microservices -> testing -> testing microservices)\]\
\[This version cuts most of the monolith section, and slims down the microservices section\]**

We built the Signet framework to address a specific set of challenges with testing applications composed of microservices.
Before exploring those challenges, it may be helpful to set some context for what a microservice architecture is, so that we can more clearly explore why they are challenging to test.
Understanding the characteristics of microservices, particularly when compared to monolithic applications, is key to understanding the trade-offs in the design of Signet.

## What is a Monolith?

In a **monolithic** architecture, all of the application's business logic is deployed together as a single unit.
Typically this means that the code for every business domain is stored in the same repository and is run as a single operating system process.
Each business domain is modeled by one or more programming constructs (module, class, package, etc.).
One business domain can interact with the others through in-memory method calls.

## What are Microservices?

In a **microservice architecture**, the business logic is split up into *independently deployable services*. Each service represents a single business domain.

A **service** can be thought of as a miniature application which encapsulates its own business logic and data.
A service exposes an interface so that other services can consume its functionality through messages sent over the network.

### Benefits of Microservices

Well-designed microservices enable high scalability while also allowing teams to ship new features quickly.
**Independent deployability** is key to making this possible.
Each team should be able to develop and release their service with minimal involvement from other teams.
Services can evolve independently as long as their API's remain backwards-compatible.
This allows an organization to ship new features quickly even as the size of the application grows.

Microservices also promote clear boundaries of ownership. Each team of engineers is responsible for one or more microservices.
They only need to know how their own services are implemented.
Giving teams a narrow scope allows them to own the full life-cycle of their services, from development, to testing and deployment, to post-deployment monitoring.

### Microservices Challenges

Microservies are intended to address the needs of applications that need to scale quickly and to a large size.
They may be less suitable for small applications, especially when a business is new and requirements are not known with a high degree of confidence.

For a single team that is responsible for managing the entire application, microservices may introduce unnecessary complexity; having multiple units of deployment requires additional infrastructure and more coordination to release broadly-scoped features.
In addition, requiring different domains of business logic to interact through network calls instead of in-memory method calls introduces unreliability and latency.

For newer businesses with unstable requirements, microservices decrease the potential evolvability of the app, when compared to a monolithic architecture.
It may be challenging to predict with confidence what the business domains will be before the business is well established.
Microservices provide significant evolvability for individual business domains, but making changes that affect the entire application may be much more difficult compared to a monolith.

## Testing Microservices

The benefits of microservices are tailored to large applications with many engineers, or medium sized applications which require high scalability and evolvability.
Simply having this architecture does not guarantee that these benefits will be realized, however.
Care must also be taken to ensure that independent deployability and clear ownership are maintained throughout the development life cycle.
**Testing** is an area that can be especially troublesome for microservices and requires adaptation from the traditional strategies for testing monoliths.

[^1]: DDIA pg. 47.
