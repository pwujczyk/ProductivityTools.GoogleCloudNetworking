GCP allows to configure firewalls on different levels

## VPC Firewall
During VPC network creation we can create Firewall rules. By default all ingress (from Internet) is denied and all egress is allowed. 

![VPCFirewall](./images/VPCFirewall.png)

The rules are applied on the network level and validated during each data exchange. I think about these as rules that are applied on each VM that is in the network like VM firewall. 

- [We cannot ssh into instance without new rule on VPC Firewall](./Firewals-SSH-Ping/Index.md)
- [We cannot ping vm1 instance from vm2 instance without new rule on VPC Firewall](./Firewals-SSH-Ping/Index.md)

