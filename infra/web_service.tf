
module "web_service" {
  source                  = "./modules/cloud_run_service"
  service_name            = "web"
  region                  = var.region
  image                   = "gcr.io/cloudrun/hello"
  startup_probe_endpoint  = "/"
  liveness_probe_endpoint = "/"
  service_account_email   = google_service_account.cloud_run_service_account.email
  internal_env            = "prod"
}
