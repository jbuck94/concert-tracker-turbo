resource "google_service_account" "service_account" {
  account_id   = "github-actions-sa"
  display_name = "GitHub Actions Service Account"
}

resource "google_project_iam_member" "cloud_run_admin" {
  project = var.project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.service_account.email}"
}

resource "google_project_iam_member" "viewer" {
  project = var.project_id
  role    = "roles/viewer"
  member  = "serviceAccount:${google_service_account.service_account.email}"
}

resource "google_project_iam_member" "cloud_build_service_account" {
  project = var.project_id
  role    = "roles/cloudbuild.builds.editor"
  member  = "serviceAccount:${google_service_account.service_account.email}"
}

resource "google_project_iam_member" "storage_admin" {
  project = var.project_id
  role    = "roles/storage.admin"
  member  = "serviceAccount:${google_service_account.service_account.email}"
}

resource "google_service_account_key" "sa_key" {
  service_account_id = google_service_account.service_account.id
  private_key_type   = "TYPE_GOOGLE_CREDENTIALS_FILE"
}

output "service_account_key" {
  value       = google_service_account_key.sa_key.private_key
  description = "The private key for the service account"
  sensitive   = true
}

output "service_account_email" {
  value       = google_service_account.service_account.email
  description = "The email of the service account"
}
