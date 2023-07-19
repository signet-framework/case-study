# Monoliths and Microservices

There are two predominant styles of architecture currently in use by web applications.

In a **monolithic** architecture, all of the application business logic runs in a single in-memory process. The different components of the application interact with each other through in-memory function and method calls. The all of the core functionality of the app resides in a centralized repository, and updates to any part of the app require the entire code base to be redeployed.

In a **microservices** architecture, the application business logic consists of many separate services that interact with each other over the network. Each service is typically responsible for a single business domain, and it exposes an interface which allows other services to consume the functionality that the service provides.

Monolithes are a sensible default architecture for many applications due to their simplicity, reliability, and lower development cost. Running all of the business logic as a single process eliminates a significant amount of complexity which is required to manage microservices. Despite this, microservices offer advantages that are very attractive to certain organizations.

- Independent deployability - separating business domains into different services allows each service to evolve independently based on the changing needs of the organization. Decoupling the deployment of services allows each team to iterate on their service at their own pace, and reduces the need for them to coordinate with other teams when they want to release a new feature.

- Separation of responsibility - developers are responsible for a distinct subset of the overall business logic of the application. They and their services should be allowed to remain ignorant of how other services are implemented, and only need to concern themselves with the interfaces that other services provide to them.
