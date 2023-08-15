# Provider Verification

## Trust, but Verify

Consider a situation where the published consumer contract and provider specification are compatible, but the provider did not implement all the requirements defined in their specification.
In such cases, Deploy Guard should issue a warning, signaling that the provider's implementation might not be entirely compatible with the consumer.
However, how can Deploy Guard accurately assess whether the provider has faithfully implemented their specification?
The solution to this problem is a process that we refer to as *provider verification*.

**Provider verification** occurs when the provider tests their implementation against the published provider specification.
The results of this verification are then integrated into Deploy Guard, adding an extra layer of confidence in the compatibility between consumer and provider.

## Two Step Process

There are two steps to provider verification:

  1. Testing the provider
  2. Publishing the test results to the Signet broker

Upon analyzing this process, we realized that publishing the test results does not require knowledge of how the results were obtained.
This observation led us to explore the possibility of decoupling the second step from the first.
Essentially, we would shift the responsibility of testing the provider to the developer, granting them the freedom to employ their preferred testing tools.
Once the testing is complete, they can publish the results using the Signet CLI.

While involving developers in the provider verification process was initially attractive, it also introduces more complexity to contract testing.
The developer would need to take on the burden of ensuring that their tests accurately cover all the requirements of the latest specification.
Therefore, we ultimately decided that Signet should handle both steps of the verification process.

## Approaches to Verification

Having decided to include provider testing, we then considered a few options on how to implement it.
The approach we settled on is centered around *black box testing*.

### Black Box Testing

**Black box testing** is a testing technique in which the code and implementation details of the tested software are unexposed to the tester.
We achieved this by simulating a mock consumer that utilizes the OpenAPI Specification to send requests to the provider.
The mock consumer sends a request to the provider for each described request in the specification.
If all the provider responses satisfy the requirements of the specification, then the provider is verified.

The main benefit of this approach is that it is both **language and platform agnostic**, making it easy to support any testing or server framework.

### Alternatives

During our design phase we also considered a couple of alternative approaches to provider verification.

#### Generate Unit Tests from the Specification

The first was to to **generate unit tests automatically** from the OpenAPI Specification; the provider is verified if they pass the generated unit tests.
The main advantage of this approach is its convenience in a new codebase, as it automates the process of writing unit tests for the specification.

However, the code-invasive nature of this approach entails a few downsides.
First, integrating our feature with existing testing frameworks would be problematic, as it would require developing individual support for each framework.
Second, we would also need a way to ensure synchronization between unit tests and specifications, otherwise developers can modify the unit tests in a way that inaccurately tests the specification.

Considering these issues, we decided that providing support for this feature would be outside the current scope of Signet.

#### Generate OpenAPI Specification from Code

A second approach that we considered involves **generating an additional OpenAPI Specification** directly from the provider code.
We could then compare the generated specification with the published one to ensure compatibility.

While this approach is well-suited for an existing codebase, the implementation would be complicated because tools for specification generation tend to be tightly coupled to server frameworks.
As such, this approach would also require implementing individual support for each framework, which we considered impractical.
