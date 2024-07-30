
module "api_service" {
  source       = "./modules/cloud_run_service"
  service_name = "api"
  region       = var.region
  # image          = "gcr.io/${var.project_id}/api:latest"
  image                   = "gcr.io/cloudrun/hello"
  startup_probe_endpoint  = "/"
  liveness_probe_endpoint = "/"
}
