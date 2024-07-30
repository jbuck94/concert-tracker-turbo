
variable "project_id" {
  description = "The ID of the GCP project"
  type        = string
  default     = "concert-tracker-277016"
}

variable "region" {
  description = "The region to deploy resources in"
  type        = string
  default     = "us-central1"
}

# variable "domain_name" {
#   description = "The custom domain name"
#   type        = string
# }

# variable "api_subdomain" {
#   description = "The subdomain for the API"
#   type        = string
#   default     = "api"
# }
