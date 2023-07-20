# Provider Verification

## Trust, but Verify

Consider a situation where the published consumer contract and provider specification are compatible, but the provider did not implement all the requirements defined in the specification.
In this scenario, Deploy Guard should mark the provider and consumer as incompatible, but how does Deploy Guard know whether or not the provider has accurately implemented their specification?
\[**NTD**: Deploy guard should mark them as incompatible even though they are compatible according to prior sentence?\]
The answer is a process that we refer to as *provider verification*.
**Provider verification** occurs when the provider tests their implementation against the published provider specification.
The results of this verification are then integrated into Deploy Guard, adding an extra layer of confidence in the compatibility between consumer and provider.

## How much should we do?

\[**NTD**: What is this paragraph about? maybe distinguish more between verification and testing, sorta confusing\]
Provider verification involves (i) testing the provider and then (ii) publishing the results of those tests to the Signet broker.
One approach [ntd: either transition before this or "approach to ___"] is to push the responsibility of the provider test onto the developer, which gives them the freedom to use their preferred tools.
They can then use the Signet CLI to publish the test results.
Although this choice offers the developer more flexibility, it also increases the difficulty of contract testing.
The developer would have to ensure that their tests accurately cover the requirements of the latest specification.
Therefore, we decided to implement provider tests as a feature of Signet.

## Approaches to Verification

### Black Box Testing

Having decided to include provider testing, we then considered a few options on how to implement it.
The approach we settled on is centered around *black box testing*.
**Black box testing** is a testing technique in which the code and implementation details of the tested software are unexposed to the tester.
We achieved this by simulating a mock consumer that utilizes the OpenAPI Specification to send requests to the provider.
[ntd: say just a little more about the requests that we send]
If all the responses satisfy the requirements of the specification, then the provider is verified.
The main benefit of this approach is that it's both **language and platform agnostic**, making it easy to support any testing or server framework.

### Generate Unit Tests from the Specification

[ntd: maybe combine this with next section]
We also considered a couple of other approaches. The first was to to **generate unit tests automatically** from the OpenAPI Specification; the provider is verified if they pass the generated unit tests.
The main advantage of this approach is its convenience in a new codebase, as it automates the process of writing unit tests for the specification.
However, the code-invasive nature of this approach entails a few downsides.
First, integrating our feature with existing testing frameworks would be problematic, as it would require developing individual support for each framework.
Second, we would also need a way to ensure synchronization between unit tests and specifications, otherwise developers can modify the unit tests in a way that inaccurately tests the specification.
Considering these issues, we decided that providing support for this feature would be outside the current scope of Signet.

### Generate OpenAPI Specification from Code

A second approach that we considered involves generating an *additional* OpenAPI Specification directly from the provider code.
We could then compare the generated specification with the published one to ensure compatibility.
This approach is well-suited for an existing codebase, but the implementation would be complicated because tools for specification generation tend to be tightly coupled to server frameworks.
As such, this approach would also require implementing individual support for each framework, which we considered impractical.
