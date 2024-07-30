
module "web_service" {
  source       = "./modules/cloud_run_service"
  service_name = "web"
  region       = var.region
  # image          = "gcr.io/${var.project_id}/web:latest"
  image          = "gcr.io/cloudrun/hello"
  container_port = 3000
}
