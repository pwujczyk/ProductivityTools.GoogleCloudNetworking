# Secure Web Proxy


## Subnet for the proxy
Google does not run the proxy in your subnet, to use it we need to create special subnet in the network. 
It means that we need always to have two sub-networks
- one where VM will be placed
- second only for the Web Proxy

In the VPC details on the Subets tak, click **Add subnet**

![add-subnet](./images/add-subnet.png)

The important configuration to select is **Regional Managed Proxy**. 

![proxy-subnet](./images/proxy-subnet.png)



## Secure web proxy wizard
Service allow to securely connect to the internet from the VMs in the cloud.

Typical scenario: We have VM without the external IP. That means that VM does not have access to the Internet. We do not want to assgn the IP as then VM would be exposed to attacks. 

Secure web proxy is a regional service, that means if we have two subnetworks in different regions we need to create two secure web proxies.

![vm-without-external-ip](./images/vm-without-external-ip.png)

We can create **Secure Web Proxy** that will allow VM to acces the internet. 

![create-secure-web-proxy](./images/create-secure-web-proxy.png)


Secure web proxy needs certificate to connect with the SSL. 

![google-managed-certificate](./images/google-managed-certificate.png)

We need to generate data to validate if we own the domain. 

![create-dns-authorization](./images/create-dns-authorization.png)

After clicking DNS authorization, Console provides us data that we should put in the DNS confiruguration.

![google-managed-certificate-with-dns-authorization](./images/google-managed-certificate-with-dns-authorization.png)


It is written that we need to create the policy, we will do it in the next step

![no-policy](./images/no-policy.png)

After creation **Secure Web Proxy** we see that the certificate status is pending, that means that we need o put the correct data in DNS.

![certificate-status-pending](./images/certificate-status-pending.png)

When data in the DNS are put, the status of the certificate changes to active

![certificate-status-active](./images/certificate-status-active.png)

## Secure Web Proxy Policy

To allow VM to access internet we need to create policy.

![new-policy](./images/new-policy.png)

```
source.ip=="10.0.0.5"

```

![swp-policy](./images/swp-policy.png)


![assign-a-policy](./images/assign-a-policy.png)

# VM Proxy server
VM sill does not have the access to the internet, as we are missing proxy configuration.

![vm-no-internet](./images/vm-no-internet.png)

After set up proxy we should have the internet.

![vm-proxy](./images/vm-proxy.png)


![vm-with-internet](./images/vm-with-internet.png)




