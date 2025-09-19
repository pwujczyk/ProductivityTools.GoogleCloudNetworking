# Observability

In GCP two main observability services are available: Monitoring and Logging

## Monitoring
We use **Metrics explorer** to check out metrics. When we open Metrics explorer we need to choose metric that we would like to monitor. The easiest example is CPU load for the VM

Metric is in the form of the key-value pair. Like:
- CPU - Usage
- Disk - byes written

![cpu-load](./images/cpu-load.png)

## Logging 
Logging service presents all the events that happened to chosen resources. One of the example of the event is incoming request to VM.

Logs are in the form of the json
```
{
    insertId: "293y4xfajg6y2"
    jsonPayload: {
    bytes_sent: "180224"
    connection: {5}
    dest_google_service: {3}
    end_time: "2025-10-07T13:39:42.486001235Z"
    packets_sent: "128"
    reporter: "SRC"
    src_instance: {4}
    src_vpc: {4}
    start_time: "2025-10-07T13:39:42.310100027Z"
    }
    labels: {1}
    logName: "projects/pwujczyklearning/logs/networkmanagement.googleapis.com%2Fvpc_flows"
    receiveTimestamp: "2025-10-07T13:39:55.569044963Z"
    resource: {2}
    timestamp: "2025-10-07T13:39:55.569044963Z"
}
```

![vm-request](./images/vm-request.png)


## Types of logs

- Audit logs
    - Admin Activity Logs
    - Data Access Logs
    - System Event Logs
    - Policy Denied Logs
- Platform logs (service logs)
    - VPC Flow logs
    - Cloud Load Balancing Logs
    - Cloud SQL Logs
- User-Written Logs (Application logs) - he most common way to generate these is by writing to standard output (stdout) or standard error (stderr) from your application running in services like Cloud Run, Google Kubernetes Engine, or App Engine.