module "api_service" {
  source       = "./modules/cloud_run_service"
  service_name = "api"
  region       = var.region
  domain       = "api.wento.me"
  zone_name    = google_dns_managed_zone.wento_me_zone.name
  # image          = "gcr.io/${var.project_id}/api:latest"
  image                   = "gcr.io/cloudrun/hello"
  startup_probe_endpoint  = "/health"
  liveness_probe_endpoint = "/health"
  service_account_email   = google_service_account.cloud_run_service_account.email

  env_secrets = [
    { env_name = "NEW_RELIC_LICENSE_KEY", secret_name = "NEW_RELIC_LICENSE_KEY" }
  ]

  env_vars = [
    { env_name = "INTERNAL_ENV", value : "prod" },
    { env_name = "NEW_RELIC_APP_NAME", value : "API" },
    { env_name = "NEW_RELIC_NO_CONFIG_FILE", value : "true" },
    { env_name = "NEW_RELIC_DISTRIBUTED_TRACING_ENABLED", value : "true" },
    { env_name = "ENV NEW_RELIC_LOG", value : "stdout" },
  ]

  depends_on = [google_dns_managed_zone.wento_me_zone]
}
