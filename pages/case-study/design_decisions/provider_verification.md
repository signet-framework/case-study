
# Provider Verification

## What is it?

Consider a situation where the published consumer contract and provider specification are compatible, but the provider did not implement all the requirements defined in the specification. In this scenario, deploy guard should mark the provider and consumer as incompatible, but how does deploy guard know whether or not the provider has accurately implemented their specification? The answer is a process that we refer to as provider verification. Provider verification occurs when the provider tests their implementation against the published provider specification. The results of this verification are then integrated into deploy guard, adding an extra layer of confidence in the compatibility between consumer and provider.

## How much should we do?

Provider verification involves testing the provider and publishing the test results to the Signet broker. One approach is to push the responsibility of the provider test onto the developer, which gives them the freedom to use their preferred tools. They can then use the Signet CLI to publish the test results. Although this choice offers the developer more flexibility, it also increases the difficulty of contract testing. The developer would have to ensure that their tests accurately cover the requirements of the latest specification. Therefore, we decided to implement provider tests as a feature of Signet.

## How do we do it?

### Generate Unit Tests

One approach we considered was to to generate unit tests automatically from the OpenAPI Specification. The provider is verified if they pass the generated unit tests. The main advantage of this approach is its convenience in a new codebase, as it automates the process of writing unit tests for the specification. However, the code-invasive nature of this approach comes with a few downsides. Integrating our feature with existing testing frameworks is problematic, as it requires individual support for each framework. We would also need a way to ensure synchronization between unit tests and specifications, as developers can modify the unit tests in a way that inaccurately tests the specification. Therefore, we decided that providing support for this feature would be outside the current scope of Signet.

### Generate OpenAPI Specification from Code

Another approach involves generating an OpenAPI Specification directly from code. We could then compare the generated specification with the published one to ensure compatibility.  This approach is well-suited for an existing codebase, but the implementation would be complicated. Since tools for specification generation are specific to server frameworks, implementing this approach would require providing individual support for each framework. Therefore, we decided that providing support for this feature would be outside the current scope of Signet.

### Black Box Test

This approach involves performing black box testing. Black box testing is a testing technique in which the implementation details (code) of the tested software are unexposed to the tester. We can achieve this by simulating a mock consumer that utilizes the OpenAPI specification to send requests to the provider. If all the responses satisfy the requirements of the specification, then the provider is verified. The main benefit of this approach is that it's both language and platform agnostic. As a result, it's unnecessary to provide specific support for any testing or server framework. Therefore, we decided to implement this approach for provider verification.
