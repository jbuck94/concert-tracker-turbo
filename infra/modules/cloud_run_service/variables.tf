
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

variable "container_port" {
  description = "The port on which the container listens"
  type        = number
}
