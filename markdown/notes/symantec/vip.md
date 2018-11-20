<!---DOC:Symantec VIP;Notes on Symantec VIP;Sean Lewis-->
# Symantec Validation and ID Protection (VIP)

## About

#### Overview

The Symantec Validation and ID Protection (VIP) Service is a multifactor authentication (MFA) product that uses biometrics and smartphones to supplement standard username/password logins on a variety of servers and services. It is a cloud-based service for preventing unauthorised access to sensetive networks and cloud based services.

#### Symantec VIP Service

* Cloud-based infrastructure
  - Secure, reliable, scalable, no on-premise server hardware required.
  - New capabilities transparently & automatically delivered.
* Broad choice of authentication options and credentials
  - Hardware one time password (OTP) tokens.
  - Free software/mobile OTP tokens.
  - Tokenless, transparent Risk-based authentication
* Password-less and Push login options
  - Biometrics eliminates password.
  - Push verification eliminates OTP.
* Self-service credential provisioning
  - No IT Help Desk needed.
* Enterprise infrastructure support
  - Out-of-box integrations.
    - RADIUS protocol:
      - Remote Authentication Dial-In User Service (RADIUS) is a networking protocol, operating on port `1812` that provides centralized Authentication, Authorization, and Accounting (AAA or Triple A) management for users who connect and use a network service.
      - https://www.cisco.com/c/en/us/support/docs/security-vpn/remote-authentication-dial-user-service-radius/12433-32.html
    - Plug-ins (E.g., Microsoft ADFS, Oracle, Symantec VIP Access Manager).

#### Symantec VIP Access Manager

* Single sign-on & single point of control
  - Consolidate passwords by logging on once
  - Enforce security and compliance policies for internal and mobile users
* Supports virtually any web-based application
  - Ready-to-use & Custom connectors
  - SAML
  - HTML forms
* Integrated support for strong authentication
  - One-time passwords, push, biometrics, risk-based authentication (Symantec VIP)
  - Digital certificates (Symantec Managed PKI)
* Self-service provisioning
  - Built-in user directory for registration and password management
  - Standards-based integration with identity providers
* Simplifies compliance
  - Easy, cost-effective cloud compliance audits and forensics


#### Example Scenario

Here is an example company and their goals.

| GOAL | SOLUTION |
| :--- | :--- |
| Reduce costs associated with account proliferation and forgotten passwords | **VIP Access Manager** SSO |
| Secure remote access with multifactor authentication | **VIP Services** OTP with RADIUS |
| Enable strong authentication in the commerical (consumer) applocation | **VIP Services** Risk-based authentication |


## Introduction to Symantec VIP Access Manager

#### Background

* Passwords are *BAD*: Bad habits are formed due to having to remember so many. A bad password can lead to accounts being compromised. Can be mitaged by:
    - By using SSO; improving user experience and reducing down to only one password that needs remembering.
    - Ensure that there is a strong password policy in place.
    - Implementing two factor authentication.
* SAML: Open standard for exchanging authentication and authorisation data between security domains.
  - A service provider (e.g. Google Apps, Salesforce, etc.) is configured to trust an IDP to authenticate users.
  - Uses public key encryption to establish a trust relationship.

![SAML Diagram](./images/symantec/saml_diagram.png)

* WS-Trust: Specification that uses secure message mechanisms of WS-Security to facilitate trust relationships in diverse Web service environments.
  - Intended for the exchange of user identity information in `Microsoft .NET 3.0`
  - WS-Trust defines a request/response process for exchange of security tokens in Kerberos, X.509 and SAML.
* WS-Trust is considered less complex and light weight, whereas SAML is more complex but considered more secure.

#### Key Features of Cloud Sign-on services

* Directory integration
  - Should have integration with multiple user stores.
  - It will need to be able to federate multiple user directories.
* Application integration
  - Integration with web applications.
  - E.g. Salesforce, Office 365, etc.
* Policy Engine
  - Controls access to services and should consolidate multiple types of policy enforcement.
  - Should be reliable, flexible and have logging
* Layered protection
  - Support for certificates, multi factor and risk-based sign-on options
* User portal
  - Allows users to sign onto any of their applications in one place

#### VIP Access Manager - High Level

Access Manager provides functionality to solve a range of identity and access issues:

* Single Sign On with Strong Authentication
  - SSO to any web application
  - Federation: SAML, WS-Trust, Direct
  - Plug-in for internal application and consumer sites
  - Extensive built-in app catalog
* Access Management
  - Policies based on user's identity and session context
  - VIP, RSA and User certificate integration
  - Rich access audit logs
* User Management
  - Embedded virtual user directory
  - Self-Service registration, profile management, password reset
  - Use credential at SSO Portal to access Web applications

The **Application Catalog** has out-of-box connectors for applications and generic connectors for unlisted applications. Configurations can be imported or exported. It will also display _connector health_ at a glance.

**Access Control** allows you to define access policies. They define access rules for applications based on user and device attributes, network location and Level of Assurance. Each application is assigned one access policy. Multi-factor authentication may be required when authentication needs to be stepped-up with a second factor such as a token.

![Access Manager Breakdown](./images/symantec/access_manager_breakdown.png)

#### Architecture of VIP Access Manager

The _VIP Access Manager Gateway Appliance_ is a virtual appliace, which hosts the Single Sign-on portal and Administration console. First installed Gatway operates as configuration master. Additional gateways will be read-only. This means that, if the primary gateway goes down then configuration cannot be changed until it is back online or a new primary gateway is chosen. Used in Symantec-hosted or on-premises customer deployments.

The _VIP Access Manager Bridge Appliance_ is a virtual appliance which bridges externally hosted gateways to internally hosted Identity Service stores. It uses outbound HTTPS connections. It will be requiried if you are using IdP outside of the gateway network. It is optionally used for on-premises customer deployments.

##### Hosted Deployment

![Hosted VIP Deployment](./images/symantec/vip_deployment_hosted.png)

##### On-Premises Deployment

![On-premises VIP Deployment](./images/symantec/vip_on-premises_deployment.png)

#### Installing Symantec VIP Access Manager

An extended guide can be found [here](https://help.symantec.com/home/VIP_EG_INSTALL_CONFIG?locale=EN_US).

##### Hosted Deployment

* Complete provisioning form
* Receive account information
* Create additional administrator accounts
* Deploy identity bridges
* Configure applications and identity services

##### On-Premises Deployment

* Prepare edge network
* Deploy gateways
* Enable SSL certificates and load balancing
* Configure administrators and alert settings
* Configure applications and identity services

#### Keywords

* __IAS__: Identity and Authentication Services
* __SAML__: Security Assertion Markup Language
* __IdP__: IDentity Provider
* __WS-Trust__: Web Services Trust
* __NTP__: Network Time Protocol
