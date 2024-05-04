# Sign in with X

"Sign in with X" enables blockchain accounts to authenticate with off-chain services using a standardized message format, streamlining the verification of blockchain identities across various platforms.

## Supported Networks

`SIWx` currently supports the following blockchain networks:

- Ethereum (including all EIP-155 chains)
- Solana
- Stacks
- Tezos
- Starknet
- Fuel

### Upcoming Network Support

We are planning to expand our support to the Flow network next.

If you have suggestions for additional networks, please contribute a specification to [ChainAgnostic/namespaces](https://github.com/ChainAgnostic/namespaces) following the [CAIP-122 standard](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-122.md).

## Getting Started

Follow these steps to set up `SIWx`:

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Set Up the Environment:
    Navigate to the cloned directory, install dependencies, and build the project:
    ```bash
    cd <repository-name>
    pnpm install
    pnpm build
3.  Running Examples To see SIWx in action, proceed with the following commands in the examples directory:

        ```bash
        cd examples
        pnpm install
        pnpm run dev

    This setup initiates a development server where you can explore various implementation examples through your web browser.

## Example Implementation

Check out the example folder for a fully functional Next.js and NextAuth.js application demonstrating the end-to-end capabilities of SIWx.

Specifications
For a comprehensive understanding of the "Sign in with X" protocol, refer to the [CAIP-122](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-122.md) standard documentation.

## License

This project is open-sourced under the Apache 2.0 License, allowing for widespread use and modification to meet a variety of needs.

This README is organized to provide a concise yet comprehensive overview of the project, installation instructions, and additional resources for users and contributors.
