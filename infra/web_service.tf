module "web_service" {
  source                  = "./modules/cloud_run_service"
  service_name            = "web"
  zone_name               = google_dns_managed_zone.wento_me_zone.name
  domain                  = "wento.me"
  region                  = var.region
  image                   = "gcr.io/cloudrun/hello"
  startup_probe_endpoint  = "/"
  liveness_probe_endpoint = "/"
  service_account_email   = google_service_account.cloud_run_service_account.email

  env_vars = [
    { env_name = "INTERNAL_ENV", value : "prod" }
  ]

  depends_on = [google_dns_managed_zone.wento_me_zone]
}
