<!---DOC:Symantec VIP;Notes on Symantec VIP;Sean Lewis-->
# Symantec Validation and ID Protection (VIP)

## About

### Overview

The Symantec Validation and ID Protection (VIP) Service is a multifactor authentication (MFA) product that uses biometrics and smartphones to supplement standard username/password logins on a variety of servers and services. It is a cloud-based service for preventing unauthorised access to sensetive networks and cloud based services.

### Symantec VIP Service

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

### Symantec VIP Access Manager

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


## Example Scenario

Here is an example company and their goals.

| GOAL | SOLUTION |
| :--- | :--- |
| Reduce costs associated with account proliferation and forgotten passwords | **VIP Access Manager** SSO |
| Secure remote access with multifactor authentication | **VIP Services** OTP with RADIUS |
| Enable strong authentication in the commerical (consumer) applocation | **VIP Services** Risk-based authentication |
