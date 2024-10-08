
variable "service_name" {
  description = "The name of the Cloud Run service"
  type        = string
}

variable "region" {
  description = "The region to deploy the Cloud Run service"
  type        = string
}

variable "image" {
  description = "The Docker image to deploy"
  type        = string
}

variable "project_id" {
  description = "The ID of the GCP project"
  type        = string
  default     = "concert-tracker-277016"
}

variable "startup_probe_endpoint" {
  description = "The endpoint used to determine if the service has started and is ready to accept traffic."
  type        = string
}

variable "liveness_probe_endpoint" {
  description = "The endpoint used to determine if the service is live or needs to be restarted a container."
  type        = string
}

variable "service_account_email" {
  description = "Email of the service account for the cloud run instance"
  type        = string
}

variable "env_secrets" {
  description = "List of environment secrets and their corresponding GCP secret names"

  type = list(object({
    env_name    = string
    secret_name = string
  }))

  default = []
}

variable "env_vars" {
  description = "List of environment variables and their corresponding values"

  type = list(object({
    env_name = string
    value    = string
  }))

  default = []
}

variable "domain" {
  description = "domain name to run the service on"
  type        = string
}

variable "zone_name" {
  type = string
}
