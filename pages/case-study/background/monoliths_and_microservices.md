# Of Monoliths and Microservices

**Signet** addresses specific challenges with testing applications composed of microservices.
Before exploring those challenges, we discuss the attributes of microservices which underpin the decisions we made when designing Signet.

## What is a Monolith?

Microservices are best introduced in contrast to *monoliths*.
In a **monolithic architecture**, all of the application's business logic is deployed together as a single unit.

Typically, this means that each business domain is modeled by one or more programming constructs (*e.g.* class or module) that are stored in a shared repository.
When deployed, the application runs as a single process, allowing business domains to interact with each other through in-memory method calls.

## What are Microservices?

In a **microservice architecture**, the business logic is split up into *independently deployable services*. Each service represents a single business domain.

A **service** can be thought of as a miniature application which encapsulates its own business logic and data.
A service exposes an interface so that other services can consume its functionality through messages sent over the network.

### Benefits of Microservices

Well-designed microservices enable high scalability, while also allowing teams to ship new features quickly.

A key characteristic of a well-designed microservice architecture is *independent deployability* of its services.
**Independent deployability** means that teams can develop and release their services with minimal involvement from other teams.
Services can thus evolve independently, as long as their API's remain backwards-compatible.
This allows an organization to ship new features quickly even as the size of the application grows.

Microservices also promote **clear boundaries of ownership**.
Each team of engineers is responsible for one or more microservices and only need to know how their own services are implemented.
This gives teams a narrow scope, allowing them to own the full life-cycle of their services, from development, to testing and deployment, to post-deployment monitoring.

## Testing Microservices

In order to realize the benefits of microservices, care must be taken to ensure that independent deployability and clear ownership are maintained throughout the development life cycle.
These characteristics are challenging to maintain when testing that multiple microservices work correctly together.
As such, testing microservices requires adaptation from the traditional strategies for testing monoliths.
