resource "google_cloud_run_v2_service" "service" {
  name     = var.service_name
  location = var.region

  template {

    service_account = var.service_account_email

    scaling {
      min_instance_count = 1
      max_instance_count = 1
    }



    containers {
      image = var.image

      dynamic "env" {
        for_each = var.env_secrets
        content {
          name  = env.value.env_name
          value = data.google_secret_manager_secret_version.env_secrets[env.value.env_name].secret_data
        }
      }

      dynamic "env" {
        for_each = var.env_vars
        content {
          name  = env.value.env_name
          value = env.value.value
        }
      }

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

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }

  lifecycle {
    ignore_changes = [
      template[0].containers[0].image
    ]
  }
}

resource "google_cloud_run_service_iam_member" "invoker" {
  service  = google_cloud_run_v2_service.service.name
  location = google_cloud_run_v2_service.service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

data "google_secret_manager_secret_version" "env_secrets" {
  for_each = { for secret in var.env_secrets : secret.env_name => secret }
  secret   = each.value.secret_name
  project  = var.project_id
}


resource "google_cloud_run_domain_mapping" "mapping" {
  location = var.region
  name     = var.domain

  spec {
    route_name = google_cloud_run_v2_service.service.name
  }

  metadata {
    namespace = var.project_id
  }

  depends_on = [google_cloud_run_v2_service.service]
}
