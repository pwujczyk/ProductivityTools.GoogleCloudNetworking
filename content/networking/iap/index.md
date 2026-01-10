# Identity Aware Proxy

## SSH 

We can access securely VM using ssh even when VM does not have public IP. 

![VM](./images/vm1.png)

To do it we need to create firewall rule that allows traffic from internal google services that act as a proxy to our servers. 


[Add firewall rule that will allow traffic from the range](35.235.240.0/20) ```35.235.240.0/20```

![firewall-rule](./images/firewall-rule.png)

When rule is created we can use the command to open ssh connection.

```
gcloud compute ssh iam-vm --tunnel-through-iap --zone us-central1-a
```

![connection-sucessfull](./images/connection-sucessfull.png)

## RDP

For RDP situation is similar. 

The firewall rule needs to open 3389 port

![rdp](./images/rdp.png) 


We need to create a tunnel on our pc to the google servers:

```
gcloud compute start-iap-tunnel remote3 3389 --local-host-port=localhost:9876 --zone=europe-central2-aremot
```

![tunell](./images/tunell.png)

And connect to the localhost

![rdp-connection](./images/rdp-connection.png)

We can take password from the VM details

![vm-password](./images/vm-password.png)

![credentials](./images/credentials.png)


![windows-server](./images/windows-server.png)