
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



variable "startup_probe_endpoint" {
  description = "The endpoint used to determine if the service has started and is ready to accept traffic."
  type        = string
}

variable "liveness_probe_endpoint" {
  description = "The endpoint used to determine if the service is live or needs to be restarted a container."
  type        = string
}
