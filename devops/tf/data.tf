data "terraform_remote_state" "infrastructure" {

  backend = "s3"
  config = {
    bucket = "teraception-tf-state"
    key    = "env:/${var.infra_workspace_name}/teraception-common"

    region = "us-east-2"

    access_key = var.access_key

    secret_key = var.secret_key

    profile = var.profile
  }
}
