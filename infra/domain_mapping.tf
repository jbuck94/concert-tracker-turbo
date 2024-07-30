
# resource "google_cloud_run_domain_mapping" "api_domain_mapping" {
#   location = var.region
#   name     = "${var.api_subdomain}.${var.domain_name}"
#   service  = module.api_service.service_name

#   depends_on = [module.api_service]
# }

# resource "google_cloud_run_domain_mapping" "web_domain_mapping" {
#   location = var.region
#   name     = "www.${var.domain_name}"
#   service  = module.web_service.service_name


#   depends_on = [module.web_service]
# }
