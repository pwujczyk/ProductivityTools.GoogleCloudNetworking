# Resources

```
terraform init
terraform apply
terraform destroy
```

```
gcp_project_id = "codelab-pwujczyk-fb14o1"
gcp_region="us-central1"
gcp_zone="us-central1-a"
```

```
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# The provider block is simpler.
# It automatically uses your Cloud Shell's
# active project and credentials.
provider "google" {
  region = var.gcp_region
}

# -----------------------------------------------------------------
# VARIABLES
# -----------------------------------------------------------------

variable "gcp_region" {
  description = "GCP region to deploy resources"
  type        = string
  default     = "us-central1"
}

variable "gcp_zone" {
  description = "GCP zone to deploy resources (must be in the chosen region)"
  type        = string
  default     = "us-central1-a"
}

# -----------------------------------------------------------------
# NETWORKING
# -----------------------------------------------------------------

resource "google_compute_network" "main" {
  name                    = "main-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "main" {
  name          = "main-subnet"
  ip_cidr_range = "10.0.1.0/24"
  region        = var.gcp_region
  network       = google_compute_network.main.id
}

# -----------------------------------------------------------------
# SECURITY (FIREWALL)
# -----------------------------------------------------------------

# We ONLY need the HTTP rule.
# SSH will be handled by gcloud's IAP tunneling.
resource "google_compute_firewall" "allow_http" {
  name    = "main-vpc-allow-http"
  network = google_compute_network.main.id

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["web-server"]
}

# -----------------------------------------------------------------
# COMPUTE (The 2 VMs)
# -----------------------------------------------------------------

resource "google_compute_instance" "web_server" {
  count        = 2
  name         = "web-server-${count.index + 1}"
  machine_type = "e2-micro"
  zone         = var.gcp_zone

  tags = ["web-server"] # Tag for the HTTP firewall rule

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network    = google_compute_network.main.id
    subnetwork = google_compute_subnetwork.main.id
    access_config {} # Assign a public IP
  }

  # Startup script to install Apache
  metadata_startup_script = <<-EOF
    #!/bin/bash
    apt-get update
    apt-get install -y apache2
    systemctl start apache2
    systemctl enable apache2
    echo "<h1>Hello from Terraform (GCP) - VM ${count.index + 1}</h1>" > /var/www/html/index.html
    EOF

  # NO 'metadata' block for SSH keys is needed!
}

# -----------------------------------------------------------------
# OUTPUTS
# -----------------------------------------------------------------

output "vm_public_ips" {
  description = "Public IP addresses of the 2 web servers"
  value = [
    for instance in google_compute_instance.web_server : instance.network_interface[0].access_config[0].nat_ip
  ]
}

output "instance_names" {
  description = "Names of the created instances (for SSH)"
  value       = google_compute_instance.web_server.*.name
}
```