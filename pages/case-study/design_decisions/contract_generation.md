# Contract Generation

At their core, consumer contracts and provider specifications are JSON or YAML files that adhere to a specific schema, which allows them to be written using a text editor.
However, relying on this manual approach introduces the risk of misalignment between the actual service and its corresponding document.
While we have successfully addressed this problem for the provider side through [provider verification](https://signet-framework.dev/case-study/design_decisions/provider_verification), we now need to tackle the same challenge for the consumer side.

## Replicate the Provider Approach

One option we considered is to replicate the approach used for the provider side.
Essentially, we'll shift the responsibility of writing the contract onto the developer and offer consumer verification as a Signet feature.
However, we quickly realized that there is no practical benefit to writing a Pact file by hand.
In contrast, for OpenAPI Specifications, designing and writing the specification by hand allows for collaboration, a key component of spec-driven development.
As collaboration is not beneficial for consumer contracts, we decided that automating the consumer contract generation is more productive for the developer.

## Generate Consumer Contract

Before considering any implementations of this approach, we assumed that teams are already performing consumer service tests that involve sending HTTP requests to a mock provider.
In other words, their testing infrastructure has already configured a mocking service.
Furthermore, their mocking service configuration contains descriptions of the expected HTTP requests and responses between the consumer and provider.
Assuming this scenario, Signet can extract information from the configured mocking service to generate the consumer contract.
We considered two extraction methods, which we refer to as recording and reading, and although both can coexist, we decided only to implement recording.

### Recording

This approach involves setting up a passthrough proxy between the consumer and mock provider server to record all HTTP requests and responses during the service tests.
After the tests execute, we can use the recorded data to generate a consumer contract.
The benefit of this approach is that it is not code-invasive and is compatible with any HTTP mocking service, allowing easy integration into an existing codebase.

### Reading

This approach involves reading the mock service configuration files to extract the expected HTTP requests and responses.
We can then use the extracted data to create the consumer contract.
One advantage of this approach is that a proxy would no longer be necessary, requiring one less component.
Also, since there is no recording, we can generate the consumer contract without executing the service tests.
The main disadvantage is that the format of the HTTP request and response definitions would differ depending on the mocking service, requiring us to implement individual support for each service. As such, we decided that this approach was out of our current scope.
