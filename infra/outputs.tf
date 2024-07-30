
output "api_service_url" {
  value = module.api_service.service_url
}

output "web_service_url" {
  value = module.web_service.service_url
}

# output "api_custom_domain" {
#   value = "${var.api_subdomain}.${var.domain_name}"
# }

# output "web_custom_domain" {
#   value = "www.${var.domain_name}"
# }
