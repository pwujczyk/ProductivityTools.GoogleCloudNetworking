# Organization policy 

On te account pawel@productivitytools.top I have 
- an organization productivitytools.top
- project firewall order

![organization](./images/organization.png)

In the firewall policies on the organization level I have one policy **block-80-org-level**

![policy](./images/policy.png)

**I cannot do the association to VPC**. Portal complains that I am missing permissions. 


![association](./images/association.png)

I think I have all permissions needed:
![permissions](./images/permissions.png)

I also do not have any deny permissions

![deny permissions](./images/deny_permissions.png)

Command in the gcloud says that user misses **compute.firewallPolicies.list**

![cmd](./images/cmd.png)

Quering policy analyzer 
![policy-analizer](./images/policy-analizer.png)


Confirms that user has required rights.
![policy-results](./images/policy-results.png)

