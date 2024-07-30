
module "web_service" {
  source                  = "./modules/cloud_run_service"
  service_name            = "web"
  region                  = var.region
  image                   = "gcr.io/cloudrun/hello"
  startup_probe_endpoint  = "/health"
  liveness_probe_endpoint = "/health"
}
