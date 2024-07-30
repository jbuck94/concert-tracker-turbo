resource "google_artifact_registry_repository" "web_registry" {
  provider = google-beta

  description   = "Deployments repository for web images"
  project       = var.project_id
  location      = var.region
  repository_id = "web-repo"
  format        = "DOCKER"
}

resource "google_artifact_registry_repository" "api_registry" {
  provider = google-beta

  description   = "Deployments repository for api images"
  project       = var.project_id
  location      = var.region
  repository_id = "api-repo"
  format        = "DOCKER"
}
