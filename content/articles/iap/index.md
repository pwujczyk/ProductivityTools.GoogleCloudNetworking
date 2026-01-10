# Identity Aware Proxy

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