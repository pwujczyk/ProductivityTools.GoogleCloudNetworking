# Flow Analyzer

Flow Analyzer lets you perform opinionated network traffic analysis with 5-tuple granularity (source IP, destination IP, source port, destination port, and protocol).

To use it **Flow logs** needs to be enabled for the network.

## Example

The example uses
- 2 VMs
- On each VM Apache is installed
- Pages from both VMs are exposed to the Internet

![test-setup](./images/test-setup.png)

### No traffic

If VM does not have any traffic, the majority of the traffic is Google internal traffic. 
The Google internal traffic is the communication usually initated by the VM for example to send the logs to Flow logs. 

![google-traffic](./images/google-traffic.png)

### Google Logging traffic

When we check the details of the traffic we see that the destination is the [logging.googleapis.com](https://cloud.google.com/logging/docs/reference/v2/rest)


![google-service](./images/google-service.png)