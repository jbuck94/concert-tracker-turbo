locals {
  service_account_name = "ct-cloud-run-sa"
}

# Create the service account if it doesn't exist
resource "google_service_account" "cloud_run_service_account" {
  account_id   = local.service_account_name
  display_name = "Cloud Run Service Account"
}

resource "google_project_iam_member" "allrun" {
  for_each = toset(var.run_roles_list)
  project  = var.project_id
  role     = each.value
  member   = "serviceAccount:${google_service_account.cloud_run_service_account.email}"
}

variable "run_roles_list" {
  description = "The list of roles that run needs"
  type        = list(string)
  default = [
    "roles/run.invoker",
    "roles/secretmanager.secretAccessor",
  ]
}
