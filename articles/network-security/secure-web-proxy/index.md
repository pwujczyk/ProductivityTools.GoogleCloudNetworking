# Secure Web Proxy

Service allow to securely connect to the internet from the VMs in the cloud.

Typical scenario: We have VM without the external IP. That means that VM does not have access to the Internet. We do not want to assgn the IP as then VM would be exposed to attacks. 

![vm-without-external-ip](./images/vm-without-external-ip.png)

We can create **Secure Web Proxy** that will allow VM to acces the internet. 

![create-secure-web-proxy](./images/create-secure-web-proxy.png)



![google-managed-certificate](./google-managed-certificate.png)

![create-dns-authorization](./images/create-dns-authorization.png)