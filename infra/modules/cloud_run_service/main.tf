resource "google_cloud_run_service" "service" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      service_account_name = var.service_account_email

      containers {
        image = var.image

        startup_probe {
          initial_delay_seconds = 30
          timeout_seconds       = 30
          period_seconds        = 30
          failure_threshold     = 3
          http_get {
            path = var.startup_probe_endpoint
          }
        }

        liveness_probe {
          timeout_seconds = 10
          period_seconds  = 300 # 5 minutes
          http_get {
            path = var.liveness_probe_endpoint
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  lifecycle {
    ignore_changes = [
      template[0].spec[0].containers[0].image
    ]
  }
}

resource "google_cloud_run_service_iam_member" "invoker" {
  service  = google_cloud_run_service.service.name
  location = google_cloud_run_service.service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
