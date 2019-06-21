---
title: "About"
index: 0
category: "about"
type: "overview"
source: "https://github.com/uport-project/uport-project.github.io/blob/develop/markdown/docs/overview/overview.md"
announcement: "Announcing support to migrate old uport identities to new ethereum mainnet identities, see our Release Notes https://developer.uport.me/releases for more details!"
announcementType: "positive"
---

## Helping You Build User Centric Apps on Blockchains

uPort is a collection of tools and protocols for building **decentralized user-centric applications**. It's built on **open standards** and open source libraries.

### Onboarding a user to your dApp

Typically, on boarding new users to a dApps is a challenging process. Before they sign up to your dApp they must first:

- Download a wallet
- Understand what a seed is and store it somewhere safe
- Buy Ethereum on an exchange
- Understand numerous new concepts
- Finally, remember to come back to your dApp and sign up

Developing Decentralized Apps is already difficult. Convincing users to try your dApp, create a transaction, and return again and again is even harder. As a developer, you want users who are active and come back to your Application. To be successful, you need to build a long-term relationship with them and their data.

##### As a Developer You Want Users Who Are Active and Come Back to Your dApp.

uPort enables developers to on board their users in a simple and frictionless manner; allowing users to take over the control of their identity and Ethereum transactions. Most Ethereum development libraries don&#39;t have the concept of a user.

As a developer, you can implement uPort to help users build their sovereign identities.

## What is an Identity?

Users are represented as Ethereum addresses, but behind those addresses are actual people with interactions and reputation that forms a digital identity when considered together.

An individual's digital Identity is dynamic and constantly changing because they interact with many apps, services, and institutions every day.

An identity is not just based on what others say about them, but also on the things they do. Their interactions with other people, businesses, and blockchains all form parts of who they are and how they choose to represent themselves for future interactions.

Developers can interact with this data by asking for consent and requesting identity datum.

### Help Your User Build Their Identity

A uPort identity is built by using verified data. Every interaction, request, response, and transaction a user performs helps improve the value of their identity.

As a developer, you can help your users and build a long-term relationship with them by verifying data about them and their interactions with you.

### But All I Really Need is an Ethereum Address!

Perhaps this is true strictly from a smart contract point of view; however, from your user&#39;s perspective, it may not be that simple.

Users want a reason to use your dApp, not just once, but also to come back and feel confident that they are interacting with the same dApp.

You can build a relationship with your user by having them sign in. Having the ability to see their previous activities, helps build trust in your dApp and encourages them to continue interacting with it.

### Asking The User to do Something

The core concept of uPort is asking for data about them or for them to do something, such as:

- Asking for their name
- Asking for a verification, by a third party, of their name
- Asking them to sign a verification on behalf of someone they know
- Asking for their Ethereum account
- Asking them to sign an Ethereum transaction

This entire process is performed by the private exchange of signed messages. As a developer, you sign and encrypt requests for a user. They sign and encrypt responses to you.

### Reasons for Asking for Identity Data

For developers and businesses in the traditional world, there are three major reasons to ask for identity data:

1. To build a relationship with users
2. Authenticate users actions
3. Risk management

### The Problem With Centralized Identity Solutions

In a centralized world, different third-parties such as social networks and credit agencies record and control this data.

Signing up users in a traditional web or financial apps mean requesting data from these third parties.

Each third-party effectively runs a silo providing exactly one view of the user&#39;s identity. To get a full picture, you would have to request data from each one and figure out how to merge them together.

Obviously, for those of us building decentralized technologies, the whole idea that all this data is controlled by third-parties and not by the end user itself is also extremely problematic.

## Signing Ethereum Transactions

The real value of Ethereum apps, of course, isn&#39;t just in asking them for identity data. You want them to do something, such as interact with your smart contracts or send funds.

uPort provides a full Web 3.0 compatible provider and allows you to call Ethereum smart contract functions from your code, automatically sending the generated function to your user&#39;s uPort mobile app for approval and signing. This occurs without any changes to your existing code, besides the initial setup.

## Off-chain Data

While uPort works well with on-chain Ethereum transactions, its true strength is being able to exchange private data off-the-chain.

All of our requests and responses are currently based on industry standard JWTs ([RFC-7519](https://tools.ietf.org/html/rfc7519)), with signatures verified through the proposed [Decentralized Identifiers (DIDs)](https://w3c-ccg.github.io/did-spec/) standard from [W3C](https://www.w3.org/2017/vc/WG/), and the [ERC-1056 Lightweight Ethereum Identity](https://github.com/ethereum/EIPs/issues/1056) standard.

## uPort Protocols and Libraries


| Layer | Protocol | Library | Developer Target |
| --- | --- | --- | --- |
| User Front End |   | Uport-connect, react-native-uport-connect | Front End Devs |
| Transport | [uPort transports](https://developer.uport.me/transports/index) | uport-transports | Backend Devs |
| uPort Signed Messages | [uPort Messages](https://developer.uport.me/messages/index) | uport-credentials | Backend Devs |
| Signed Messages | [JWT RFC 7519](https://tools.ietf.org/html/rfc7519) | did-jwt | Protocol Developers |
| Identity Abstraction | [Decentralized Identifiers (DIDs)](https://w3c-ccg.github.io/did-spec/) | did-resolver | Identity Platform Designers |
| Identity Public Key Lookup | [ERC-1056 Lightweight Ethereum Identity](https://github.com/ethereum/EIPs/issues/1056) | ethr-did-resolver |   |
| Identity Creation/Management | [Ethereum DID Registry Contract](https://github.com/uport-project/ethr-did-registry) | ethr-did | Ethereum Identity Wallet Developers |
| Blockchain API | [Ethereum JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) | [Web3](https://github.com/ethereum/web3.js/) or [EthJS](https://github.com/ethjs) |   |
| Blockchain | [Ethereum](https://ethereum.org) |   |   |


### For Fully Decentralized Apps (dApps)

Decentralized Apps live on a combination of the user&#39;s web browser and decentralized networks such as blockchains and IPFS.

Having no dedicated server component means that logging in a user is not about authenticating access to a server. It is primarily about setting up a good user interface for your users, so they understand their own history with your app and how to create newly signed transactions.

While it's great for developers not to have a server backend to develop, it also presents many challenges.

- Where do they store the user&#39;s state?
- How do they communicate with a user?
- If we have no central user database, how do we connect users together?

Our library – [uPort Connect](https://github.com/uport-project/uport-connect) – provides solutions for most of these difficult questions.

### For Decentralized Mobile Applications

Mobile Apps are perfect for interacting with Blockchains. They offer the potential of much stronger security and potentially better UX than web-based dApps.

Our [React Native](https://github.com/uport-project/react-native-uport-connect) version of uPort Connect brings the full power of uPort Connect to your Mobile Apps!

For native developers, our [iOS](https://github.com/uport-project/uport-ios-sdk) and [Android](https://github.com/uport-project/uport-android-sdk) mobile SDK&#39;s combined with our HDSigner frameworks ([iOS](https://github.com/uport-project/UPTEthereumSigner), [Android](https://github.com/uport-project/uport-android-signer)) can be used to handle key management for you.

### For Hybrid Applications

Sometimes you still need a few centralized components for your App. In particular, if you need to be able to safely sign data from a verified entity, or if you must have the ability to perform backend data analysis.

For these kinds of applications, use uPort Credentials to sign and verify requests from your users. Communication from your server backend is abstracted through the uPort Transports library.

uPort is built using open standards and simple libraries built on them. We use a layered approach and build as much as possible on existing standards and tools.
