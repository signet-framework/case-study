# Monoliths and Microservices

**\[This version flows (microservices -> testing -> testing microservices)\]\
\[This version cuts most of the monolith section, and slims down the microservices section\]**

Signet addresses specific challenges with testing applications composed of microservices.
Before exploring those challenges, we discuss the attributes of microservices which underpin the decisions we made when designing Signet.

## What is a Monolith?

Microservices are best introduced in contrast to Monoliths. In a **monolithic** architecture, all of the application's business logic is deployed together as a single unit.
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

Microservices also promote **clear boundaries of ownership**. Each team of engineers is responsible for one or more microservices.
They only need to know how their own services are implemented.
Giving teams a narrow scope allows them to own the full life-cycle of their services, from development, to testing and deployment, to post-deployment monitoring.

## Testing Microservices

In order to realize the benefits of microservices, care must be taken to ensure that independent deployability and clear ownership are maintained throughout the development life cycle.
**Testing** is an area that can be especially troublesome for microservices and requires adaptation from the traditional strategies for testing monoliths.

