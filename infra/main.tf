
provider "google" {
  project = var.project_id
  region  = var.region
}

module "enable_apis" {
  source     = "./modules/enable_apis"
  project_id = var.project_id
}
