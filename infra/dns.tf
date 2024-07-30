
# resource "google_dns_managed_zone" "primary" {
#   name        = "primary-zone"
#   dns_name    = var.domain_name
#   description = "Primary DNS zone"
# }

# resource "google_dns_record_set" "api_a_record" {
#   name         = "${var.api_subdomain}.${var.domain_name}."
#   managed_zone = google_dns_managed_zone.primary.name
#   type         = "A"
#   ttl          = 300

#   rrdatas = [module.api_service.service_url]
# }

# resource "google_dns_record_set" "www_cname_record" {
#   name         = "www.${var.domain_name}."
#   managed_zone = google_dns_managed_zone.primary.name
#   type         = "CNAME"
#   ttl          = 300

#   rrdatas = [module.web_service.service_url]
# }
