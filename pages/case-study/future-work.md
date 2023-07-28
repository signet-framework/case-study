# Future Work

One of the significant limitations of Signet lies in its current lack of support for a wide range of communication mechanisms.
Presently, Signet is tailored to test RESTful microservices, rendering it incompatible with other architectural styles such as event-driven, GraphQL, gRPC, and others.

Expanding Signet's capabilities beyond REST necessitates that both the consumer contract and provider specification can capture the API interface of various communication protocols.
Fortunately, The Pact specification is currently in development with the goal of accommodating non-RESTful APIs, allowing consumer contracts to eventually evolve without much work from the Signet team.
However, with provider specifications, the scope of OpenAPI remains limited to RESTful APIs for the foreseeable future.
Consequently, Signet must proactively incorporate support for alternative formats in provider specifications to broaden its compatibility.
