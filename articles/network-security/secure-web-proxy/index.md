# Secure Web Proxy


## Subnet for the proxy
Google does not run the proxy in your subnet, to use it we need to create special subnet in the network.

In the VPC details on the Subets tak, click **Add subnet**

![add-subnet](./images/add-subnet.png)

The important configuration to select is **Regional Managed Proxy**. 

![proxy-subnet](./images/proxy-subnet.png)



## Secure web proxy wizard
Service allow to securely connect to the internet from the VMs in the cloud.

Typical scenario: We have VM without the external IP. That means that VM does not have access to the Internet. We do not want to assgn the IP as then VM would be exposed to attacks. 

![vm-without-external-ip](./images/vm-without-external-ip.png)

We can create **Secure Web Proxy** that will allow VM to acces the internet. 

![create-secure-web-proxy](./images/create-secure-web-proxy.png)



![google-managed-certificate](./google-managed-certificate.png)

![create-dns-authorization](./images/create-dns-authorization.png)

![google-managed-certificate-with-dns-authorization](./images/google-managed-certificate-with-dns-authorization.png)


It is written that we need to create the policy

![no-policy](./images/no-policy.png)

After creation we see that the certificate status is pending

![certificate-status-pending](./images/certificate-status-pending.png)

## secure Web Proxy Policy