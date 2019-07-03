provider "google" {
  project     = "{{ projectID }}"
  credentials = "{{ credentials.gcp }}"
}

terraform {
  backend "gcs" {
    bucket  = "tf-state-{{ deploymentName }}"
    prefix  = "terraform/state/{{ clusterName }}"
  }
}
