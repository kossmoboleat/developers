webpackJsonp([0x81b8806e4260],{642:function(e,t){e.exports={data:{allMarkdownRemark:{edges:[{node:{fields:{slug:"/attestcredentials"},excerpt:"Attesting Credentials * If the user consents, the uPort app saves the attestation token to their device. Browser displays a QR code (if…",timeToRead:2,frontmatter:{title:"Attesting Credentials"}}},{node:{fields:{slug:"/gettingstarted"},excerpt:"Getting Started Welcome! The goal of this guide is to get you set up quickly with a skeleton project and to familiarize you with a few basic…",timeToRead:4,frontmatter:{title:"Getting Started"}}},{node:{fields:{slug:"/readme"},excerpt:"uPort Specs uPort is a platform for user centric identity and communication. The platform currently consists of our mobile app, Ethereum…",timeToRead:2,frontmatter:{title:"Uport Specs"}}},{node:{fields:{slug:"/reactuporttruffle"},excerpt:"React-uport Truffle box This a short tutorial to requesting credentials and signing attestations with uPort.  We will be leveraging the…",timeToRead:4,frontmatter:{title:"React-Uport Truffle Box"}}},{node:{fields:{slug:"/requestcredentials"},excerpt:"Requesting Credentials The first and most basic step you should take is to allow your user to connect their uPort to your app. Uport-connect…",timeToRead:4,frontmatter:{title:"Requesting Credentials"}}},{node:{fields:{slug:"/signtransactions"},excerpt:"Signing Transactions Browser displays QR code with randomly generated sessionID in a URI Browser starts polling chasqui using the sessionId…",timeToRead:4,frontmatter:{title:"Signing Transactions"}}},{node:{fields:{slug:"/clients"},excerpt:"Clients (apps) Allow users, developers, and applications to interact with the uPort platform. uPort Mobile Wallet : Secure mobile self…",timeToRead:1,frontmatter:{title:"Clients (apps)"}}},{node:{fields:{slug:"/overview"},excerpt:"OVERVIEW uPort is an interoperable identity network for a secure, private, decentralized web. uPort provides open protocols for…",timeToRead:1,frontmatter:{title:"Overview"}}},{node:{fields:{slug:"/platform"},excerpt:"PLATFORM The uPort Platform is our implementation of the uPort Protocol designed to make decentralized identities on Ethereum easy to create…",timeToRead:3,frontmatter:{title:"Platform"}}},{node:{fields:{slug:"/protocol"},excerpt:"PROTOCOLS uPort consists of identity and messaging protocols that together form an interoperable identity layer for the decentralized web…",timeToRead:1,frontmatter:{title:"Protocols"}}},{node:{fields:{slug:"/lambda-olorun/readme"},excerpt:"lambda-olorun Olorun  (Yoruba: Ọlọrun or Ọlọhun), literally the ruler of (or in) the Heavens, is the name given to one of the three…",timeToRead:3,frontmatter:{title:"Private Chain Support"}}},{node:{fields:{slug:"/flows/index"},excerpt:"Uport Request Flows A request will typically be signed by a client app and sent to mobile app using this generic request flow: Unified…",timeToRead:1,frontmatter:{title:"Uport Request Flows"}}},{node:{fields:{slug:"/flows/privatechain"},excerpt:"Private Chain Provisioning Flow Experimental support for supporting Ethereum Accounts on private chains. The following shows the basic flow…",timeToRead:2,frontmatter:{title:"Private Chain Provisioning Flows"}}},{node:{fields:{slug:"/flows/selectivedisclosure"},excerpt:"Selective Disclosure Flow A client application can request various information from the user. The following shows the basic flow: Endpoint…",timeToRead:2,frontmatter:{title:"Selective Disclosure Flow"}}},{node:{fields:{slug:"/flows/tx"},excerpt:"Ethereum Transaction Flow A client application can request that a user signs an Ethereum transaction. The following shows the basic flow…",timeToRead:2,frontmatter:{title:"Ethereum Transaction Flow"}}},{node:{fields:{slug:"/flows/verification"},excerpt:"Send Verification Flow A client application can verify information about a user The following shows the basic flow: A more complete example…",timeToRead:2,frontmatter:{title:"Send Verification Flow"}}},{node:{fields:{slug:"/messages/encryption"},excerpt:"Message Encryption Some  message transports  are not directly secure and require encryption of the message. We currently use the  box public…",timeToRead:5,frontmatter:{title:"Message Encryption"}}},{node:{fields:{slug:"/messages/index"},excerpt:"Off-chain Messages Most request and responses are performed privately off-chain between the different parties to a flow. JSON Web Token Most…",timeToRead:5,frontmatter:{title:"Off-chain Messages"}}},{node:{fields:{slug:"/messages/privatechain"},excerpt:"Private Chain Provisioning Message A Private Chain Provisioning Message can be used for adding an account created on a private Ethereum…",timeToRead:2,frontmatter:{title:"Private Chain Provisioning"}}},{node:{fields:{slug:"/messages/sharereq"},excerpt:"Selective Disclosure Request The Selective Disclosure Request is created by a client app and sent to a user's mobile app during the…",timeToRead:3,frontmatter:{title:"Selective Disclosure Request"}}},{node:{fields:{slug:"/messages/shareresp"},excerpt:"Selective Disclosure Response The Selective Disclosure Response is created by a users mobile app as a response to a  Selective Disclosure…",timeToRead:2,frontmatter:{title:"Off-chain Messages"}}},{node:{fields:{slug:"/messages/tx"},excerpt:"Ethereum Transaction Request This message allows an application to request that a client signs an ethereum transaction. The Ethereum…",timeToRead:7,frontmatter:{title:"Ethereum Transaction Request"}}},{node:{fields:{slug:"/messages/verification"},excerpt:"Verification A Verified Claim is a statement issued by a third party verifying claims about an identity  Verified Claim Flow . Verified…",timeToRead:2,frontmatter:{title:"Verification"}}},{node:{fields:{slug:"/messages/verificationreq"},excerpt:"Verified Claim Request The Verified Claim Request is created by a client app and sent to a user's mobile app during the  Verified Claim…",timeToRead:2,frontmatter:{title:"Verification Claim Request"}}},{node:{fields:{slug:"/pki/identitydocument"},excerpt:"Identity Document Note this format will be deprecated soon and replaced by a standard  DID Document . The Identity document is stored on…",timeToRead:2,frontmatter:{title:"Identity Document"}}},{node:{fields:{slug:"/pki/index"},excerpt:"uPort PKI uPort implements a simple yet general purpose decentralized PKI system, making it easy to create and verify off-chain JWT messages…",timeToRead:5,frontmatter:{title:"Uport PKI"}}},{node:{fields:{slug:"/rest-apis/fuel-server"},excerpt:"Transaction Fueling Server All transactions on Ethereum like networks are paid using transaction fees known as  . To avoid the requirement…",timeToRead:1,frontmatter:{title:"Transaction Fueling Server"}}},{node:{fields:{slug:"/rest-apis/relay-server"},excerpt:"Meta Transaction Relaying Server All transactions on Ethereum like networks are paid using transaction fees known as  . To avoid the…",timeToRead:3,frontmatter:{title:"Meta Transaction Relaying Server"}}},{node:{fields:{slug:"/transports/index"},excerpt:"Request/Response Transports Requests Requests always consist of URLs that are handled by the mobile app. There are different built in ways…",timeToRead:7,frontmatter:{title:"Request/Response Transports"}}},{node:{fields:{slug:"/transports/push"},excerpt:"Push Notification Transport Push notifications is a transport for sending requests to users. To make sure that the push notification service…",timeToRead:2,frontmatter:{title:"Push Notification Transport"}}},{node:{fields:{slug:"/did-jwt/guides/index"},excerpt:"Working with did-JWT's Creating a JWT Use the   function Parameters Name Description Required an object containing any claims you want to…",timeToRead:5,frontmatter:{title:"Working with did-JWT's"}}},{node:{fields:{slug:"/did-jwt/reference/index"},excerpt:"Algorithms supported  the  secp256k1 ECDSA curve  the  secp256k1 ECDSA curve  with recovery parameter DID PublicKey Types The   section of a…",timeToRead:7,frontmatter:{title:"did-jwt"}}},{node:{fields:{slug:"/uport-connect/guides/tutorial"},excerpt:"How to integrate uPort into your dapp Introduction This tutorial will show you how to add support for uPort in your decentralized Ethereum…",timeToRead:3,frontmatter:{title:"How to integrate Uport-Connect"}}},{node:{fields:{slug:"/muport-core-js/guides/simple-id"},excerpt:"Simple ID (muPort) In this document we outline a description of key management for an identity using an abstract  DID  (Decentralized…",timeToRead:6,frontmatter:{title:"Simple ID (muPort)"}}},{node:{fields:{slug:"/uport-connect/guides/usage"},excerpt:"Communication and Transactions how-to The following Connect object is the primary interface you will use. All details and additional…",timeToRead:7,frontmatter:{title:"Communication and Transactions"}}},{node:{fields:{slug:"/uport-connect/reference/index"},excerpt:"Modules Classes uport-connect/topicFactory Manages the communication channel between the uport-connect library and a\n uPort mobile app. The…",timeToRead:25,frontmatter:{title:"Uport Connect"}}},{node:{fields:{slug:"/uport-js/guides/server-side-credentials-example"},excerpt:"Server-side Credentials Here we will demonstrate how to create and sign a custom credential on a server (called the Creator) and present…",timeToRead:9,frontmatter:{title:"Uport-JS Server How-to"}}},{node:{fields:{slug:"/uport-js/reference/index"},excerpt:"Modules Classes uport-js/JWT uport-js/JWT .createJWT([config], payload)  ⇒  Promise. < Object, Error > .verifyJWT([config], jwt, callbackUrl…",timeToRead:10,frontmatter:{title:"Uport JS"}}}]},navCategories:{edges:[{node:{fields:{slug:"/attestcredentials"},headings:[{value:"Attesting Credentials",depth:1},{value:"If push is enabled",depth:6},{value:"If push is not enabled",depth:6},{value:"Calling the attest method",depth:2},{value:"Setting an expiration date",depth:2},{value:"Attesting multiple credentials",depth:2}],frontmatter:{category:"guides",index:2}}},{node:{fields:{slug:"/gettingstarted"},headings:[{value:"Getting Started",depth:1},{value:"Requirements",depth:3},{value:"1. Get the uPort App",depth:2},{value:"2. Get an Application Identity",depth:2},{value:"3. Setup Dependencies",depth:2},{value:"4. Configure and Run Code",depth:2}],frontmatter:{category:"guides",index:0}}},{node:{fields:{slug:"/readme"},headings:[{value:"uPort Specs",depth:1},{value:"Identities",depth:2},{value:"Identities created using the uPort Mobile App",depth:3},{value:"Request Flows",depth:2},{value:"More about request flows",depth:3},{value:"Request and Response Transports",depth:2},{value:"Request/Response Transports",depth:3},{value:"Off-chain Messages",depth:2},{value:"More about Off-chain Messages",depth:3},{value:"On-chain Transactions",depth:2},{value:"More about Signing Ethereum transactions",depth:3},{value:"uPort PKI",depth:2},{value:"More about the uPort PKI",depth:3}],frontmatter:{category:"reference",index:0}}},{node:{fields:{slug:"/reactuporttruffle"},headings:[{value:"React-uport Truffle box",depth:1},{value:"Setup React Truffle Box",depth:2},{value:"Create the necessary uport-connect objects",depth:2},{value:"Request a user's information",depth:2},{value:"Create an Attestation",depth:2},{value:"Wrapping it up",depth:2}],frontmatter:{category:"tutorials",index:0}}},{node:{fields:{slug:"/requestcredentials"},headings:[{value:"Requesting Credentials",depth:1},{value:"Desktop web",depth:3},{value:"Mobile web",depth:3},{value:"Calling the request method",depth:2},{value:"Requesting specific credentials",depth:2},{value:"Verifying credentials",depth:2},{value:"Enabling Push Notifications",depth:2}],frontmatter:{category:"guides",index:1}}},{node:{fields:{slug:"/signtransactions"},headings:[{value:"Signing Transactions",depth:1},{value:"Supply the contract ABI",depth:2},{value:"Create the contract object",depth:2},{value:"Call a basic method on the contract",depth:2},{value:"Call a tx signing method on the contract",depth:2},{value:"Wait for mining to complete",depth:2}],frontmatter:{category:"guides",index:3}}},{node:{fields:{slug:"/clients"},headings:[{value:"Clients (apps)",depth:1},{value:"uPort Mobile Wallet",depth:2},{value:"uPort App Manager",depth:2},{value:"uPort JS Client",depth:2}],frontmatter:{category:"overview",index:3}}},{node:{fields:{slug:"/overview"},headings:[{value:"OVERVIEW",depth:1}],frontmatter:{category:"overview",index:0}}},{node:{fields:{slug:"/platform"},headings:[{value:"PLATFORM",depth:1},{value:"Ethereum Identity Components",depth:2},{value:"Network Microservices",depth:2},{value:"Libraries",depth:2}],frontmatter:{category:"overview",index:2}}},{node:{fields:{slug:"/protocol"},headings:[{value:"PROTOCOLS",depth:1},{value:"uPort Identity Protocol",depth:2},{value:"uPort Claims Protocol",depth:2}],frontmatter:{category:"overview",index:3}}},{node:{fields:{slug:"/lambda-olorun/readme"},headings:[{value:"lambda-olorun",depth:1},{value:"Setting a new private chain",depth:2},{value:"Deploy uPort Identity Contracts",depth:3},{value:"Configure Olorun hosted service for a new private chain",depth:3},{value:"Run your own Olorun",depth:3},{value:"Contributing",depth:2}],frontmatter:{category:"guides",index:5}}},{node:{fields:{slug:"/did-jwt/guides/index"},headings:[{value:"Working with did-JWT's",depth:1},{value:"Creating a JWT",depth:2},{value:"Parameters",depth:4},{value:"Promise Return Value",depth:4},{value:"Verifying a JWT",depth:2},{value:"Parameters",depth:4},{value:"Promise Return Value",depth:4},{value:"Signer Functions",depth:2},{value:"SimpleSigner",depth:3},{value:"Parameters",depth:4},{value:"Creating Custom Signers for integrating with HSM",depth:3},{value:"Parameters",depth:4},{value:"Promise Return Value",depth:4}],frontmatter:{category:"guides",index:4}}},{node:{fields:{slug:"/did-jwt/reference/index"},headings:[{value:"Algorithms supported",depth:2},{value:"DID PublicKey Types",depth:2},{value:"Claims",depth:2},{value:"Modules",depth:2},{value:"Functions",depth:2},{value:"did-jwt/JWT",depth:2},{value:"did-jwt/JWT.decodeJWT(jwt) ⇒ ",depth:3},{value:"did-jwt/JWT.createJWT(payload, ",depth:3},{value:"did-jwt/JWT.verifyJWT(jwt, ",depth:3},{value:"did-jwt/JWT.resolveAuthenticator(alg, did, auth) ⇒ ",depth:3},{value:"SimpleSigner(hexPrivateKey) ⇒ ",depth:2}],frontmatter:{category:"reference",index:3}}},{node:{fields:{slug:"/uport-connect/guides/tutorial"},headings:[{value:"How to integrate uPort into your dapp",depth:1},{value:"Introduction",depth:2},{value:"Getting started",depth:2}],frontmatter:{category:"tutorials",index:0}}},{node:{fields:{slug:"/muport-core-js/guides/simple-id"},headings:[{value:"Simple ID (muPort)",depth:1},{value:"Onboarding/Signup",depth:2},{value:"Interacting with a service",depth:2},{value:"Setting up recovery network",depth:2},{value:"Using the recovery network",depth:2},{value:"Updating the encrypted recovery shards",depth:2}],frontmatter:{category:"guides",index:6}}},{node:{fields:{slug:"/uport-connect/guides/usage"},headings:[{value:"Communication and Transactions how-to",depth:1},{value:"Communication",depth:1},{value:"Default QR flow",depth:2},{value:"Default Mobile Requests",depth:2},{value:"Push Notifications",depth:2},{value:"Ethereum Interactions and Transactions",depth:1},{value:"Using with web3",depth:2},{value:"Using a provider",depth:2},{value:"Using without web3",depth:2}],frontmatter:{category:"tutorials",index:2}}},{node:{fields:{slug:"/uport-connect/reference/index"},headings:[{value:"Modules",depth:2},{value:"Classes",depth:2},{value:"uport-connect/topicFactory",depth:2},{value:"uport-connect/topicFactory~TopicFactory(isOnMobile, pollingInterval, chasquiUrl) ⇒ ",depth:3},{value:"TopicFactory~waitForHashChange(topicName, cb)",depth:4},{value:"TopicFactory~pollForResult(topicName, url, cb, cancelled)",depth:4},{value:"TopicFactory~clearTopic(url)",depth:4},{value:"TopicFactory~newTopic(topicName) ⇒ ",depth:4},{value:"Connect ⇐ ",depth:2},{value:"new Connect(appName, ",depth:3},{value:"connect.getWeb3() ⇒ ",depth:3},{value:"connect.getProvider() ⇒ ",depth:3},{value:"connect.requestCredentials(",depth:3},{value:"connect.requestAddress(",depth:3},{value:"connect.attestCredentials(credential, ",depth:3},{value:"connect.request(request) ⇒ ",depth:3},{value:"connect.contract(abi) ⇒ ",depth:3},{value:"connect.sendTransaction(txobj) ⇒ ",depth:3},{value:"ConnectCore",depth:2},{value:"new ConnectCore(appName, ",depth:3},{value:"connectCore.getProvider() ⇒ ",depth:3},{value:"connectCore.requestCredentials(",depth:3},{value:"connectCore.requestAddress(",depth:3},{value:"connectCore.attestCredentials(credential, ",depth:3},{value:"connectCore.request(request) ⇒ ",depth:3},{value:"connectCore.contract(abi) ⇒ ",depth:3},{value:"connectCore.sendTransaction(txobj) ⇒ ",depth:3},{value:"UportSubprovider",depth:2},{value:"new UportSubprovider(args)",depth:3},{value:"uportSubprovider.send()",depth:3},{value:"uportSubprovider.sendAsync(payload, callback)",depth:3}],frontmatter:{category:"reference",index:4}}},{node:{fields:{slug:"/uport-js/guides/server-side-credentials-example"},headings:[{value:"Server-side Credentials",depth:1},{value:"Prerequisites:",depth:3},{value:"Register an App",depth:2},{value:"Setup a Requestor Service",depth:2},{value:"Setup a Creator Service",depth:2},{value:"For the fields of the credential:",depth:3},{value:"Setup a Verification service",depth:2}],frontmatter:{category:"tutorials",index:1}}},{node:{fields:{slug:"/uport-js/reference/index"},headings:[{value:"Modules",depth:2},{value:"Classes",depth:2},{value:"uport-js/JWT",depth:2},{value:"uport-js/JWT.createJWT(",depth:3},{value:"uport-js/JWT.verifyJWT(",depth:3},{value:"Credentials",depth:2},{value:"new Credentials(",depth:3},{value:"credentials.createRequest(",depth:3},{value:"credentials.createVerificationRequest(unsignedClaim, sub) ⇒ ",depth:3},{value:"credentials.receive(token, ",depth:3},{value:"credentials.push(token, payload, pubEncKey) ⇒ ",depth:3},{value:"credentials.attest(",depth:3},{value:"credentials.lookup(address) ⇒ ",depth:3}],frontmatter:{category:"reference",index:4}}}]}},pathContext:{}}}});
//# sourceMappingURL=path---index-9c03edc1601b07787fc1.js.map