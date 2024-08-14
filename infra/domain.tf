resource "google_dns_managed_zone" "wento_me_zone" {
  name     = "wento-me-zone"
  dns_name = "wento.me."
}

output "name_servers" {
  value = google_dns_managed_zone.wento_me_zone.name_servers
}


resource "google_dns_record_set" "api_wento_me" {
  name         = "api.wento.me."
  managed_zone = google_dns_managed_zone.wento_me_zone.name
  type         = "CNAME"
  ttl          = 300
  rrdatas      = ["ghs.googlehosted.com."]
}

resource "google_dns_record_set" "www_wento_me" {
  name         = "www.wento.me."
  managed_zone = google_dns_managed_zone.wento_me_zone.name
  type         = "CNAME"
  ttl          = 300
  rrdatas      = ["ghs.googlehosted.com."]
}


resource "google_dns_record_set" "wento_me_root" {
  name         = "wento.me."
  managed_zone = google_dns_managed_zone.wento_me_zone.name
  type         = "A"
  ttl          = 300
  rrdatas = [
    "216.239.32.21",
    "216.239.34.21",
    "216.239.36.21",
    "216.239.38.21"
  ]
}
