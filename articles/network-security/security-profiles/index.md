# Security profiles

* Security profile can be created on the organization level (no project, nor folder)
* It is placed under Network Security \> Common components \> Security profiles  

## Security profile

* There are two types  of the security profiles  
  * Threat prevention 
    * Intercept (In-band) - this flow intercept the traffic and validates if it is not risky if yes then blocks the traffic
    * Mirroring (Out-of band) - tihs flow mirrors the traffic but did not block it. It can be used for the post traffic analysis.
  * URL filtering - blocks request to particular URLs

In the future maybe additionall functionalities will be added. PaloAlto has following [list of items](https://docs.paloaltonetworks.com/network-security/security-policy/administration/security-profiles): URL Filtering, File Blocking, Data Filtering, AI security.

To use the security profile we need to assign it to the **Security profile group**

## Security profile group

**Security profile group** is a group of security profiles. Right now only one **Security profile** can be attached to **Security profile group**

**Security profile group** can be added to the Firewall policy.

![firwall-policy](./images/firwall-policy.png)

## Firewall policy

Firewall policy can be asociated wth organizatino or folder. It means that each project that is child of the organization or the folder will have firewall policy forced. 

![inherited-policy](./images/inherited-policy.png)

The dependency graph:

![Networking-Security-profiles](./images/Networking-Security-profiles.png)


